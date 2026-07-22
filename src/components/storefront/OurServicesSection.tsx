'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, FileText, Stethoscope, ArrowRight, ShieldCheck, Plane, Ship, Building2, UserCheck, Calculator } from 'lucide-react';

const tradeServices = [
  {
    title: "Import Sourcing & Customs Clearing",
    subtitle: "Global Sourcing & Port Handling",
    description: "End-to-end guidance on international supplier vetting, HS Code duty calculation, Bill of Entry, and C&F port clearance.",
    icon: Ship,
    link: "/import-consulting",
    linkText: "Explore Import Services",
    badge: "Import Advisory"
  },
  {
    title: "Export Licensing & Buyer Matchmaking",
    subtitle: "Global Market Expansion",
    description: "Complete export paperwork support including ERC registration, BGMEA UD approvals, Phytosanitary NOC, and buyer contracts.",
    icon: FileText,
    link: "/export-consulting",
    linkText: "Explore Export Services",
    badge: "Export Advisory"
  },
  {
    title: "L/C & Financial Risk Management",
    subtitle: "Cross-Border Payment Protection",
    description: "Letter of Credit (L/C) review, commercial sales contract verification, TT transfer compliance, and currency endorsement.",
    icon: ShieldCheck,
    link: "/import-consulting",
    linkText: "L/C Advisory Guide",
    badge: "Financial Trade"
  },
  {
    title: "Customs Duty & Tariff Calculator",
    subtitle: "Instant Tariff Estimation",
    description: "Calculate exact Bangladesh Customs CD, SD, VAT, AIT, and AT charges for commercial & capital goods imports.",
    icon: Calculator,
    link: "/duty-calculator",
    linkText: "Calculate Customs Duty",
    badge: "Duty Tool"
  }
];

const medicalServices = [
  {
    title: "Specialist Doctor Appointments",
    subtitle: "Top Senior Consultants Abroad",
    description: "Direct priority appointment booking with world-renowned specialist doctors and surgeons across India, Singapore, and Thailand.",
    icon: UserCheck,
    link: "/medical-tourism",
    linkText: "Find Specialist Doctors",
    badge: "Doctor Booking"
  },
  {
    title: "Medical Visa Invitation (VISA NOC)",
    subtitle: "Expedited Embassy Coordination",
    description: "Direct issuance of official hospital invitation letters (VISA NOC) within 24-48 hours for fast-track medical visa approvals.",
    icon: FileText,
    link: "/medical-tourism",
    linkText: "Request Visa NOC",
    badge: "Visa Assistance"
  },
  {
    title: "Partner Hospital Admissions",
    subtitle: "JCI-Accredited Healthcare",
    description: "Direct bed reservation, VIP international lounge access, and complete treatment packages at Apollo, Raffles, and Bangkok Hospitals.",
    icon: Building2,
    link: "/medical-tourism",
    linkText: "View Partner Hospitals",
    badge: "Hospital Care"
  },
  {
    title: "Interpreter, Airport Pick-up & Lodging",
    subtitle: "Complete Travel Coordination",
    description: "Free airport reception, dedicated Bengali medical interpreter, Halal food delivery, and hotel booking near the hospital.",
    icon: Plane,
    link: "/medical-tourism",
    linkText: "Explore Patient Services",
    badge: "Logistics Support"
  }
];

export function OurServicesSection() {
  const [activeTab, setActiveTab] = useState<'trade' | 'medical'>('trade');

  const services = activeTab === 'trade' ? tradeServices : medicalServices;

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <span className="text-base">✦</span> What We Do
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight font-heading text-foreground">
            Our Key Services &amp; Solutions
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Delivering dedicated, high-precision consultancy across our two specialized business divisions. Select a division below to explore our services.
          </p>

          {/* Division Selector Tabs */}
          <div className="flex justify-center pt-2 w-full">
            <div className="bg-muted p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-border flex items-center justify-between gap-1 w-full max-w-xl shadow-sm">
              <button
                onClick={() => setActiveTab('trade')}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 sm:px-5 py-2.5 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${
                  activeTab === 'trade'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span>Global Trade &amp; Sourcing<span className="hidden sm:inline"> Services</span></span>
              </button>
              <button
                onClick={() => setActiveTab('medical')}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 sm:px-5 py-2.5 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${
                  activeTab === 'medical'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 shrink-0" />
                <span>Medical Tourism<span className="hidden sm:inline"> Services</span></span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-card text-card-foreground border border-border rounded-3xl p-6 md:p-8 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
              >
                {/* Background subtle glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

                <div className="space-y-5 relative z-10">
                  {/* Top Badge & Icon */}
                  <div className="flex justify-between items-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-primary block uppercase tracking-wider">
                      {service.subtitle}
                    </span>
                    <h3 className="text-xl font-bold font-heading text-foreground leading-snug group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom CTA Link */}
                <div className="pt-6 mt-4 border-t border-border/60 relative z-10">
                  <Link
                    href={service.link}
                    className="inline-flex items-center text-xs font-bold text-primary group-hover:underline gap-1.5"
                  >
                    <span>{service.linkText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
