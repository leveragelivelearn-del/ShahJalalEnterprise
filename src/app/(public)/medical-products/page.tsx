import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, ShieldAlert, HeartPulse, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Medical Products & Supplies | M/S. Shah Jalal Enterprise',
  description: 'Wholesale supply, sourcing and distribution of high-grade surgical instruments, personal protective equipment, and healthcare logistics.',
};

export default function MedicalProducts() {
  const products = [
    {
      title: 'Surgical Instruments',
      desc: 'Premium grade forceps, scalpels, scissors, and clamps sourced from ISO certified manufacturers.',
      icon: <HeartPulse className="w-6 h-6" />
    },
    {
      title: 'Personal Protective Equipment',
      desc: 'High-filtration masks, medical gowns, sterile gloves, and face shields complying with CE and FDA standards.',
      icon: <ShieldAlert className="w-6 h-6" />
    },
    {
      title: 'Patient Diagnostic Monitors',
      desc: 'Pulse oximeters, digital blood pressure monitors, thermometers, and medical diagnostic accessories.',
      icon: <Activity className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 text-center space-y-6 shadow-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" /> Certified Medical Sourcing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-heading">
            Medical Products & Supplies Sourcing
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            Connecting medical institutions and retail suppliers in Bangladesh with global manufacturers of high-grade healthcare instruments and protective gears.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((item, idx) => (
            <Card key={idx} className="bg-card text-card-foreground border border-border shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <CardTitle className="text-xl font-bold text-foreground font-heading">{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-6">
                <Link href="/contact">
                  <Button className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold py-2 rounded-lg">
                    Quote Sourcing Price
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Quality Assurance Card */}
        <Card className="bg-muted/30 border border-border p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-primary font-heading">Need Wholesale Medical Imports?</h3>
            <p className="text-sm text-muted-foreground max-w-xl">
              We handle direct exporter negotiation, L/C setups, plant quarantine clearances, and custom clearing agents for large-scale medical procurement.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 font-bold px-6 py-4 rounded-xl shadow-lg shrink-0">
              Consult Bulk Order <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </Card>

      </div>
    </div>
  );
}
