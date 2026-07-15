'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Settings } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Free Project Feasibility Assessment",
    description: "Our senior consultants review your trade goals or medical files to confirm route options and budgets."
  },
  {
    num: "02",
    title: "Fast LC & Bank Documentation Opening",
    description: "Preparing compliance paperwork, financial applications, and verifying legal requirements."
  },
  {
    num: "03",
    title: "Real-time Customs & Port Coordination",
    description: "Direct handling of clearing procedures and freight status reporting at target terminals."
  },
  {
    num: "04",
    title: "Quality Assurance & Inspection Coordination",
    description: "Inspecting sourcing orders or matching hospital schedules to secure precise requirements."
  },
  {
    num: "05",
    title: "Hygienic & Secure Door-to-Door Delivery Logistics",
    description: "Safely routing the cleared commercial cargo or managing client lodging transitions."
  }
];

export function TafPrecisionSteps() {
  return (
    <section className="py-20 bg-muted/10 border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side Header and Info */}
        <div className="lg:col-span-5 space-y-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase">
            <Settings className="w-3.5 h-3.5 animate-spin" /> Consultancy Workflow
          </span>
          <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight text-foreground">
            From Assessment to Handover — <span className="text-primary">5 Precision Steps</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Our state-of-the-art service workflow ensures that every consulting project or medical travel logistics setup reaches completion under rigorous standards, expert checkups, and absolute safety.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-6 py-3.5 rounded-xl hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300">
                Explore Full Workflow <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side Vertical Stack of Steps */}
        <div className="lg:col-span-7 space-y-4">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-6 p-5 bg-card border border-border rounded-2xl shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
            >
              {/* Step Number in Primary color */}
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
