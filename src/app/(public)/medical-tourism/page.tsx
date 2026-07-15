import React from 'react';
import connectToDatabase from '@/lib/db';
import Hospital from '@/models/Hospital';
import Doctor from '@/models/Doctor';
import MedicalTourismClient from './MedicalTourismClient';

export const revalidate = 0; // Disable caching to fetch live data

export default async function MedicalTourismPage() {
  await connectToDatabase();

  const rawHospitals = await Hospital.find({ isActive: true }).lean().exec();
  const rawDoctors = await Doctor.find({ isActive: true }).lean().exec();

  // Map Mongo documents to plain JS objects to prevent serialization errors
  const hospitals = rawHospitals.map((h: any) => ({
    id: h._id.toString(),
    name: h.name,
    slug: h.slug,
    description: h.description,
    country: h.country,
    city: h.city,
    departments: h.departments,
    logo: h.logo || '',
    packages: h.packages ? h.packages.map((pkg: any) => ({
      title: pkg.title,
      price: pkg.price,
      description: pkg.description
    })) : []
  }));

  const doctors = rawDoctors.map((d: any) => ({
    id: d._id.toString(),
    name: d.name,
    slug: d.slug,
    specialty: d.specialty,
    qualification: d.qualification,
    experience: d.experience,
    country: d.country,
    availableSlots: d.availableSlots || [],
    hospitalName: hospitals.find((h) => h.id === d.hospitalId?.toString())?.name || 'Partner Hospital',
    image: d.image || ''
  }));

  return (
    <MedicalTourismClient hospitals={hospitals} doctors={doctors} />
  );
}
