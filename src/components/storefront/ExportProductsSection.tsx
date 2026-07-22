'use client';

import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PackageCheck, Info } from 'lucide-react';
import Swal from 'sweetalert2';

export function ExportProductsSection() {
  const exportProducts = [
    {
      name: 'Fresh Organic Potato',
      category: 'Agriculture / Fresh Produce',
      image: '/assets/images/products/fresh_potato_export.png',
      origin: 'Bangladesh (Bogura, Munshiganj)',
      destinations: 'Middle East, Malaysia, Vietnam, Sri Lanka',
      details: 'High-grade fresh potatoes sourced directly from certified Bangladeshi farms. Cleaned, sorted, and packed according to international phytosanitary standards.',
      consultation: 'Complete ERC guidance, Phytosanitary certification, cold-chain transport, and buyer contract consultation available.'
    },
    {
      name: 'Ready Made Garments & Knitwear',
      category: 'Apparel & Textiles',
      image: '/assets/images/products/rmg_knitwear_expor.webp',
      origin: 'Bangladesh (Dhaka, Gazipur, Narayanganj)',
      destinations: 'European Union, USA, Canada, UK',
      details: 'Export-quality cotton knitwear, denim, and woven garments from compliance-certified factories.',
      consultation: 'BGMEA UD approvals, GSP/CO certificate of origin, L/C negotiation, and international buyer matching.'
    },
    {
      name: 'Natural Jute & Eco Products',
      category: 'Eco Friendly / Jute Goods',
      image: '/assets/images/products/jute_eco_products_export.webp',
      origin: 'Bangladesh (Faridpur, Jessore)',
      destinations: 'EU, Japan, USA, Middle East',
      details: '100% biodegradable raw jute fiber, hessian cloth, jute bags, and handcrafted eco-friendly products.',
      consultation: 'Export duty compliance, Eco-label certification, bulk container shipment, and custom sizing advisory.'
    }
  ];

  const handleBookConsultation = () => {
    Swal.fire({
      title: 'Request Export Consultation',
      html: `
        <input id="swal-input-name" class="swal2-input" placeholder="Full Name">
        <input id="swal-input-phone" class="swal2-input" placeholder="Phone Number">
        <input id="swal-input-email" class="swal2-input" placeholder="Email Address">
        <textarea id="swal-input-details" class="swal2-textarea" placeholder="Describe the product and market you wish to export to..."></textarea>
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
              division: 'Export',
              serviceType: 'Export Consultation',
              details: result.value.details,
            })
          });
          if (res.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Request Logged!',
              text: 'Our Export Advisor will reach out shortly.',
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
            <PackageCheck className="w-7 h-7 text-primary" /> Bangladeshi Export Products & Guidelines
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Explore key export-potential Bangladeshi products with detailed guidelines, documentation, and consultation support.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {exportProducts.map((prod, index) => (
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
              <p className="text-xs text-muted-foreground font-medium">Origin: <span className="text-foreground font-semibold">{prod.origin}</span></p>
              <p className="text-xs text-muted-foreground font-medium">Target Export Markets: <span className="text-primary font-semibold">{prod.destinations}</span></p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-muted-foreground flex-1 flex flex-col justify-between">
              <p className="leading-relaxed text-foreground/80">{prod.details}</p>
              <div className="bg-muted/40 p-3 rounded-lg border border-border/60 space-y-1">
                <p className="font-bold text-primary flex items-center gap-1.5 text-[11px]">
                  <Info className="w-3.5 h-3.5" /> Export Guidelines & Support:
                </p>
                <p className="text-[11px] leading-snug">{prod.consultation}</p>
              </div>
              <Button onClick={handleBookConsultation} className="w-full mt-2 bg-primary text-primary-foreground hover:opacity-90 font-semibold text-xs py-4">
                Book Export Guidance
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
