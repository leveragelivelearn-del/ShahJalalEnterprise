'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, HelpCircle, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

export default function DutyCalculator() {
  const [cifValue, setCifValue] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  const [currency, setCurrency] = useState('BDT');
  const [conversionRate, setConversionRate] = useState<number>(120); // 1 USD = 120 BDT

  const [results, setResults] = useState<{
    cifBdt: number;
    cd: number;
    rd: number;
    sd: number;
    vat: number;
    ait: number;
    at: number;
    cf: number;
    totalDuty: number;
    totalCost: number;
  } | null>(null);

  const categoriesData: { [key: string]: { name: string; cd: number; rd: number; sd: number; vat: number; ait: number; at: number } } = {
    electronics: { name: 'Electronics & Computer Accessories', cd: 15, rd: 3, sd: 10, vat: 15, ait: 5, at: 5 },
    machinery: { name: 'Industrial Machinery & Spare Parts', cd: 5, rd: 0, sd: 0, vat: 15, ait: 3, at: 0 },
    textiles: { name: 'Textile Fabric & Garment Materials', cd: 25, rd: 3, sd: 20, vat: 15, ait: 5, at: 5 },
    chemicals: { name: 'Raw Chemicals / Pharmaceuticals ingredients', cd: 5, rd: 0, sd: 0, vat: 15, ait: 5, at: 5 },
    general: { name: 'General Consumer Merchandise', cd: 25, rd: 3, sd: 30, vat: 15, ait: 5, at: 5 },
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cifValue || !category) {
      Swal.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'Please specify CIF Value and select a Product Category.',
        confirmButtonColor: 'var(--primary)',
      });
      return;
    }

    const cifInBdt = currency === 'USD' ? Number(cifValue) * conversionRate : Number(cifValue);
    const rules = categoriesData[category];

    // Standard Bangladesh Custom Duty Calculation logic:
    // Assessable Value (AV) = CIF Value
    const av = cifInBdt;
    
    // 1. Custom Duty (CD) = AV * CD_Rate
    const cdVal = av * (rules.cd / 100);
    
    // 2. Regulatory Duty (RD) = AV * RD_Rate
    const rdVal = av * (rules.rd / 100);
    
    // 3. Supplementary Duty (SD) = (AV + CD + RD) * SD_Rate
    const sdVal = (av + cdVal + rdVal) * (rules.sd / 100);
    
    // 4. Value Added Tax (VAT) = (AV + CD + RD + SD) * VAT_Rate
    const vatVal = (av + cdVal + rdVal + sdVal) * (rules.vat / 100);
    
    // 5. Advance Income Tax (AIT) = AV * AIT_Rate
    const aitVal = av * (rules.ait / 100);
    
    // 6. Advance Tax (AT) = (AV + CD + RD + SD) * AT_Rate
    const atVal = (av + cdVal + rdVal + sdVal) * (rules.at / 100);

    // Estimated C&F Handling Charge (Approx 1% of CIF or flat rate)
    const cfVal = Math.max(5000, av * 0.008);

    const totalDutyVal = cdVal + rdVal + sdVal + vatVal + aitVal + atVal;
    const totalCostVal = av + totalDutyVal + cfVal;

    setResults({
      cifBdt: cifInBdt,
      cd: cdVal,
      rd: rdVal,
      sd: sdVal,
      vat: vatVal,
      ait: aitVal,
      at: atVal,
      cf: cfVal,
      totalDuty: totalDutyVal,
      totalCost: totalCostVal,
    });

    Swal.fire({
      icon: 'success',
      title: 'Duty Calculation Complete',
      text: `Total Estimated Duty is ৳${totalDutyVal.toLocaleString('en-BD', { maximumFractionDigits: 2 })} BDT`,
      confirmButtonColor: 'var(--primary)',
      timer: 1500,
    });
  };

  const handleReset = () => {
    setCifValue('');
    setCategory('');
    setResults(null);
  };

  return (
    <div className="bg-background text-foreground min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3 text-primary font-heading">
            <Calculator className="w-9 h-9" /> Bangladesh Customs Duty Calculator
          </h1>
          <p className="text-muted-foreground text-md max-w-xl mx-auto">
            Quickly estimate import duties, taxes, VAT, and C&F clearing agent commissions based on standard NBR schedules.
          </p>
        </div>

        {/* Form & Results split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Calculator Inputs */}
          <Card className="bg-card text-card-foreground border border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-heading">Customs Planner</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCalculate} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">Product Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    {Object.keys(categoriesData).map((key) => (
                      <option key={key} value={key}>
                        {categoriesData[key].name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="BDT">BDT (৳)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">CIF Value</label>
                    <input
                      type="number"
                      value={cifValue}
                      onChange={(e) => setCifValue(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 500000"
                      className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                {currency === 'USD' && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Exchange Rate (1 USD to BDT)</label>
                    <input
                      type="number"
                      value={conversionRate}
                      onChange={(e) => setConversionRate(Number(e.target.value))}
                      className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                )}

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:opacity-90 font-semibold p-4 rounded-lg">
                    Calculate
                  </Button>
                  <Button type="button" onClick={handleReset} variant="outline" className="border-border text-foreground hover:bg-muted font-semibold p-4 rounded-lg">
                    <RefreshCw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Results Display */}
          {results ? (
            <Card className="bg-card text-card-foreground border border-border shadow-lg space-y-4">
              <CardHeader className="bg-primary/5 rounded-t-lg">
                <CardTitle className="text-xl text-primary font-heading">Estimated Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>CIF Value (in BDT):</span>
                    <span className="font-semibold text-foreground">৳{results.cifBdt.toLocaleString('en-BD')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Custom Duty (CD):</span>
                    <span className="font-medium text-foreground">৳{results.cd.toLocaleString('en-BD')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Regulatory Duty (RD):</span>
                    <span className="font-medium text-foreground">৳{results.rd.toLocaleString('en-BD')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Supplementary Duty (SD):</span>
                    <span className="font-medium text-foreground">৳{results.sd.toLocaleString('en-BD')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Value Added Tax (VAT):</span>
                    <span className="font-medium text-foreground">৳{results.vat.toLocaleString('en-BD')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Advance Income Tax (AIT):</span>
                    <span className="font-medium text-foreground">৳{results.ait.toLocaleString('en-BD')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Advance Tax (AT):</span>
                    <span className="font-medium text-foreground">৳{results.at.toLocaleString('en-BD')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground border-b border-border pb-2">
                    <span>C&F Agent & Logistics:</span>
                    <span className="font-medium text-foreground">৳{results.cf.toLocaleString('en-BD')}</span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-md font-bold text-primary">
                    <span>Total Duties & Taxes:</span>
                    <span>৳{results.totalDuty.toLocaleString('en-BD', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-foreground">
                    <span>Total Landed Cost:</span>
                    <span>৳{results.totalCost.toLocaleString('en-BD', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                <div className="bg-muted/40 p-4 rounded-lg text-xs text-muted-foreground flex gap-2">
                  <HelpCircle className="w-4 h-4 shrink-0 text-primary" />
                  <span>These calculations are estimates based on standard schedules. Real assessable values may vary during physical clearance at custom ports.</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="border border-dashed border-border rounded-2xl p-12 text-center text-muted-foreground space-y-4 shadow-sm bg-card/20">
              <Calculator className="w-12 h-12 mx-auto opacity-30 text-primary" />
              <p className="text-sm font-semibold">Enter your shipment values to see the estimated customs duty assessment.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
