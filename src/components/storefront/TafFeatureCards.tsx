'use client';

import React from 'react';
import Image from 'next/image';

const cards = [
  {
    title: "Founder & CEO's Message",
    description: "We believe that success is built on absolute trust, innovation, and an unwavering commitment to client success.",
    image: "/assets/ceo.webp"
  },
  {
    title: "Excellence in Trade Setup",
    description: "Providing world-class setup advisory, regulatory navigation, and market integration since our foundation.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=80"
  },
  {
    title: "Healthcare Consulting",
    description: "Direct tie-ups with premium international hospitals to provide seamless medical travel and treatments.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&auto=format&fit=crop&q=80"
  },
  {
    title: "Logistics & Clearance",
    description: "State of the art customs clearance support, freight logistics, and secure cargo operations globally.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80"
  }
];

export function TafFeatureCards() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-end overflow-hidden rounded-[2.5rem] bg-primary text-primary-foreground min-h-[460px] shadow-lg group hover:shadow-xl transition-all duration-300 border border-primary/20"
            >
              {/* Image Circle Area */}
              <div className="absolute top-0 left-0 w-full h-[65%] flex items-center justify-center p-6 bg-background rounded-b-[2.5rem] transition-colors duration-300">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/10 shadow-inner">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500 rounded-full"
                  />
                </div>
              </div>

              {/* Primary Background Content Block */}
              <div className="relative z-10 p-8 pt-4 flex flex-col justify-start h-[35%]">
                <h3 className="font-extrabold text-base md:text-lg mb-2 leading-snug text-primary-foreground">
                  {card.title}
                </h3>
                <p className="text-xs text-primary-foreground/80 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
