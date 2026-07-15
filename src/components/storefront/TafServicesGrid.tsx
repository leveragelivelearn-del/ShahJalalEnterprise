'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    num: "01",
    title: "Global LC Advisory",
    description: "Secure and structured letter of credit facilitation for cross-border transactions.",
    link: "/import-consulting"
  },
  {
    num: "02",
    title: "Medical Visa Support",
    description: "Rapid acquisition of medical invitation letters and direct speed visa coordination.",
    link: "/medical-tourism"
  },
  {
    num: "03",
    title: "Port Customs Clearing",
    description: "Prompt clearing and customs documentation clearance at air, sea, and land ports.",
    link: "/import-consulting"
  },
  {
    num: "04",
    title: "Specialist Appointments",
    description: "Immediate direct access booking to top-tier doctors and surgeons worldwide.",
    link: "/medical-tourism"
  }
];

export function TafServicesGrid() {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">

        {/* Header Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary">
              <span className="text-primary text-base">✦</span>
              Our Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Seamless consulting that brings success to{' '}
              <span className="italic font-light">every venture</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed pt-1">
            We believe every consulting opportunity should be a pathway to growth — that is why our customized corporate trade and medical coordination services are delivered with extreme precision, prioritizing your peace of mind and success.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => (
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
            Free
          </span>
          <p className="text-sm text-muted-foreground">
            Experience the expertise everyone's talking about —{' '}
            <Link href="/contact" className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors">
              get in touch with our advisors today!
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}
