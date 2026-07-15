'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCheck, Globe, CheckCircle2, ArrowRight, BookOpen, UserCheck } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ExportConsulting() {
  const [productType, setProductType] = useState('');
  const [destination, setDestination] = useState('');
  const [generatedChecklist, setGeneratedChecklist] = useState<string[]>([]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productType || !destination) {
      Swal.fire({
        icon: 'warning',
        title: 'Please select options',
        text: 'Select product type and destination country to generate a checklist.',
        confirmButtonColor: 'var(--primary)',
      });
      return;
    }

    const checklist = [
      'Export Registration Certificate (ERC) from CCI&E',
      'TIN Certificate & Trade License',
      'IRC (Import Registration Certificate) - if processing raw materials',
      'Product Test & Quality Compliance Certificate (e.g. BSTI, SGS)',
      'Certificate of Origin (issued by Chamber of Commerce or EPB)',
      'Proforma Invoice & Sales Contract / Purchase Order',
      'Letter of Credit (L/C) or Advance TT agreement details',
      'EXP Form from commercial bank',
      'Customs Duty & C&F Coordination clearance form',
    ];

    if (productType === 'agriculture') {
      checklist.push('Phytosanitary Certificate / Plant Quarantine Certificate');
    } else if (productType === 'garments') {
      checklist.push('BGMEA/BKMEA Membership & Utilization Declaration (UD)');
    } else if (productType === 'food') {
      checklist.push('Halal Certification / Sanitary Certificate / FDA compliance');
    }

    setGeneratedChecklist(checklist);

    Swal.fire({
      icon: 'success',
      title: 'Checklist Generated!',
      text: 'Your customized export document checklist is ready below.',
      confirmButtonColor: 'var(--primary)',
      timer: 1500,
    });
  };

  const handleBookConsultation = () => {
    Swal.fire({
      title: 'Request Export Consultation',
      html: `
        <input id="swal-input-name" class="swal2-input" placeholder="Full Name">
        <input id="swal-input-phone" class="swal2-input" placeholder="Phone Number">
        <input id="swal-input-email" class="swal2-input" placeholder="Email Address">
        <textarea id="swal-input-details" class="swal2-textarea" placeholder="Detail your export query (Product, volume, destinations...)"></textarea>
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
              title: 'Submitted Successfully!',
              text: 'Our Export Consultant will contact you within 24 hours.',
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
    <div className="bg-background text-foreground min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Hero Banner */}
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 text-center space-y-6 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-heading">
            Global Trade: Export Consultation Services
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            Empowering Bangladeshi enterprises to reach global markets. Strategic guides, buyer matching, documentation checklists, and regulatory compliance.
          </p>
          <div className="flex justify-center">
            <Button onClick={handleBookConsultation} className="bg-background text-primary hover:bg-muted font-semibold px-8 py-6 rounded-lg text-md shadow-lg">
              Book Export Consultant <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-card text-card-foreground border border-border shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-heading">Business Setup</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm leading-relaxed">
              Step-by-step guidance on obtaining ERC, chamber membership, VAT registrations, and setting up banking profiles suited for international trade.
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground border border-border shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-heading">Buyer & Market Sourcing</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm leading-relaxed">
              Identify potential global markets and buyers. Get intelligence on competitor analysis, product pricing, and target market standards.
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground border border-border shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <UserCheck className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-heading">L/C Advisory</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm leading-relaxed">
              Protect your business from transaction risks. Review Letters of Credit (L/C), advise on sales contracts, TT terms, and export credit guarantees.
            </CardContent>
          </Card>
        </div>

        {/* Checklist Generator */}
        <Card className="bg-card text-card-foreground border border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-primary font-heading">
              <FileCheck className="w-7 h-7" /> Interactive Export Document Checklist Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Product Type</label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="garments">Ready Made Garments (RMG)</option>
                  <option value="agriculture">Agricultural / Fresh Produce</option>
                  <option value="food">Processed Foods</option>
                  <option value="general">General Goods</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Destination Region / Country</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">Select Destination</option>
                  <option value="eu">European Union</option>
                  <option value="usa">United States of America</option>
                  <option value="middle-east">Middle East Countries</option>
                  <option value="asia">East / South Asia</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90 p-6 rounded-lg text-md font-semibold">
                Generate Checklist
              </Button>
            </form>

            {generatedChecklist.length > 0 && (
              <div className="mt-8 space-y-4 border-t border-border pt-6">
                <h3 className="text-xl font-bold text-primary font-heading">Required Documents Checklist:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedChecklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
