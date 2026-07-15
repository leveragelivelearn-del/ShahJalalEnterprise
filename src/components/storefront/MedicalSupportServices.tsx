'use client';

import React from 'react';
import Link from 'next/link';
import { Stethoscope, Building2, FileText, Plane, Ambulance, BedDouble } from 'lucide-react';

const services = [
  {
    icon: <Stethoscope className="w-8 h-8 text-primary transition-colors group-hover:text-primary-foreground" />,
    title: 'DOCTOR APPOINTMENT',
    description: 'Distance is no excuse for not having access to a leading specialist. Book remote or in-person appointments.',
    link: '/medical-tourism'
  },
  {
    icon: <Building2 className="w-8 h-8 text-primary transition-colors group-hover:text-primary-foreground" />,
    title: 'ADMISSION AT HOSPITALS',
    description: 'Hospital admissions abroad can be stressful. We coordinate direct admissions and support guidelines.',
    link: '/medical-tourism'
  },
  {
    icon: <FileText className="w-8 h-8 text-primary transition-colors group-hover:text-primary-foreground" />,
    title: 'ASSIST FOR VISA PROCESSING',
    description: 'We assist in obtaining official medical invitation letters from hospitals for visa speed clearance.',
    link: '/medical-tourism'
  },
  {
    icon: <Plane className="w-8 h-8 text-primary transition-colors group-hover:text-primary-foreground" />,
    title: 'AIR/BUS TICKETING',
    description: 'Securing travel tickets matching your medical schedule. Flexible and stress-free ticket booking.',
    link: '/medical-tourism'
  },
  {
    icon: <Ambulance className="w-8 h-8 text-primary transition-colors group-hover:text-primary-foreground" />,
    title: 'AMBULANCE & AIR AMBULANCE',
    description: 'We arrange critical ground ambulance transport and air ambulance transfers for emergency patients.',
    link: '/medical-tourism'
  },
  {
    icon: <BedDouble className="w-8 h-8 text-primary transition-colors group-hover:text-primary-foreground" />,
    title: 'HOTEL BOOKING',
    description: 'Find verified, budget-friendly and patient-accommodating lodging near treatment hospitals.',
    link: '/medical-tourism'
  }
];

export function MedicalSupportServices() {
  return (
    <section className="py-20 bg-muted/10 border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">Healthcare Logistics & Support</h2>
          <p className="text-muted-foreground text-md max-w-xl mx-auto">
            Comprehensive end-to-end assistance services to support your medical treatment journey abroad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {services.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center text-center space-y-4 group p-4 rounded-2xl hover:bg-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Circular Border with Icon */}
              <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-105 shadow-md">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xs font-black tracking-wider text-foreground uppercase h-10 flex items-center justify-center leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] text-muted-foreground leading-relaxed h-16 overflow-hidden line-clamp-3">
                {item.description}
              </p>

              {/* Button */}
              <Link href={item.link}>
                <button className="text-[11px] font-bold px-4 py-1.5 border border-border rounded-md text-foreground/80 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 cursor-pointer shadow-sm">
                  More Info
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
