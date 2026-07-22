import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import Hospital from '@/models/Hospital';
import Doctor from '@/models/Doctor';
import { getDetailedHospital, DetailedDoctor } from '@/lib/hospitalData';
import { HospitalAppointmentActions } from '@/components/storefront/HospitalAppointmentActions';
import { 
  Building2, 
  MapPin, 
  Award, 
  CheckCircle2, 
  ArrowLeft, 
  FileText, 
  Car, 
  Languages, 
  Home, 
  CreditCard, 
  UserCheck, 
  Clock, 
  PhoneCall, 
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export const revalidate = 0;

export default async function HospitalProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  await connectToDatabase();
  const { slug } = await params;

  // 1. Fetch DB Hospital if exists
  const dbHospital = await Hospital.findOne({ slug, isActive: true }).lean().exec();

  // 2. Fetch static detailed hospital fallback/enrichment data
  const staticHospital = getDetailedHospital(slug);

  if (!dbHospital && !staticHospital) {
    notFound();
  }

  // Merge DB and static details
  const hospitalName = dbHospital?.name || staticHospital.name;
  const hospitalDescription = dbHospital?.description || staticHospital.description;
  const hospitalCountry = dbHospital?.country || staticHospital.country;
  const hospitalCity = dbHospital?.city || staticHospital.city;
  const hospitalAddress = dbHospital?.address || staticHospital.address;
  const hospitalImage = staticHospital.image || '/assets/images/hospitals/apollo_hospital_chennai.webp';
  const hospitalLogo = dbHospital?.logo || staticHospital.logo;
  const departments = (dbHospital?.departments && dbHospital.departments.length > 0) 
    ? dbHospital.departments 
    : staticHospital.departments;
  const advancedFacilities = (dbHospital?.advancedFacilities && dbHospital.advancedFacilities.length > 0) 
    ? dbHospital.advancedFacilities 
    : staticHospital.advancedFacilities;
  const packages = (dbHospital?.packages && dbHospital.packages.length > 0) 
    ? dbHospital.packages 
    : staticHospital.packages;

  // 3. Fetch Doctors for this Hospital from DB
  let dbDoctors: DetailedDoctor[] = [];
  if (dbHospital?._id) {
    const rawDoctors = await Doctor.find({ hospitalId: dbHospital._id, isActive: true }).lean().exec();
    dbDoctors = rawDoctors.map((d: any) => ({
      name: d.name,
      slug: d.slug,
      specialty: d.specialty,
      qualification: d.qualification,
      experience: d.experience,
      image: d.image,
      availableDays: d.availableSlots?.join(', ') || 'Mon - Sat'
    }));
  }

  const allDoctors = dbDoctors.length > 0 ? dbDoctors : staticHospital.doctors;
  const guidelines = staticHospital.bangladeshiGuidelines;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-6 h-6 text-primary shrink-0" />;
      case 'Car': return <Car className="w-6 h-6 text-primary shrink-0" />;
      case 'Languages': return <Languages className="w-6 h-6 text-primary shrink-0" />;
      case 'Home': return <Home className="w-6 h-6 text-primary shrink-0" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6 text-primary shrink-0" />;
      default: return <ShieldCheck className="w-6 h-6 text-primary shrink-0" />;
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Back Link */}
        <Link href="/medical-tourism" className="inline-flex items-center text-sm font-semibold text-primary hover:underline gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Back to Medical Tourism Directory
        </Link>

        {/* Hero Banner Section */}
        <div className="rounded-3xl border border-border bg-card text-card-foreground shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="relative h-64 md:h-auto md:w-1/2 bg-muted">
            <Image
              src={hospitalImage}
              alt={hospitalName}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {hospitalCountry}
            </div>
          </div>

          <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              {hospitalLogo && (
                <Image src={hospitalLogo} alt={hospitalName} width={64} height={64} className="h-12 w-auto object-contain" />
              )}
              <h1 className="text-3xl font-extrabold font-heading text-foreground tracking-tight">{hospitalName}</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{hospitalAddress}</span>
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-bold bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full">
                  JCI Accredited Facility
                </span>
                <span className="text-[11px] font-bold bg-muted text-muted-foreground border border-border px-2.5 py-0.5 rounded-full">
                  24/7 International Desk
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <HospitalAppointmentActions 
                hospitalName={hospitalName} 
                mode="appointment" 
                buttonText="Book Appointment" 
                className="bg-primary text-primary-foreground hover:opacity-90 py-5 text-sm w-full sm:w-auto" 
              />
              <HospitalAppointmentActions 
                hospitalName={hospitalName} 
                mode="visa" 
                buttonText="Visa NOC Letter" 
                variant="outline" 
                className="py-5 text-sm w-full sm:w-auto" 
              />
            </div>
          </div>
        </div>

        {/* Hospital Description */}
        <div className="bg-card text-card-foreground border border-border p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-primary font-heading flex items-center gap-2">
            <Building2 className="w-6 h-6" /> About the Hospital
          </h2>
          <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-line">
            {hospitalDescription}
          </p>
        </div>

        {/* Key Departments & Advanced Facilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Departments */}
          <div className="bg-card text-card-foreground border border-border p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-primary font-heading flex items-center gap-2">
              <Stethoscope className="w-5 h-5" /> Specialized Departments
            </h3>
            <div className="space-y-2.5 text-sm text-foreground/80">
              {departments.map((dept, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="font-medium text-xs md:text-sm">{dept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Facilities */}
          <div className="bg-card text-card-foreground border border-border p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-primary font-heading flex items-center gap-2">
              <Award className="w-5 h-5" /> Medical Technology & Facilities
            </h3>
            <div className="space-y-2.5 text-sm text-foreground/80">
              {advancedFacilities.map((fac, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="font-medium text-xs md:text-sm">{fac}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bangladeshi Patient Guidelines & Support */}
        <div className="bg-card text-card-foreground border border-border p-6 md:p-8 rounded-2xl shadow-md space-y-6">
          <div className="border-b border-border pb-4">
            <h2 className="text-2xl font-bold text-primary font-heading flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-primary" /> 
              Bangladeshi Patient Guidance & Support (বাংলাদেশি রোগীদের জন্য নির্দেশিকা)
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm mt-1">
              Complete step-by-step assistance for medical travel, visa NOC, airport reception, and local stays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guidelines.map((guide, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-muted/40 border border-border/80 flex gap-4 hover:border-primary/40 transition-colors">
                <div className="p-3 bg-primary/10 rounded-xl h-fit">
                  {getIcon(guide.iconName)}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground text-sm font-heading">{guide.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{guide.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/20 p-4 rounded-xl">
            <div>
              <p className="text-xs font-bold text-foreground">Need urgent Visa NOC or Travel Assistance?</p>
              <p className="text-[11px] text-muted-foreground">Our Dhaka & Chittagong coordinators manage everything directly with {hospitalName}.</p>
            </div>
            <HospitalAppointmentActions 
              hospitalName={hospitalName} 
              mode="visa" 
              buttonText="Request Visa Letter" 
              className="bg-primary text-primary-foreground py-3 text-xs shrink-0" 
            />
          </div>
        </div>

        {/* Specialist Doctors List */}
        {allDoctors.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-border pb-4">
              <div>
                <h2 className="text-2xl font-bold text-primary font-heading flex items-center gap-3">
                  <UserCheck className="w-7 h-7" /> Specialist Doctors ({hospitalName})
                </h2>
                <p className="text-muted-foreground text-xs md:text-sm mt-1">
                  Consult with top senior consultants and surgeons affiliated with this institution.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allDoctors.map((doc, idx) => (
                <div key={idx} className="bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-all space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20 shrink-0">
                        {doc.name.replace('Dr.', '').trim()[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-md font-heading line-clamp-1">{doc.name}</h4>
                        <p className="text-xs font-semibold text-primary">{doc.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground space-y-1 border-t border-border/60 pt-3">
                      <p><span className="font-medium text-foreground">Qualification:</span> {doc.qualification}</p>
                      <p><span className="font-medium text-foreground">Experience:</span> {doc.experience}</p>
                      {doc.availableDays && (
                        <p className="flex items-center gap-1 text-[11px] text-muted-foreground pt-1">
                          <Clock className="w-3.5 h-3.5 text-primary" /> Availability: {doc.availableDays}
                        </p>
                      )}
                    </div>
                  </div>

                  <HospitalAppointmentActions 
                    hospitalName={hospitalName} 
                    doctorName={doc.name} 
                    buttonText="Book Appointment" 
                    className="w-full bg-primary text-primary-foreground py-4 text-xs font-semibold" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Treatment Packages Section */}
        {packages && packages.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-border pb-4">
              <h2 className="text-2xl font-bold text-primary font-heading">Popular Medical Checkup & Treatment Packages</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg, i) => (
                <div key={i} className="bg-card text-card-foreground border border-border p-6 rounded-2xl shadow-md space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-foreground font-heading">{pkg.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{pkg.description}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-border pt-4">
                    <div>
                      <span className="text-xs text-muted-foreground block">Estimated Package Price:</span>
                      <span className="text-xl font-black text-primary">৳{pkg.price.toLocaleString('en-BD')} BDT</span>
                    </div>
                    <HospitalAppointmentActions 
                      hospitalName={hospitalName} 
                      buttonText="Book Package" 
                      variant="outline"
                      className="py-3 text-xs" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Direct Call / Helpline Footer Banner */}
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 text-center space-y-4 shadow-lg">
          <h3 className="text-2xl font-bold font-heading">Have Questions regarding Treatment at {hospitalName}?</h3>
          <p className="text-sm opacity-90 max-w-xl mx-auto font-medium">
            Contact our dedicated Medical Tourism desk for free doctor profile recommendations, cost estimates, and visa assistance.
          </p>
          <div className="flex justify-center pt-2">
            <HospitalAppointmentActions 
              hospitalName={hospitalName} 
              buttonText="Request Free Medical Consultation" 
              className="bg-background text-primary hover:bg-muted font-bold py-5 px-6 rounded-lg text-sm" 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
