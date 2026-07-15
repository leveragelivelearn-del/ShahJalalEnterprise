'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCheck, ShieldCheck, CheckCircle2, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ImportConsulting() {
  const [productCategory, setProductCategory] = useState('');
  const [paymentTerm, setPaymentTerm] = useState('');
  const [generatedChecklist, setGeneratedChecklist] = useState<string[]>([]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productCategory || !paymentTerm) {
      Swal.fire({
        icon: 'warning',
        title: 'Please select options',
        text: 'Select product category and payment method to generate guidelines.',
        confirmButtonColor: 'var(--primary)',
      });
      return;
    }

    const checklist = [
      'Import Registration Certificate (IRC) from CCI&E',
      'Valid Trade License & TIN Certificate',
      'Membership Certificate from local Chamber of Commerce',
      'Proforma Invoice (PI) / Indent from Supplier',
      'Vessel Details & Port of Loading Clearance',
      'Customs HS Code identification & Duty classification check',
      'C&F Agent Assignment & Port Entry Documentation',
    ];

    if (paymentTerm === 'lc') {
      checklist.push('Letter of Credit (L/C) Application with Commercial Bank');
      checklist.push('L/C Insurance Cover Note / Marine Insurance Policy');
    } else if (paymentTerm === 'tt') {
      checklist.push('Advance Telegraphic Transfer (T/T) Authorization Form');
      checklist.push('Bank Permission Certificate for Outward Remittance');
    }

    if (productCategory === 'chemicals') {
      checklist.push('Department of Explosives / Drug Administration NOC License');
    } else if (productCategory === 'machinery') {
      checklist.push('PSI (Pre-Shipment Inspection) / Certificate of Conformity');
    }

    setGeneratedChecklist(checklist);

    Swal.fire({
      icon: 'success',
      title: 'Import Guide Ready!',
      text: 'Guidelines and document checklist generated below.',
      confirmButtonColor: 'var(--primary)',
      timer: 1500,
    });
  };

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
    <div className="bg-background text-foreground min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 text-center space-y-6 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-heading">
            Import Sourcing & Compliance Services
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            Navigate customs regulations, verify suppliers, optimize LC/TT payments, and calculate customs duties seamlessly.
          </p>
          <div className="flex justify-center">
            <Button onClick={handleBookConsultation} className="bg-background text-primary hover:bg-muted font-semibold px-8 py-6 rounded-lg text-md shadow-lg">
              Book Import Advisor <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-card text-card-foreground border border-border shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-heading">LC/TT Advisory</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm leading-relaxed">
              Assistance with bank selection, margin negotiation, Letter of Credit format review, and TT transfer regulations for safe transactions.
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground border border-border shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-heading">Customs Clearance</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm leading-relaxed">
              HS Code verification, customs duty estimation, Bill of Entry processing guidelines, and reliable C&F coordination.
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground border border-border shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <AlertCircle className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-heading">Supplier Sourcing</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm leading-relaxed">
              Connect with verified exporters across China, India, Europe, and America. Price negotiation support and quality control protocols.
            </CardContent>
          </Card>
        </div>

        {/* Guide Generator */}
        <Card className="bg-card text-card-foreground border border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-primary font-heading">
              <FileCheck className="w-7 h-7" /> Interactive Import Compliance Planner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Product Category</label>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="machinery">Industrial Machinery & Capital goods</option>
                  <option value="chemicals">Chemicals & Raw Materials</option>
                  <option value="electronics">Electronics & IT Hardware</option>
                  <option value="general">General Merchandise</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Payment Method</label>
                <select
                  value={paymentTerm}
                  onChange={(e) => setPaymentTerm(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">Select Method</option>
                  <option value="lc">Letter of Credit (L/C)</option>
                  <option value="tt">Telegraphic Transfer (T/T)</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90 p-6 rounded-lg text-md font-semibold">
                Generate Plan
              </Button>
            </form>

            {generatedChecklist.length > 0 && (
              <div className="mt-8 space-y-4 border-t border-border pt-6">
                <h3 className="text-xl font-bold text-primary font-heading">Customs & Bank Documentation checklist:</h3>
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
