import React from 'react';
import { Metadata } from 'next';
import { ArrowRight, Globe, Stethoscope, FileText } from 'lucide-react';
import Link from 'next/link';
import { getCachedFAQs, getCachedSettings } from '@/lib/data-fetching';
import { FAQSection } from '@/components/storefront/FAQSection';
import { Testimonials } from '@/components/storefront/Testimonials';
import { SyncedHeroSection } from '@/components/storefront/SyncedHeroSection';
import { MedicalSupportServices } from '@/components/storefront/MedicalSupportServices';
import connectToDatabase from '@/lib/db';
import Hospital from '@/models/Hospital';
import { OurHospitalsSection } from '@/components/storefront/OurHospitalsSection';
import { ExperienceSection } from '@/components/storefront/ExperienceSection';
import { TafFeatureCards } from '@/components/storefront/TafFeatureCards';
import { TafServicesGrid } from '@/components/storefront/TafServicesGrid';
import { TafWhyChooseUs } from '@/components/storefront/TafWhyChooseUs';
import { TafStatsBar } from '@/components/storefront/TafStatsBar';
import { TafPrecisionSteps } from '@/components/storefront/TafPrecisionSteps';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getCachedSettings();
  const brandName = settings?.brandName || 'M/S. Shah Jalal Enterprise';
  const description = settings?.siteDescription || 'Premium Consultation for Global Trade & Medical Tourism';
  return {
    title: brandName,
    description,
  };
}

export default async function Home() {
  const settings = await getCachedSettings();
  const faqs = await getCachedFAQs() || [];

  let hospitals: any[] = [];
  try {
    await connectToDatabase();
    const rawHospitals = await Hospital.find({ isActive: true }).limit(8).lean().exec();
    hospitals = rawHospitals.map((h: any) => ({
      id: h._id.toString(),
      name: h.name,
      slug: h.slug,
      description: h.description,
      country: h.country,
      city: h.city
    }));
  } catch (error) {
    console.error('Failed to fetch hospitals:', error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* Premium Hero Section */}
      <SyncedHeroSection />

      {/* Taf Inspired: Circular Feature Cards */}
      <TafFeatureCards />

      {/* Core Business Divisions */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">Our Key Business Divisions</h2>
          <p className="text-muted-foreground text-md max-w-xl mx-auto">
            Comprehensive global services designed to navigate trade boundaries and access world-class healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Import Consultation */}
          <div className="border border-border bg-card text-card-foreground p-8 rounded-2xl shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-heading">Import Consultation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Unlock global sourcing channels with guidance on customs clearing, international supplier vetting, and shipping logistics.
              </p>
            </div>
            <Link href="/import-consulting" className="mt-8 inline-flex items-center text-sm font-semibold text-primary hover:underline gap-1">
              Explore Import Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Export Consultation */}
          <div className="border border-border bg-card text-card-foreground p-8 rounded-2xl shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-heading">Export Consultation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Start your export business with specialized advice on global market requirements, regulatory paperwork, and buyer sourcing networks.
              </p>
            </div>
            <Link href="/export-consulting" className="mt-8 inline-flex items-center text-sm font-semibold text-primary hover:underline gap-1">
              Explore Export Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Medical Tourism */}
          <div className="border border-border bg-card text-card-foreground p-8 rounded-2xl shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-heading">Medical Tourism</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Connect with specialist doctors and premium partner hospitals in India, Thailand, and Singapore. Comprehensive visa, flight, and lodging coordination.
              </p>
            </div>
            <Link href="/medical-tourism" className="mt-8 inline-flex items-center text-sm font-semibold text-primary hover:underline gap-1">
              Search Doctors & Hospitals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Taf Inspired: Services Grid with highlighting */}
      <TafServicesGrid />

      {/* Healthcare Logistics & Support Services */}
      <MedicalSupportServices />

      {/* Partner Hospitals Showcase Section */}
      <OurHospitalsSection initialHospitals={hospitals} />

      {/* Taf Inspired: Collage / Why Choose Us */}
      <TafWhyChooseUs />

      {/* 30 Years of Experience Section */}
      <ExperienceSection />

      {/* Taf Inspired: Stats Bar Indicator */}
      <TafStatsBar />

      {/* Taf Inspired: Precision Workflow Steps */}
      <TafPrecisionSteps />

      {/* Trust & Verification Badges */}
      <section className="py-16 bg-muted/20 border-y border-border px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <h4 className="text-3xl font-black text-primary">100%</h4>
            <p className="text-sm font-bold text-foreground">Verified Global Standards</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-3xl font-black text-primary">24/7</h4>
            <p className="text-sm font-bold text-foreground">AI Consulting Support</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-3xl font-black text-primary">Partnered</h4>
            <p className="text-sm font-bold text-foreground">Top-Tier Hospitals Abroad</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQs */}
      {faqs.length > 0 && <FAQSection faqs={faqs} />}

    </div>
  );
}
