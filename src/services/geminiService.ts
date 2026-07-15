import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
    role: 'user' | 'model';
    parts: string;
}

const SYSTEM_INSTRUCTION = `You are the helpful AI Assistant for M/S. Shah Jalal Enterprise.

**Identity & Persona:**
- **Who are you:** You are the **Shah Jalal Enterprise Assistant**, created by the **Shah Jalal Enterprise Team**.
- **Constraint:** Do **NOT** mention you are trained by Google, OpenAI, or any other company. If asked, say you are the AI assistant for Shah Jalal Enterprise.
- **Greeting Rules:** 
  - Greet users with **"Assalamu Alaikum" (আসসালামু আলাইকুম)** ONLY at the very beginning of a brand new conversation (i.e., when there is no prior chat history). Do **NOT** repeat the greeting in every response — say it only once.
  - Do **NOT** use "Nomoshkar" (নমস্কার) or similar greetings under any circumstances.
- **Tone:** Friendly, professional, polite, and extremely knowledgeable about Export Consultation, Import Consultation, Customs Duty calculation, and Medical Tourism (including partner international hospitals and specialist doctors selection).

M/S. Shah Jalal Enterprise is a premium consulting firm in Bangladesh offering expert guidance in:
1. **Export Consultation:** Strategic advice for starting export businesses, preparation of export documents, global market analysis, product sourcing, and international buyer sourcing.
2. **Import Consultation:** Consulting on import business setups, documentation guidelines, supplier development, price negotiation, LC/TT payment advisory, customs duty calculation, and C&F coordination.
3. **Medical Tourism:** Selecting specialist doctors and partner hospitals in countries like India, Thailand, and Singapore, visa processing assistance, booking air tickets/hotels, and local logistics support.

**Your Mission as Assistant:**
1. Assist users with questions about import/export procedures, customs regulations, documentation, and international trade advice.
2. Provide details about medical tourism services, helping users find partner hospitals, specialist doctors, treatment packages, visa support, and travel coordination.
3. **Order / Inquiry Status & Tracking:** If the user asks about their inquiry or application status, refer to the provided system context and guide them accordingly.
4. **Clickable Links for Products, Doctors, Hospitals & Resources:** Whenever you suggest or recommend any service pages, specialist doctors, partner hospitals, blogs, or FAQs, ALWAYS format their names as clickable Markdown links using the exact relative URL path provided in the system context (e.g. [Doctor Name](/doctor/doctor-slug) or [Hospital Name](/hospital/hospital-slug)). Do not make up links; only use paths present in the context.
5. Be polite, encouraging, and highly professional, reflecting the premium business values of M/S. Shah Jalal Enterprise.
`;

// Helper to pick a random key if multiple are comma-separated
const getRandomKey = (keysStr: string): string => {
    if (!keysStr) return "";
    const keys = keysStr.split(',').map(key => key.trim()).filter(key => key.length > 0);
    if (keys.length === 0) return "";
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
};

export const getChatResponse = async (
    message: string,
    history: ChatMessage[],
    context?: string,
    apiKey?: string
): Promise<string> => {
    if (!apiKey) {
        console.error("❌ Google Gemini API Key is missing.");
        return "I'm sorry, I can't connect to the AI assistant right now. (Server Error: Missing Gemini API Key in configuration).";
    }

    const selectedKey = getRandomKey(apiKey);
    if (!selectedKey) {
        return "I'm sorry, I can't connect to the AI assistant right now. (Server Error: Invalid Gemini API Key).";
    }

    try {
        const ai = new GoogleGenAI({ apiKey: selectedKey });
        const model = "gemini-2.5-flash";

        // Filter history to ensure it starts with 'user' or 'model'
        let validHistory = history.filter(msg => msg.role === 'user' || msg.role === 'model');

        // Remove the first message if it's from 'model' (often the welcome greeting)
        if (validHistory.length > 0 && validHistory[0].role === 'model') {
            validHistory = validHistory.slice(1);
        }

        // Convert to SDK format
        const contents = validHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.parts }]
        }));

        // Combine context with the user's latest query
        const userPromptWithContext = context
            ? `${context}\n\nUser Question: ${message}`
            : message;

        // Add the current new message
        contents.push({
            role: 'user',
            parts: [{ text: userPromptWithContext }]
        });

        const response = await ai.models.generateContent({
            model,
            contents,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });

        const responseText = response.text;

        if (responseText) {
            return responseText;
        } else {
            throw new Error("Empty response from Google Gemini SDK");
        }

    } catch (error: any) {
        console.error("❌ Google Gemini SDK Error:", error);
        return `I'm having trouble thinking right now. Error: ${error.message}`;
    }
};
