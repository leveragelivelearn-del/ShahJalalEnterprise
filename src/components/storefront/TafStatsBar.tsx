'use client';

import React, { useEffect, useState, useRef } from 'react';

const stats = [
  {
    value: "15+",
    label: "Years of Clearing Excellence"
  },
  {
    value: "30+",
    label: "Partner Global Hospitals"
  },
  {
    value: "1200+",
    label: "Successful Import/Export Setups"
  },
  {
    value: "100%",
    label: "Hassle-Free Patient Support"
  }
];

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const target = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let observer: IntersectionObserver;
    let animationFrameId: number;

    const startAnimation = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      const duration = 1500; // 1.5s
      const startTime = performance.now();

      const updateCount = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easeProgress = progress * (2 - progress); // Ease out quad
        setCount(Math.floor(easeProgress * target));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          setCount(target);
        }
      };

      animationFrameId = requestAnimationFrame(updateCount);
    };

    if (elementRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startAnimation();
          } else {
            setCount(0);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

export function TafStatsBar() {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center items-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-4 space-y-2 group">
              <h3 className="text-4xl md:text-5xl font-black tracking-tight">
                <AnimatedCounter value={stat.value} />
              </h3>
              <p className="text-xs md:text-sm font-bold opacity-85 max-w-[200px] mx-auto leading-normal uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
