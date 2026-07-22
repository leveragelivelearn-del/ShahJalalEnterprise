'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

interface HospitalData {
  id?: string;
  name: string;
  slug: string;
  description: string;
  country: string;
  city: string;
  image?: string;
}

const fallbackHospitals: HospitalData[] = [
  {
    name: 'Apollo Hospitals, Chennai',
    slug: 'apollo-hospitals-chennai',
    description: 'Apollo Hospitals Chennai is a leading healthcare facility in India, offering world-class multi-specialty treatments.',
    country: 'India',
    city: 'Chennai',
    image: '/assets/images/hospitals/apollo_hospital_chennai.webp'
  },
  {
    name: 'Farrer Park Hospital',
    slug: 'farrer-park-hospital',
    description: 'Farrer Park Hospital in Singapore is a modern tertiary healthcare facility designed for clinical care and teaching.',
    country: 'Singapore',
    city: 'Singapore',
    image: '/assets/images/hospitals/farrer_park_hospital_singapore.webp'
  },
  {
    name: 'Raffles Hospital',
    slug: 'raffles-hospital',
    description: 'Raffles Hospital is a flagship medical facility in Singapore providing high-quality specialist tertiary care.',
    country: 'Singapore',
    city: 'Singapore',
    image: '/assets/images/hospitals/raffles_hospital_singapore.webp'
  },
  {
    name: 'Bangkok Hospital',
    slug: 'bangkok-hospital',
    description: 'Bangkok Hospital is one of the most advanced healthcare centers in Thailand offering multi-specialty medical services.',
    country: 'Thailand',
    city: 'Bangkok',
    image: '/assets/images/hospitals/bangkok_hospital_thailand.webp'
  }
];

const getHospitalLocalImage = (hospital: HospitalData) => {
  const slug = (hospital.slug || hospital.name).toLowerCase();
  if (slug.includes('apollo')) return '/assets/images/hospitals/apollo_hospital_chennai.webp';
  if (slug.includes('farrer')) return '/assets/images/hospitals/farrer_park_hospital_singapore.webp';
  if (slug.includes('raffles')) return '/assets/images/hospitals/raffles_hospital_singapore.webp';
  if (slug.includes('bangkok')) return '/assets/images/hospitals/bangkok_hospital_thailand.webp';
  return hospital.image && !hospital.image.includes('unsplash.com') 
    ? hospital.image 
    : '/assets/images/hospitals/apollo_hospital_chennai.webp';
};

const countries = ['All', 'Bangladesh', 'India', 'Malaysia', 'Singapore', 'Thailand'];

export function OurHospitalsSection({ initialHospitals = [] }: { initialHospitals?: HospitalData[] }) {
  const [selectedCountry, setSelectedCountry] = useState('All');

  const baseList = initialHospitals.length > 0 ? initialHospitals : fallbackHospitals;
  const displayHospitals = baseList.map(h => ({
    ...h,
    image: getHospitalLocalImage(h)
  }));

  const filteredHospitals = selectedCountry === 'All'
    ? displayHospitals
    : displayHospitals.filter(h => h.country.toLowerCase() === selectedCountry.toLowerCase());

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Section Headers */}
        <div className="text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Medical Tourism</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground font-heading">Our Partner Hospitals</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-2" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-border pb-4">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                selectedCountry === country
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105'
                  : 'bg-muted/40 hover:bg-muted text-muted-foreground'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        {/* Hospitals Grid */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="popLayout">
            {filteredHospitals.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                {filteredHospitals.map((hospital, idx) => (
                  <motion.div
                    key={hospital.slug || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Hospital Image */}
                    <Link href={`/hospital/${hospital.slug}`} className="aspect-[4/3] relative w-full overflow-hidden bg-muted block">
                      <Image
                        src={hospital.image || '/assets/images/hospitals/apollo_hospital_chennai.webp'}
                        alt={hospital.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33.33vw, 25vw"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-xs font-bold text-primary px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1 shadow-sm">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{hospital.country}</span>
                      </div>
                    </Link>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-2">
                        <Link href={`/hospital/${hospital.slug}`} className="block">
                          <h3 className="text-md font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {hospital.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                          {hospital.description}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-border/60">
                        <span className="text-[11px] font-semibold text-muted-foreground">
                          In {hospital.city}, {hospital.country}
                        </span>
                        
                        <Link 
                          href={`/hospital/${hospital.slug}`}
                          className="inline-flex items-center text-xs font-bold text-primary hover:underline gap-1 group/btn"
                        >
                          Read More 
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-60 border border-dashed border-border rounded-2xl"
              >
                <p className="text-sm text-muted-foreground">No hospitals found for this region.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
