'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe, Stethoscope, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlideData {
  badgeText: string;
  badgeIcon: React.ReactNode;
  title: string;
  highlightedTitle: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  image: string;
}

const slides: SlideData[] = [
  {
    badgeText: 'Global Trade & Sourcing',
    badgeIcon: <Globe className="w-4 h-4" />,
    title: 'An Exclusive ',
    highlightedTitle: 'Import Trade Partner',
    description: 'Premier international trade consultancy specializing in customs clearing, LC advisory, global product sourcing, and shipping logistics.',
    primaryBtnText: 'Explore Import Services',
    primaryBtnLink: '/import-consulting',
    secondaryBtnText: 'Customs Duty Calculator',
    secondaryBtnLink: '/duty-calculator',
    image: '/assets/images/Banner/Sourcing, Custom Clearing, Cargo & Freight Logistics.webp'
  },
  {
    badgeText: 'International Healthcare',
    badgeIcon: <Stethoscope className="w-4 h-4" />,
    title: 'Seamless Medical Tourism & ',
    highlightedTitle: 'Consultation',
    description: 'Connect with specialist doctors and top partner hospitals across India, Singapore, Thailand, and Malaysia. Complete visa, flight, and lodging assistance.',
    primaryBtnText: 'Search Doctors & Hospitals',
    primaryBtnLink: '/medical-tourism',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: '/contact',
    image: '/assets/images/Banner/Cross-Border Healthcare, Specialist Doctors, International Hospitals..webp'
  },
  {
    badgeText: 'Export & Business Growth',
    badgeIcon: <Briefcase className="w-4 h-4" />,
    title: 'Start Your Export & ',
    highlightedTitle: 'Advisory Ventures',
    description: 'Comprehensive export consulting for documentation, international buyer sourcing, BGMEA UD approvals, phytosanitary NOC, and global market expansion.',
    primaryBtnText: 'Explore Export Services',
    primaryBtnLink: '/export-consulting',
    secondaryBtnText: 'Request a Proposal',
    secondaryBtnLink: '/contact',
    image: '/assets/images/Banner/Corporate Consultation, ImportExport Setup, Financial & LC Advisory..webp'
  }
];

export function SyncedHeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8500); // 8.5 seconds interval for ample reading time
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative pt-0 pb-8 md:py-12 px-0 md:px-8 border-b border-border bg-gradient-to-br from-primary/5 via-transparent to-primary/5 overflow-hidden">
      {/* Subtle decorative background glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center relative z-10">
        
        {/* Left Content Column with Framer Motion for Synced Transitions */}
        <div className="order-2 lg:order-1 px-4 md:px-0 space-y-8 text-left max-w-2xl min-h-[380px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="space-y-6"
            >
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-heading leading-tight">
                {currentSlide.title}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {currentSlide.highlightedTitle}
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {currentSlide.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href={currentSlide.primaryBtnLink}>
                  <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 font-bold px-8 py-6 rounded-lg text-md shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5">
                    {currentSlide.primaryBtnText} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href={currentSlide.secondaryBtnLink}>
                  <Button variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-muted transition-all duration-300 font-bold px-8 py-6 rounded-lg text-md shadow-md hover:-translate-y-0.5">
                    {currentSlide.secondaryBtnText}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Image Column with Synced Ken Burns and Slide Transitions */}
        <div className="order-1 lg:order-2 relative w-full max-w-none md:max-w-lg lg:max-w-none mx-auto group">
          {/* Ambient shadow/glow back of the image */}
          <div className="hidden md:block absolute -inset-1 bg-gradient-to-r from-primary to-primary/30 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative bg-transparent md:bg-card border-0 md:border p-0 md:p-3 rounded-none md:rounded-2xl shadow-none md:shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
            <div className="aspect-video relative rounded-none md:rounded-xl overflow-hidden bg-muted">
              <AnimatePresence mode="popLayout">
                {slides.map((slide, index) => {
                  const isActive = index === currentIndex;
                  if (!isActive) return null;

                  return (
                    <motion.div
                      key={slide.image}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={slide.image}
                        alt={slide.badgeText}
                        fill
                        priority
                        className={`object-cover transition-transform duration-[8500ms] ease-linear ${
                          isActive ? 'scale-110' : 'scale-100'
                        }`}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="transition-all duration-300 cursor-pointer w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <span
                      className={`transition-all duration-300 rounded-full h-1.5 ${
                        index === currentIndex 
                          ? 'w-6 bg-primary' 
                          : 'w-1.5 bg-white/60 hover:bg-white'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
