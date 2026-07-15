import React from 'react';
import Image from 'next/image';
import connectToDatabase from '@/lib/db';
import Hospital from '@/models/Hospital';
import { notFound } from 'next/navigation';
import { Building2, MapPin, Award, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function HospitalProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  await connectToDatabase();
  const { slug } = await params;

  const hospital = await Hospital.findOne({ slug, isActive: true }).lean().exec();

  if (!hospital) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link href="/medical-tourism" className="inline-flex items-center text-sm font-semibold text-primary hover:underline gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </Link>

        {/* Hospital Card Header */}
        <div className="rounded-2xl border border-border bg-card text-card-foreground p-6 md:p-8 shadow-lg flex flex-col md:flex-row gap-6 md:items-center">
          {hospital.logo ? (
            <Image src={hospital.logo} alt={hospital.name} width={96} height={96} className="w-24 h-24 object-contain shrink-0 bg-white p-2 rounded-lg border border-border" />
          ) : (
            <div className="w-24 h-24 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold shrink-0 border border-border">
              {hospital.name[0]}
            </div>
          )}
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground tracking-tight font-heading">{hospital.name}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{hospital.address}, {hospital.city}, {hospital.country}</span>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-card text-card-foreground border border-border p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-primary font-heading flex items-center gap-2">
            <Building2 className="w-6 h-6" /> About the Medical Institution
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
            {hospital.description}
          </p>
        </div>

        {/* Facilities & Departments split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Departments */}
          <div className="bg-card text-card-foreground border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-primary font-heading">Key Departments</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {hospital.departments.map((dept, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{dept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Facilities */}
          <div className="bg-card text-card-foreground border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-primary font-heading">Advanced Technology & Facilities</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {hospital.advancedFacilities && hospital.advancedFacilities.map((fac, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary shrink-0" />
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Treatment Packages */}
        {hospital.packages && hospital.packages.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary font-heading">Popular Medical Checkups & Treatment Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hospital.packages.map((pkg, i) => (
                <div key={i} className="bg-card text-card-foreground border border-border p-6 rounded-2xl shadow-md space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-foreground font-heading">{pkg.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-3">{pkg.description}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-border pt-4 mt-2">
                    <span className="text-sm font-semibold text-muted-foreground">Est. Cost:</span>
                    <span className="text-lg font-black text-primary">৳{pkg.price.toLocaleString('en-BD')} BDT</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
