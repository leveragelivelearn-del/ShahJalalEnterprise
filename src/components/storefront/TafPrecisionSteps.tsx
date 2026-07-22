'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Settings, Globe, Stethoscope } from 'lucide-react';

const tradeSteps = [
  {
    num: "01",
    title: "Free Commercial Sourcing & Tariff Feasibility",
    description: "Senior trade advisors analyze product HS Codes, duty structures, and target market feasibility."
  },
  {
    num: "02",
    title: "Fast L/C & Commercial Bank Paperwork Opening",
    description: "Preparing Letter of Credit applications, Proforma Invoice reviews, and outward bank clearance."
  },
  {
    num: "03",
    title: "Real-time Customs & Port C&F Clearing",
    description: "Direct handling of customs documentation, Bill of Entry, and cargo release at sea/air ports."
  },
  {
    num: "04",
    title: "Factory Quality Control & PSI Inspection",
    description: "Conducting pre-shipment inspections and verifying product quality standards before container dispatch."
  },
  {
    num: "05",
    title: "Safe Door-to-Door Container Logistics",
    description: "Coordinating port transport, inland trucking, and final commercial warehouse delivery."
  }
];

const medicalSteps = [
  {
    num: "01",
    title: "Medical Report & Specialist Evaluation",
    description: "Reviewing patient diagnosis reports with senior doctors to match suitable hospitals and cost estimates."
  },
  {
    num: "02",
    title: "Fast-Track Medical Visa (NOC) Issuance",
    description: "Issuing official hospital visa invitation letters from partner institutions in India, Singapore, and Thailand."
  },
  {
    num: "03",
    title: "Doctor Appointment & Bed Reservation",
    description: "Securing priority doctor serial tokens and reserving specialized hospital suites before travel."
  },
  {
    num: "04",
    title: "Airport Receive & Bengali Interpreter",
    description: "Free airport pick-up at destination airport with assigned Bengali medical coordinator assistance."
  },
  {
    num: "05",
    title: "Admission, Lodging & Recovery Support",
    description: "Guiding hospital admission, pre-booking nearby Halal food hotels, and facilitating post-treatment follow-ups."
  }
];

export function TafPrecisionSteps() {
  const [division, setDivision] = useState<'trade' | 'medical'>('trade');

  const currentSteps = division === 'trade' ? tradeSteps : medicalSteps;

  return (
    <section className="py-20 bg-muted/10 border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Left Side Header and Info */}
        <div className="lg:col-span-5 space-y-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase">
            <Settings className="w-3.5 h-3.5 animate-spin" /> Precision Division Workflow
          </span>
          <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight text-foreground">
            From Assessment to Handover — <span className="text-primary">5 Precision Steps</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Our specialized workflows ensure that every commercial trade project or patient medical journey reaches completion under rigorous standards and absolute safety.
          </p>

          {/* Division Tabs */}
          <div className="flex items-center justify-between gap-1.5 pt-2 w-full max-w-md bg-muted p-1 rounded-xl border border-border">
            <button
              onClick={() => setDivision('trade')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 rounded-lg font-bold text-[11px] sm:text-xs whitespace-nowrap transition-all duration-300 ${
                division === 'trade'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>Trade &amp; Sourcing<span className="hidden sm:inline"> Workflow</span></span>
            </button>
            <button
              onClick={() => setDivision('medical')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 rounded-lg font-bold text-[11px] sm:text-xs whitespace-nowrap transition-all duration-300 ${
                division === 'medical'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 shrink-0" />
              <span>Medical Tourism<span className="hidden sm:inline"> Workflow</span></span>
            </button>
          </div>


        </div>

        {/* Right Side Vertical Stack of Steps */}
        <div className="lg:col-span-7 space-y-4">
          {currentSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 p-5 bg-card border border-border rounded-[1rem] shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
            >
              {/* Step Number */}
              <span className="text-2xl font-black text-primary shrink-0">
                {step.num}
              </span>

              {/* Step Info */}
              <div className="space-y-1">
                <h4 className="text-md font-bold text-foreground">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
