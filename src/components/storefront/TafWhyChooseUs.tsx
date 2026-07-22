'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, HeartPulse, Sparkles, MessageCircle, Plus, PhoneCall, Globe, Stethoscope, FileCheck, Building2 } from 'lucide-react';

const tradeReasons = [
  {
    icon: ShieldCheck,
    title: 'Expert Trade & Customs Compliance',
    desc: 'We handle complex customs clearing, HS Code tariff verification, and global sourcing structures with absolute compliance and zero delay.',
  },
  {
    icon: FileCheck,
    title: 'Verified Global Supplier Networks',
    desc: 'Direct connection with compliance-certified manufacturers and exporters across China, India, Europe, and Vietnam.',
  },
  {
    icon: Sparkles,
    title: 'L/C & Financial Risk Protection',
    desc: 'Protecting transaction security with Bank Letter of Credit (L/C) reviews, TT advisories, and export credit guarantee support.',
  },
];

const medicalReasons = [
  {
    icon: HeartPulse,
    title: 'Emergency Healthcare Logistics',
    desc: 'Immediate 24/7 air evacuation and ICU ground ambulance dispatch along with expedited medical visa invitation letters.',
  },
  {
    icon: Building2,
    title: 'Partner Hospital Priority Booking',
    desc: 'Direct partnership and verified priority doctor appointment slots at top JCI-accredited tertiary hospitals globally.',
  },
  {
    icon: Sparkles,
    title: 'Dedicated Bengali Patient Liaison',
    desc: 'Personal Bengali-speaking patient coordinator assisting throughout treatment, medical report translation, and hotel stay.',
  },
];

const avatars = [
  'https://i.pravatar.cc/40?u=a1',
  'https://i.pravatar.cc/40?u=a2',
  'https://i.pravatar.cc/40?u=a3',
  'https://i.pravatar.cc/40?u=a4',
];

export function TafWhyChooseUs() {
  const [division, setDivision] = useState<'trade' | 'medical'>('trade');

  const currentReasons = division === 'trade' ? tradeReasons : medicalReasons;

  return (
    <section className="py-16 md:py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text Content ── */}
          <div className="space-y-8">
            {/* Badge + Heading */}
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary">
                <span className="text-base">✦</span>
                Why choose us
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Dedicated Expertise
                <br />
                <span className="italic font-light">you can trust</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                We maintain specialized, dedicated teams for each business division to deliver tailored advisory and client care that exceeds expectations.
              </p>

              {/* Division Selector Tabs */}
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
                  <span>Global Trade<span className="hidden sm:inline"> Division</span></span>
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
                  <span>Medical Tourism<span className="hidden sm:inline"> Division</span></span>
                </button>
              </div>
            </div>

            {/* Reasons list */}
            <div className="space-y-0 divide-y divide-border">
              {currentReasons.map((r, i) => (
                <div key={i} className="flex items-start gap-4 py-5">
                  <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <r.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-foreground">{r.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image collage ── */}
          <div className="grid grid-cols-2 gap-4 h-[540px]">

            {/* ── Left sub-column: main image + trusted clients ── */}
            <div className="flex flex-col gap-4 h-full">
              {/* Main consultant/medical image — tall */}
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image
                  src={
                    division === 'trade'
                      ? 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80'
                      : '/assets/images/hospitals/apollo_hospital_chennai.webp'
                  }
                  alt={division === 'trade' ? 'Trade Sourcing Consultants' : 'Medical Tourism Assistance'}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  priority
                />
                {/* Got questions overlay */}
                <div className="absolute bottom-4 left-3 right-3 z-10">
                  <div className="bg-primary/95 backdrop-blur-sm text-primary-foreground rounded-xl px-4 py-3 flex items-center gap-3 shadow-md">
                    <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Got questions?</p>
                      <p className="text-[11px] text-primary-foreground/80">Our division advisors are here!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trusted clients card */}
              <div className="bg-primary rounded-2xl p-5 flex flex-col justify-between shrink-0 shadow-md">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-primary-foreground font-bold text-sm mt-2">
                  More Than 1K+ Satisfied Clients
                </p>
                {/* Avatars */}
                <div className="flex items-center mt-3">
                  {avatars.map((src, i) => (
                    <div
                      key={i}
                      className="relative h-8 w-8 rounded-full border-2 border-primary overflow-hidden -ml-2 first:ml-0 shadow"
                    >
                      <Image 
                        src={src} 
                        alt={`Client ${i + 1}`} 
                        fill 
                        sizes="32px" 
                        className="object-cover" 
                      />
                    </div>
                  ))}
                  <div className="h-8 w-8 rounded-full border-2 border-primary bg-primary-foreground/20 flex items-center justify-center -ml-2">
                    <Plus className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right sub-column: rotating badge + horizontal image ── */}
            <div className="flex flex-col gap-4 h-full">
              {/* Rotating contact badge */}
              <div className="flex justify-center items-center py-1 shrink-0">
                <Link href="/contact" className="relative h-32 w-32 flex items-center justify-center group">
                  <svg 
                    className="absolute inset-0 w-full h-full" 
                    viewBox="0 0 128 128"
                    style={{ animation: 'spin 15s linear infinite' }}
                  >
                    <defs>
                      <path id="circle-wcu" d="M 64,64 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
                    </defs>
                    <text className="fill-foreground font-bold" fontSize="9.5" letterSpacing="3.5">
                      <textPath href="#circle-wcu">CONTACT US • CONTACT US • </textPath>
                    </text>
                  </svg>
                  <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <PhoneCall className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                </Link>
              </div>

              {/* Division specific secondary image */}
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image
                  src={
                    division === 'trade'
                      ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80'
                      : '/assets/images/hospitals/raffles_hospital_singapore.webp'
                  }
                  alt={division === 'trade' ? 'Global Shipping Cargo' : 'International Hospital Facility'}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
