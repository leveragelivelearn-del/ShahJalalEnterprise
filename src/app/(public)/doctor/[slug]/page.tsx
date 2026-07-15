import React from 'react';
import connectToDatabase from '@/lib/db';
import Doctor from '@/models/Doctor';
import Hospital from '@/models/Hospital';
import { notFound } from 'next/navigation';
import { BadgeCheck, Calendar, ArrowLeft, GraduationCap, Award, MapPin } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function DoctorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  await connectToDatabase();
  const { slug } = await params;

  const doctor = await Doctor.findOne({ slug, isActive: true }).populate('hospitalId').lean().exec();

  if (!doctor) {
    notFound();
  }

  const hospital = doctor.hospitalId as any;

  return (
    <div className="bg-background text-foreground min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link href="/medical-tourism" className="inline-flex items-center text-sm font-semibold text-primary hover:underline gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </Link>

        {/* Profile Card Header */}
        <div className="rounded-2xl border border-border bg-card text-card-foreground p-6 md:p-8 shadow-lg flex flex-col md:flex-row gap-6 md:items-center">
          {doctor.image ? (
            <img src={doctor.image} alt={doctor.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-primary shrink-0" />
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/10 text-primary flex items-center justify-center text-5xl font-bold shrink-0 border border-border">
              {doctor.name[0]}
            </div>
          )}
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground tracking-tight font-heading">{doctor.name}</h1>
            <p className="text-lg font-bold text-primary">{doctor.specialty}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4 text-primary" /> {doctor.qualification}
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-primary" /> {doctor.experience} Experience
              </span>
              {hospital && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-primary" /> {hospital.name} ({doctor.country})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card text-card-foreground border border-border p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-primary flex items-center gap-2 font-heading">
                <BadgeCheck className="w-5 h-5" /> Professional Profile & Expertise
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Dr. {doctor.name} is a highly accomplished specialist practicing in {doctor.country}. Known for clinical excellence and patient-first healthcare guidance, offering comprehensive medical consultations and surgical options.
              </p>
            </div>

            {doctor.successStories && doctor.successStories.length > 0 && (
              <div className="bg-card text-card-foreground border border-border p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-primary font-heading">Specialized Success Stories</h3>
                <ul className="space-y-3">
                  {doctor.successStories.map((story, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground items-start">
                      <span className="text-primary font-extrabold">•</span>
                      <span>{story}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Book Appointment Card */}
          <div className="space-y-6">
            <div className="bg-card text-card-foreground border border-border p-6 rounded-2xl shadow-lg space-y-4">
              <h4 className="text-lg font-bold text-foreground font-heading flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Available Slots
              </h4>
              <div className="space-y-2">
                {doctor.availableSlots && doctor.availableSlots.length > 0 ? (
                  doctor.availableSlots.map((slot, i) => (
                    <div key={i} className="p-3 text-center rounded-lg border border-border bg-muted/30 text-sm font-semibold text-foreground">
                      {slot}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Please request appointment scheduling support.</p>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                * M/S. Shah Jalal Enterprise assists with fast-tracked appointments, doctor visa invitations, and airport pickups.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
