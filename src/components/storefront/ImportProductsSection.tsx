'use client';

import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Info } from 'lucide-react';
import Swal from 'sweetalert2';

export function ImportProductsSection() {
  const importProducts = [
    {
      name: 'Unroasted Green Coffee Beans',
      category: 'Raw Food / Beverage Sourcing',
      image: '/assets/images/products/green_coffee_beans_import.png',
      origin: 'Vietnam / Brazil / Ethiopia',
      priceRange: '$2.80 - $4.50 / kg (Est. CIF Chittagong)',
      details: 'Premium raw unroasted green coffee beans for commercial roasters and beverage processors in Bangladesh.',
      consultation: 'Complete import sourcing guide, Phytosanitary NOC, L/C payment structure, and Customs duty calculation included.'
    },
    {
      name: 'Premium Green Cardamom (এলাচ)',
      category: 'Spices & Agri Commodities',
      image: '/assets/images/products/green_cardamom_import.png',
      origin: 'Guatemala / India',
      priceRange: '$18.50 - $24.00 / kg (Bulk Lot)',
      details: 'High essential oil content, bold green color cardamom pods sourced from top exporters.',
      consultation: 'Customs duty estimation (HS Code 0908.31), Plant Quarantine clearance, and C&F port coordination.'
    },
    {
      name: 'Fresh Whole Coconuts (নারকেল)',
      category: 'Fresh Fruits / Produce',
      image: '/assets/images/products/fresh_coconuts_import.png',
      origin: 'India / Indonesia / Vietnam',
      priceRange: '$0.40 - $0.65 / piece (FOB/CIF)',
      details: 'Fresh mature coconuts suitable for oil extraction, culinary, and commercial distribution.',
      consultation: 'Import business documentation, BSTI / Food Safety testing guidelines, and supplier price negotiation advisory.'
    }
  ];

  const handleBookConsultation = () => {
    Swal.fire({
      title: 'Request Import Consultation',
      html: `
        <input id="swal-input-name" class="swal2-input" placeholder="Full Name">
        <input id="swal-input-phone" class="swal2-input" placeholder="Phone Number">
        <input id="swal-input-email" class="swal2-input" placeholder="Email Address">
        <textarea id="swal-input-details" class="swal2-textarea" placeholder="Describe the product and service you wish to import (HS Code, country...)"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submit Request',
      confirmButtonColor: 'var(--primary)',
      preConfirm: () => {
        const name = (document.getElementById('swal-input-name') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input-phone') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input-email') as HTMLInputElement).value;
        const details = (document.getElementById('swal-input-details') as HTMLTextAreaElement).value;

        if (!name || !phone || !email || !details) {
          Swal.showValidationMessage('Please fill out all fields');
          return false;
        }
        return { name, phone, email, details };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clientName: result.value.name,
              email: result.value.email,
              phone: result.value.phone,
              division: 'Import',
              serviceType: 'Import Consultation',
              details: result.value.details,
            })
          });
          if (res.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Request Logged!',
              text: 'Our Import & Customs Advisor will reach out shortly.',
              confirmButtonColor: 'var(--primary)',
            });
          } else {
            throw new Error();
          }
        } catch {
          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: 'Please try again later.',
            confirmButtonColor: 'var(--primary)',
          });
        }
      }
    });
  };

  return (
    <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-6">
      <div className="border-b border-border pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground flex items-center gap-3">
            <Globe className="w-7 h-7 text-primary" /> Global Import Commodities & Sourcing Guide
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Browse foreign products and raw materials with estimated market prices, import guidelines, and L/C advisory.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {importProducts.map((prod, index) => (
          <Card key={index} className="bg-card text-card-foreground border border-border shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-all">
            <div className="relative h-48 w-full bg-muted">
              <Image
                src={prod.image}
                alt={prod.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                {prod.category}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold font-heading">{prod.name}</CardTitle>
              <p className="text-xs text-muted-foreground font-medium">Source Countries: <span className="text-foreground font-semibold">{prod.origin}</span></p>
              <p className="text-xs text-muted-foreground font-medium">Est. Price Range: <span className="text-primary font-bold">{prod.priceRange}</span></p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-muted-foreground flex-1 flex flex-col justify-between">
              <p className="leading-relaxed text-foreground/80">{prod.details}</p>
              <div className="bg-muted/40 p-3 rounded-lg border border-border/60 space-y-1">
                <p className="font-bold text-primary flex items-center gap-1.5 text-[11px]">
                  <Info className="w-3.5 h-3.5" /> Import Guidelines & Compliance:
                </p>
                <p className="text-[11px] leading-snug">{prod.consultation}</p>
              </div>
              <Button onClick={handleBookConsultation} className="w-full mt-2 bg-primary text-primary-foreground hover:opacity-90 font-semibold text-xs py-4">
                Book Import Sourcing Advisory
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
