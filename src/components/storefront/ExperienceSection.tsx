'use client';

import React from 'react';
import Image from 'next/image';
import { Hourglass, ShieldCheck, Globe2 } from 'lucide-react';

const stats = [
  {
    icon: <Hourglass className="w-8 h-8 text-primary" />,
    title: '30+ Years Legacy',
    description: 'Uninterrupted corporate consulting, trade compliance, and medical tourism support.',
    progress: 95
  },
  {
    icon: <Globe2 className="w-8 h-8 text-primary" />,
    title: 'Global Network',
    description: 'Direct partnerships with compliance factories and JCI-accredited hospitals globally.',
    progress: 90
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: '1,000+ Successes',
    description: 'Over a thousand verified commercial trade clearances and patient treatment journeys.',
    progress: 88
  }
];

export function ExperienceSection() {
  return (
    <section className="py-20 bg-background overflow-hidden border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Masked Image */}
        <div className="lg:col-span-5 relative w-full h-[320px] md:h-[450px] group">
          <div 
            className="w-full h-full relative overflow-hidden bg-muted shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)'
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80"
              alt="M/S. Shah Jalal Enterprise Professional Consulting Team"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Abstract overlapping geometric triangles */}
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10 flex items-end">
            <svg 
              viewBox="0 0 400 150" 
              className="w-full h-auto drop-shadow-lg"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="0,150 150,150 70,50" fill="var(--primary)" opacity="0.85" />
              <polygon points="60,150 220,150 140,20" fill="var(--secondary)" opacity="0.9" />
              <polygon points="120,150 280,150 200,70" fill="var(--primary)" opacity="0.75" />
              <polygon points="180,150 320,150 250,90" fill="var(--secondary)" opacity="0.6" />
              <polygon points="260,150 400,150 330,40" fill="var(--primary)" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Right Side: Text details & Progress indicators */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Section Headers */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight text-foreground">
              30 Years of <br />
              <span className="text-primary">
                Dedicated Excellence
              </span>
            </h2>
          </div>

          {/* Columns of Description Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-md text-muted-foreground leading-relaxed">
            <p className="bg-muted/30 p-4 rounded-xl border border-border">
              <strong className="text-foreground font-bold block mb-1">Global Trade & Sourcing:</strong>
              Providing high-precision customs clearing, L/C financial advisory, HS Code classification, and overseas manufacturer sourcing for Bangladeshi commercial enterprises.
            </p>
            <p className="bg-muted/30 p-4 rounded-xl border border-border">
              <strong className="text-foreground font-bold block mb-1">Medical Tourism Assistance:</strong>
              Connecting patients directly with top specialist doctors and JCI-accredited tertiary hospitals in India, Singapore, Thailand, and Malaysia with end-to-end visa NOC & lodging.
            </p>
          </div>

          {/* Progress Circular Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
            {stats.map((stat, idx) => {
              const radius = 35;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (stat.progress / 100) * circumference;

              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-3 group">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        className="stroke-muted/20"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        className="text-primary transition-all duration-1000 ease-out"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center shadow-inner z-10 transition-transform duration-300 group-hover:scale-105">
                      {stat.icon}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-md font-bold text-foreground">
                      {stat.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed max-w-[180px] mx-auto h-12 overflow-hidden line-clamp-3">
                      {stat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
