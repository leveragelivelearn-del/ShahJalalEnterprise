'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Stethoscope, Building2, Calculator, ArrowRight, MapPin, BadgeCheck, FileText } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';

interface HospitalData {
  id: string;
  name: string;
  slug: string;
  description: string;
  country: string;
  city: string;
  departments: string[];
  logo: string;
  packages: { title: string; price: number; description: string }[];
}

interface DoctorData {
  id: string;
  name: string;
  slug: string;
  specialty: string;
  qualification: string;
  experience: string;
  country: string;
  availableSlots: string[];
  hospitalName: string;
  image: string;
}

export default function MedicalTourismClient({
  hospitals,
  doctors,
}: {
  hospitals: HospitalData[];
  doctors: DoctorData[];
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [activeTab, setActiveTab] = useState<'doctors' | 'hospitals'>('doctors');

  // Estimator States
  const [estDestination, setEstDestination] = useState('');
  const [estCabinClass, setEstCabinClass] = useState('economy');
  const [estTravelers, setEstTravelers] = useState(1);
  const [estTreatmentCost, setEstTreatmentCost] = useState<number>(0);
  const [estimationResult, setEstimationResult] = useState<{
    treatment: number;
    flight: number;
    accommodation: number;
    dailyExpenses: number;
    total: number;
  } | null>(null);

  const countries = Array.from(new Set([...hospitals.map(h => h.country), ...doctors.map(d => d.country)]));
  const specialties = Array.from(new Set(doctors.map(d => d.specialty)));

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !selectedCountry || doc.country === selectedCountry;
    const matchesSpecialty = !selectedSpecialty || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesCountry && matchesSpecialty;
  });

  const filteredHospitals = hospitals.filter((hosp) => {
    const matchesSearch = hosp.name.toLowerCase().includes(searchTerm.toLowerCase()) || hosp.departments.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCountry = !selectedCountry || hosp.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!estDestination) {
      Swal.fire({
        icon: 'warning',
        title: 'Destination Required',
        text: 'Please select a destination country to estimate flight and accommodation costs.',
        confirmButtonColor: 'var(--primary)',
      });
      return;
    }

    // Default calculations for estimation
    let flightCostPerPerson = 25000; // India
    let accommodationPerDay = 3500;  // India
    let dailyFoodExpense = 1500;     // India

    if (estDestination === 'Thailand') {
      flightCostPerPerson = 45000;
      accommodationPerDay = 6000;
      dailyFoodExpense = 2500;
    } else if (estDestination === 'Singapore') {
      flightCostPerPerson = 60000;
      accommodationPerDay = 12000;
      dailyFoodExpense = 5000;
    }

    if (estCabinClass === 'business') {
      flightCostPerPerson *= 2.5;
    }

    const flightTotal = flightCostPerPerson * estTravelers;
    const accommodationTotal = accommodationPerDay * 7; // Average stay 7 days
    const dailyExpensesTotal = dailyFoodExpense * 7 * estTravelers;
    const totalEst = estTreatmentCost + flightTotal + accommodationTotal + dailyExpensesTotal;

    setEstimationResult({
      treatment: estTreatmentCost,
      flight: flightTotal,
      accommodation: accommodationTotal,
      dailyExpenses: dailyExpensesTotal,
      total: totalEst,
    });

    Swal.fire({
      icon: 'success',
      title: 'Cost Estimated!',
      text: `Total Estimated Cost is ৳${totalEst.toLocaleString('en-BD')} BDT`,
      confirmButtonColor: 'var(--primary)',
      timer: 1500,
    });
  };

  const handleBookTourism = (type: 'Doctor' | 'Hospital' | 'General', name: string) => {
    Swal.fire({
      title: `Book ${type} consultation`,
      html: `
        <p class="text-sm text-muted-foreground mb-4">Requesting booking support for: <strong>${name}</strong></p>
        <input id="swal-input-name" class="swal2-input" placeholder="Full Name">
        <input id="swal-input-phone" class="swal2-input" placeholder="Phone Number">
        <input id="swal-input-email" class="swal2-input" placeholder="Email Address">
        <textarea id="swal-input-details" class="swal2-textarea" placeholder="Detail any specific symptoms, medical history, or preferred date..."></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submit Request',
      confirmButtonColor: 'var(--primary)',
      preConfirm: () => {
        const clientName = (document.getElementById('swal-input-name') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input-phone') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input-email') as HTMLInputElement).value;
        const details = (document.getElementById('swal-input-details') as HTMLTextAreaElement).value;

        if (!clientName || !phone || !email || !details) {
          Swal.showValidationMessage('Please fill out all fields');
          return false;
        }
        return { clientName, phone, email, details };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clientName: result.value.clientName,
              email: result.value.email,
              phone: result.value.phone,
              division: 'Medical Tourism',
              serviceType: `${type} Booking - ${name}`,
              details: result.value.details,
            })
          });
          if (res.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Booking Logged!',
              text: 'Our Medical Tourism Executive will coordinate your visa and appointment details.',
              confirmButtonColor: 'var(--primary)',
            });
          } else {
            throw new Error();
          }
        } catch {
          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: 'Please try again later.',
            confirmButtonColor: 'var(--primary)',
          });
        }
      }
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 text-center space-y-6 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-heading">
            International Healthcare & Medical Tourism
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            Consultations for overseas healthcare, visa support, specialist appointments, and complete travel logistics.
          </p>
          <div className="flex justify-center">
            <Button onClick={() => handleBookTourism('General', 'Custom Care Support')} className="bg-background text-primary hover:bg-muted font-semibold px-8 py-6 rounded-lg text-md shadow-lg">
              Get Medical Visa & Travel Support <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Tab Switching */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('doctors')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold border-b-2 text-md transition-colors ${
              activeTab === 'doctors' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Stethoscope className="w-5 h-5" /> Specialist Doctors
          </button>
          <button
            onClick={() => setActiveTab('hospitals')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold border-b-2 text-md transition-colors ${
              activeTab === 'hospitals' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Building2 className="w-5 h-5" /> Partner Hospitals
          </button>
        </div>

        {/* Directory Search & Filter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Column */}
          <Card className="bg-card text-card-foreground border border-border p-6 space-y-6 shadow-md h-fit">
            <h3 className="text-lg font-bold text-primary font-heading">Search Directory</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Keyword</label>
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Doctor, hospital, specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg pl-9 pr-3 py-2.5 text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-background border border-border rounded-lg p-2.5 text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">All Countries</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {activeTab === 'doctors' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Specialty</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-2.5 text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">All Specialties</option>
                  {specialties.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}
          </Card>

          {/* Results Column */}
          <div className="md:col-span-3 space-y-6">
            {activeTab === 'doctors' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doc) => (
                    <Card key={doc.id} className="bg-card text-card-foreground border border-border shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-6 space-y-4">
                        <div className="flex gap-4">
                          {doc.image ? (
                            <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover border border-border" />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                              {doc.name[0]}
                            </div>
                          )}
                          <div>
                            <Link href={`/doctor/${doc.slug}`} className="hover:text-primary font-bold text-lg text-foreground block font-heading">
                              {doc.name}
                            </Link>
                            <p className="text-sm font-semibold text-primary">{doc.specialty}</p>
                            <p className="text-xs text-muted-foreground mt-1">{doc.qualification}</p>
                          </div>
                        </div>

                        <div className="border-t border-border pt-3 space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-primary shrink-0" />
                            <span>{doc.hospitalName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary shrink-0" />
                            <span>{doc.country}</span>
                          </div>
                        </div>

                        <div className="flex gap-3 border-t border-border pt-4">
                          <Link href={`/doctor/${doc.slug}`} className="flex-1 text-center py-2 px-3 border border-border text-foreground hover:bg-muted text-sm font-medium rounded-lg">
                            View Profile
                          </Link>
                          <Button onClick={() => handleBookTourism('Doctor', doc.name)} className="flex-1 bg-primary text-primary-foreground hover:opacity-90 text-sm font-medium py-2 rounded-lg">
                            Request Appointment
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-muted-foreground p-12">No doctors matched your criteria.</div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.map((hosp) => (
                    <Card key={hosp.id} className="bg-card text-card-foreground border border-border shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-6 md:flex gap-6 justify-between items-center">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            {hosp.logo && <img src={hosp.logo} alt={hosp.name} className="w-10 h-10 object-contain" />}
                            <Link href={`/hospital/${hosp.slug}`} className="hover:text-primary font-bold text-xl text-foreground font-heading">
                              {hosp.name}
                            </Link>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{hosp.description}</p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {hosp.departments.slice(0, 4).map((dept, i) => (
                              <span key={i} className="text-xs bg-muted/65 text-muted-foreground px-2 py-1 rounded-md font-semibold">
                                {dept}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 md:mt-0 flex flex-col gap-3 shrink-0 md:border-l border-border md:pl-6 text-center md:text-left min-w-[200px]">
                          <div className="text-sm font-medium flex justify-center md:justify-start items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{hosp.city}, {hosp.country}</span>
                          </div>
                          
                          <Link href={`/hospital/${hosp.slug}`} className="text-center py-2 border border-border text-foreground hover:bg-muted text-sm font-medium rounded-lg">
                            Hospital details
                          </Link>
                          <Button onClick={() => handleBookTourism('Hospital', hosp.name)} className="bg-primary text-primary-foreground hover:opacity-90 text-sm font-medium py-2 rounded-lg">
                            Direct Sourcing support
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground p-12">No hospitals matched your criteria.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Cost Estimator */}
        <Card className="bg-card text-card-foreground border border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-primary font-heading">
              <Calculator className="w-7 h-7" /> Treatment Cost & Logistics Estimator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <form onSubmit={handleEstimate} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Destination Country</label>
                <select
                  value={estDestination}
                  onChange={(e) => setEstDestination(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">Select Destination</option>
                  <option value="India">India</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Cabin Class</label>
                <select
                  value={estCabinClass}
                  onChange={(e) => setEstCabinClass(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="economy">Economy Flight</option>
                  <option value="business">Business Flight</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Travelers Count (including patient)</label>
                <input
                  type="number"
                  min="1"
                  value={estTravelers}
                  onChange={(e) => setEstTravelers(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Estimated Treatment Bill (BDT)</label>
                <input
                  type="number"
                  placeholder="e.g. 300000"
                  value={estTreatmentCost || ''}
                  onChange={(e) => setEstTreatmentCost(Number(e.target.value))}
                  className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <Button type="submit" className="md:col-span-4 w-full bg-primary text-primary-foreground hover:opacity-90 p-4 rounded-lg text-md font-semibold mt-4">
                Estimate Total Budget
              </Button>
            </form>

            {estimationResult && (
              <div className="border-t border-border pt-6 space-y-4">
                <h3 className="text-xl font-bold text-primary font-heading">Budget Allocation Breakdown (7 Days average stay):</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Treatment Cost</p>
                    <p className="text-lg font-bold text-foreground">৳{estimationResult.treatment.toLocaleString('en-BD')}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Flight Tickets</p>
                    <p className="text-lg font-bold text-foreground">৳{estimationResult.flight.toLocaleString('en-BD')}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Accommodation</p>
                    <p className="text-lg font-bold text-foreground">৳{estimationResult.accommodation.toLocaleString('en-BD')}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Daily Food & Transfers</p>
                    <p className="text-lg font-bold text-foreground">৳{estimationResult.dailyExpenses.toLocaleString('en-BD')}</p>
                  </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-xl border border-primary/20 flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-primary font-heading">Total Estimated Budget</h4>
                    <p className="text-xs text-muted-foreground">Estimated visa, flight, hospital lodging, and food cost included.</p>
                  </div>
                  <span className="text-2xl md:text-3xl font-black text-foreground">
                    ৳{estimationResult.total.toLocaleString('en-BD')}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
