import React from 'react';
import connectToDatabase from '@/lib/db';
import Hospital from '@/models/Hospital';
import { OurHospitalsSection } from '@/components/storefront/OurHospitalsSection';
import { Metadata } from 'next';

export const revalidate = 0; // live data fetching

export const metadata: Metadata = {
  title: 'Partner Hospitals | M/S. Shah Jalal Enterprise',
  description: 'Search and filter our premium partner international hospitals in India, Thailand, Singapore, Malaysia, and Bangladesh.',
};

export default async function HospitalsPage() {
  let hospitals = [];
  try {
    await connectToDatabase();
    const rawHospitals = await Hospital.find({ isActive: true }).lean().exec();
    hospitals = rawHospitals.map((h: any) => ({
      id: h._id.toString(),
      name: h.name,
      slug: h.slug,
      description: h.description,
      country: h.country,
      city: h.city
    }));
  } catch (error) {
    console.error('Failed to fetch hospitals for page:', error);
  }

  return (
    <div className="bg-background text-foreground min-h-screen py-8">
      {/* Reusing OurHospitalsSection for unified filters & cards layout */}
      <OurHospitalsSection initialHospitals={hospitals} />
    </div>
  );
}
