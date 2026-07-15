import connectToDatabase from '@/lib/db';
import { getEmbedding } from '@/lib/embeddings';

// Import Mongoose models
import FAQ from '@/models/FAQ';
import Hospital from '@/models/Hospital';
import Doctor from '@/models/Doctor';
import Lead from '@/models/Lead';
import KnowledgeBase from '@/models/KnowledgeBase';

interface RetrievedDocument {
  source: string;
  title: string;
  text: string;
  url?: string;
  score?: number;
}

/**
 * Searches the MongoDB database semantically using vector similarity and retrieves user context.
 */
export async function retrieveRelevantContext(
  query: string,
  userId?: string,
  apiKey?: string,
  limitPerModel = 3
): Promise<string> {
  try {
    await connectToDatabase();

    let queryVector: number[] | null = null;
    if (apiKey) {
      try {
        queryVector = await getEmbedding(query, apiKey);
      } catch (err) {
        console.error("Error generating query embedding for RAG:", err);
      }
    }

    const retrievalPromises: Promise<RetrievedDocument[]>[] = [];

    // Helper to perform vector search on a model
    const searchModel = async (
      model: any,
      modelName: string,
      textFormatter: (doc: any) => string,
      urlGenerator: (doc: any) => string
    ): Promise<RetrievedDocument[]> => {
      try {
        if (!queryVector) {
          return [];
        }

        // Run Atlas Vector Search (requires "vector_index" on the embedding path)
        const results = await model.aggregate([
          {
            $vectorSearch: {
              index: "vector_index",
              path: "embedding",
              queryVector: queryVector,
              numCandidates: 30,
              limit: limitPerModel,
            }
          },
          {
            $match: {
              isActive: { $ne: false }
            }
          }
        ]).exec();

        if (!results || results.length === 0) {
          return [];
        }

        return results.map((doc: any) => ({
          source: modelName,
          title: doc.name || doc.title || doc.question || 'Untitled',
          text: textFormatter(doc),
          url: urlGenerator(doc),
          score: doc.$vectorSearchScore,
        }));
      } catch (vectorSearchError) {
        // Fallback to text search if vector search index is missing or fails
        try {
          const textQuery = { $text: { $search: query }, isActive: { $ne: false } };
          const results = await model.find(textQuery).limit(limitPerModel).lean().exec();
          return results.map((doc: any) => ({
            source: modelName,
            title: doc.name || doc.title || doc.question || 'Untitled',
            text: textFormatter(doc),
            url: urlGenerator(doc),
          }));
        } catch (textSearchError) {
          return [];
        }
      }
    };

    // 1. Semantic search across KnowledgeBase, Hospitals, Doctors, and FAQs
    retrievalPromises.push(
      searchModel(
        KnowledgeBase,
        'KnowledgeBase',
        (doc) => `Document Title: ${doc.title}\nCategory: ${doc.category}\nContent: ${doc.content}`,
        (doc) => doc.fileUrl || `/about`
      )
    );

    retrievalPromises.push(
      searchModel(
        Hospital,
        'Hospital',
        (doc) => `Hospital Name: ${doc.name}\nCountry: ${doc.country}, City: ${doc.city}\nDescription: ${doc.description}\nSpecialized Departments: ${doc.departments.join(', ')}\nAdvanced Facilities: ${doc.advancedFacilities.join(', ')}`,
        (doc) => `/hospital/${doc.slug || doc._id}`
      )
    );

    retrievalPromises.push(
      searchModel(
        Doctor,
        'Doctor',
        (doc) => `Doctor Name: ${doc.name}\nSpecialty: ${doc.specialty}\nQualification: ${doc.qualification}\nExperience: ${doc.experience}\nCountry: ${doc.country}\nAvailable Slots: ${doc.availableSlots?.join(', ') || 'N/A'}`,
        (doc) => `/doctor/${doc.slug || doc._id}`
      )
    );

    retrievalPromises.push(
      searchModel(
        FAQ,
        'FAQ',
        (doc) => `Question: ${doc.question}\nAnswer: ${doc.answer}`,
        () => `/faq`
      )
    );

    const allResultsGroups = await Promise.all(retrievalPromises);
    const mergedResults = allResultsGroups.flat();

    // 2. Format outputs into a context string for the LLM
    let contextString = "Here is the relevant real-time data from Shahjalal Enterprise's database:\n\n";

    // Direct lookup for Lead/Application status matching phone/email
    const phoneMatch = query.match(/(?:01[3-9]\d{8})|(?:\+8801[3-9]\d{8})/);
    const emailMatch = query.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

    let directLeadContext = "";
    if (phoneMatch || emailMatch) {
      const searchQuery: any = {};
      if (phoneMatch) searchQuery.phone = phoneMatch[0];
      else if (emailMatch) searchQuery.email = emailMatch[0];

      const matchedLeads = await Lead.find(searchQuery)
        .sort({ createdAt: -1 })
        .limit(2)
        .lean()
        .exec();

      if (matchedLeads && matchedLeads.length > 0) {
        directLeadContext += `Matched Client Applications:\n`;
        matchedLeads.forEach((lead: any) => {
          directLeadContext += `- Client: ${lead.clientName} | Phone: ${lead.phone}\n`;
          directLeadContext += `  * Division: ${lead.division} (${lead.serviceType})\n`;
          directLeadContext += `  * Application Status: ${lead.applicationStatus}\n`;
          if (lead.paymentDetails) {
            directLeadContext += `  * Payment: ${lead.paymentDetails.status} (${lead.paymentDetails.paidAmount} BDT)\n`;
          }
          if (lead.logs && lead.logs.length > 0) {
            directLeadContext += `  * Latest Log: ${lead.logs[lead.logs.length - 1].notes} (${new Date(lead.logs[lead.logs.length - 1].date).toLocaleDateString('en-BD')})\n`;
          }
        });
        directLeadContext += `\n`;
      }
    }

    if (directLeadContext) {
      contextString += directLeadContext;
    }

    // 3. User's Personal Lead/Consultations Context (if logged in)
    if (userId) {
      const userLeads = await Lead.find({ assignedAdmin: userId }) // Or matching email/phone of the user
        .sort({ createdAt: -1 })
        .limit(3)
        .lean()
        .exec();

      if (userLeads && userLeads.length > 0) {
        contextString += `User's Linked Consultation & Sourcing Leads:\n`;
        userLeads.forEach((lead: any) => {
          contextString += `- Lead ID: ${lead._id}\n`;
          contextString += `  * Division: ${lead.division} (${lead.serviceType})\n`;
          contextString += `  * Status: ${lead.applicationStatus}\n`;
          contextString += `  * Client: ${lead.clientName}\n`;
        });
        contextString += `\n`;
      }
    }

    // 4. Fetch Global Platform Statistics
    const totalHospitalsCount = await Hospital.countDocuments({ isActive: true });
    const totalDoctorsCount = await Doctor.countDocuments({ isActive: true });
    const totalFAQsCount = await FAQ.countDocuments({ isActive: true });

    contextString += `Global platform statistics of Shahjalal Enterprise:\n`;
    contextString += `- Total Partner International Hospitals: ${totalHospitalsCount}\n`;
    contextString += `- Total Specialist Doctors: ${totalDoctorsCount}\n`;
    contextString += `- Total FAQs: ${totalFAQsCount}\n\n`;

    // 5. Append semantic database retrieval matches
    if (mergedResults.length > 0) {
      mergedResults.forEach((doc, index) => {
        contextString += `[Document ${index + 1}] Source: ${doc.source}\nTitle: ${doc.title}\nContent: ${doc.text}\nURL: ${doc.url}\n\n`;
      });
    }

    return contextString;
  } catch (error) {
    console.error("Error retrieving context from RAG:", error);
    return "Error fetching database context.";
  }
}
