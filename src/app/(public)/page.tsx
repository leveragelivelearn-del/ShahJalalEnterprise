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
import { ImportProductsSection } from '@/components/storefront/ImportProductsSection';
import { ExportProductsSection } from '@/components/storefront/ExportProductsSection';
import { OurServicesSection } from '@/components/storefront/OurServicesSection';

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
      city: h.city,
      image: h.imageUrl || h.image
    }));
  } catch (error) {
    console.error('Failed to fetch hospitals:', error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* Premium Hero Section */}
      <SyncedHeroSection />

      {/* Our Services Section */}
      <OurServicesSection />

      {/* Taf Inspired: Circular Feature Cards */}
      <TafFeatureCards />





      {/* Global Import Commodities & Sourcing Guide */}
      <ImportProductsSection />

      {/* Bangladeshi Export Products & Guidelines */}
      <ExportProductsSection />

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
