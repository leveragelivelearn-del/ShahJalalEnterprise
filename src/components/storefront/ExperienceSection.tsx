'use client';

import React from 'react';
import Image from 'next/image';
import { Hourglass, TrendingUp, Globe2 } from 'lucide-react';

const stats = [
  {
    icon: <Hourglass className="w-8 h-8 text-primary" />,
    title: 'Consistency',
    description: 'Podcasting operational change management inside of workflow.',
    progress: 75 // SVG circle stroke-dashoffset based on progress
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: 'Improvement',
    description: 'Dynamically innovate customer service for state of the art systems.',
    progress: 90
  },
  {
    icon: <Globe2 className="w-8 h-8 text-primary" />,
    title: 'Branching',
    description: 'Pursue scalable customer service through sustainable global networks.',
    progress: 60
  }
];

export function ExperienceSection() {
  return (
    <section className="py-20 bg-background overflow-hidden border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Diagonal Masked Image & Geometric Triangle Details */}
        <div className="lg:col-span-5 relative w-full h-[320px] md:h-[450px] group">
          {/* Triangular clip path mask on wrapper */}
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

          {/* Abstract overlapping geometric triangles at the bottom (matching image reference) */}
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
                Experience
              </span>
            </h2>
          </div>

          {/* Columns of Description Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-md text-muted-foreground leading-relaxed">
            <p>
              Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.
            </p>
            <p>
              Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation diversity.
            </p>
          </div>

          {/* Progress Circular Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
            {stats.map((stat, idx) => {
              // SVG Circle properties
              const radius = 35;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (stat.progress / 100) * circumference;

              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-3 group">
                  {/* Gauge Ring */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* SVG Gauge */}
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        className="stroke-muted/20"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      {/* Foreground progress circle */}
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

                    {/* Icon container */}
                    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center shadow-inner z-10 transition-transform duration-300 group-hover:scale-105">
                      {stat.icon}
                    </div>
                  </div>

                  {/* Title & Info */}
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
