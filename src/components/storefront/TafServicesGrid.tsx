'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Globe, Stethoscope } from 'lucide-react';

const tradeServices = [
  {
    num: "01",
    title: "Global LC Advisory",
    description: "Secure and structured letter of credit facilitation for international trade and commercial buyers.",
    link: "/import-consulting"
  },
  {
    num: "02",
    title: "Port Customs Clearing",
    description: "Prompt customs duty calculation, C&F port clearance, and Bill of Entry documentation.",
    link: "/import-consulting"
  },
  {
    num: "03",
    title: "International Product Sourcing",
    description: "Connect with verified overseas manufacturers and suppliers across China, India, and Vietnam.",
    link: "/import-consulting"
  },
  {
    num: "04",
    title: "Export Licensing & Compliance",
    description: "Complete assistance for ERC issuance, BGMEA UD approvals, Phytosanitary NOC, and international buyer contracts.",
    link: "/export-consulting"
  }
];

const medicalServices = [
  {
    num: "01",
    title: "Specialist Appointments",
    description: "Immediate direct access booking to top-tier doctors and senior surgeons in India, Singapore, and Thailand.",
    link: "/medical-tourism"
  },
  {
    num: "02",
    title: "Medical Visa Invitation Support",
    description: "Rapid acquisition of official hospital medical invitation letters (VISA NOC) and embassy speed coordination.",
    link: "/medical-tourism"
  },
  {
    num: "03",
    title: "Hospital Admission & Lodging",
    description: "Direct hospital admission booking, VIP lounge access, Bengali interpreter, and nearby hotel arrangements.",
    link: "/medical-tourism"
  },
  {
    num: "04",
    title: "Emergency Air & Ground Ambulance",
    description: "24/7 critical patient air evacuation and ICU ambulance transfers directly to overseas tertiary care hospitals.",
    link: "/medical-tourism"
  }
];

export function TafServicesGrid() {
  const [activeTab, setActiveTab] = useState<'trade' | 'medical'>('trade');

  const currentServices = activeTab === 'trade' ? tradeServices : medicalServices;

  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">

        {/* Header Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary">
              <span className="text-primary text-base">✦</span>
              Our Specialized Divisions
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Seamless consulting for{' '}
              <span className="italic font-light">your specific needs</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              We maintain complete division independence to deliver dedicated expertise without cross-domain mixing. Select a business division below to explore specialized services.
            </p>

            {/* Division Selector Tabs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveTab('trade')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${
                  activeTab === 'trade'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Globe className="w-4 h-4" /> Global Trade & Sourcing Services
              </button>
              <button
                onClick={() => setActiveTab('medical')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${
                  activeTab === 'medical'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Stethoscope className="w-4 h-4" /> Medical Tourism Services
              </button>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentServices.map((svc) => (
            <div
              key={svc.num}
              className="group relative overflow-hidden rounded-[2rem] bg-muted/40 border border-border min-h-[300px] p-8 flex flex-col justify-between transition-colors duration-300"
            >
              {/* Bottom-to-top fill on hover */}
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-[2rem]" />

              {/* Top Content */}
              <div className="relative z-10 space-y-4">
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground group-hover:text-primary-foreground/60 transition-colors duration-300">
                  {svc.num}.
                </p>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary-foreground transition-colors duration-300">
                  {svc.title}
                </h3>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-5">
                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-primary-foreground/85 group-hover:font-medium transition-colors duration-300">
                  {svc.description}
                </p>
                <Link
                  href={svc.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  Read More <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          <span className="bg-primary/10 text-primary text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20">
            Free Consultation
          </span>
          <p className="text-sm text-muted-foreground">
            Experience dedicated expertise in {activeTab === 'trade' ? 'Global Trade & Sourcing' : 'International Medical Tourism'} —{' '}
            <Link href="/contact" className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors">
              get in touch with our division advisors today!
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}
