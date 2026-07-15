import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Award, HeartHandshake, ArrowRight, Sparkles, Target, Landmark } from 'lucide-react';
import connectToDatabase from '@/lib/db';
import GlobalSettings from '@/models/GlobalSettings';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Us | M/S. Shah Jalal Enterprise',
  description: 'Learn about Shah Jalal Enterprise - Specializing in import/export business consultations, custom handling, and international medical tourism logistics.',
};

async function getSettings() {
  try {
    await connectToDatabase();
    const settings = await GlobalSettings.findOne().lean();
    return settings ? JSON.parse(JSON.stringify(settings)) : null;
  } catch (error) {
    console.error('Error fetching settings for about page:', error);
    return null;
  }
}

export default async function AboutPage() {
  const settings = await getSettings();
  const brandName = settings?.brandName || "M/S. Shah Jalal Enterprise";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-transparent py-20 md:py-28 border-b border-border">
        <div className="container mx-auto px-4 text-center relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
            <Sparkles className="h-3 w-3" /> Global Network & Trust
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground font-heading">
            About <span className="text-primary">M/S. Shah Jalal Enterprise</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            A premium consulting firm dedicated to offering expert guidance across global trade logistics and specialized international healthcare facilitation.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 space-y-1">
              <p className="text-3xl md:text-4xl font-extrabold text-primary">Verified</p>
              <p className="text-xs md:text-sm text-muted-foreground font-semibold">Custom Clearance</p>
            </div>
            <div className="p-4 space-y-1">
              <p className="text-3xl md:text-4xl font-extrabold text-primary">Global</p>
              <p className="text-xs md:text-sm text-muted-foreground font-semibold">Buyer & Supplier Sourcing</p>
            </div>
            <div className="p-4 space-y-1">
              <p className="text-3xl md:text-4xl font-extrabold text-primary">Top-Tier</p>
              <p className="text-xs md:text-sm text-muted-foreground font-semibold">Partner Hospitals Abroad</p>
            </div>
            <div className="p-4 space-y-1">
              <p className="text-3xl md:text-4xl font-extrabold text-primary">24/7</p>
              <p className="text-xs md:text-sm text-muted-foreground font-semibold">RAG AI Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Mission Section */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-heading">
              Our Vision, Mission & Values
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              M/S. Shah Jalal Enterprise started with a mission to bridge global trade barriers and support patients in accessing premium healthcare. We specialize in providing verified documentation, compliance audits, and total pre-departure arrangements.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 font-heading">Our Mission</h4>
                  <p className="text-xs text-muted-foreground">To enable seamless international logistics and trade consulting while guiding patients to choose optimal treatments abroad.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Landmark className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 font-heading">Our Vision</h4>
                  <p className="text-xs text-muted-foreground">To become the leading consultance for global business execution and international medical assistance, known for integrity and excellence.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Panel */}
          <div className="relative aspect-square md:aspect-video lg:aspect-square max-w-md mx-auto w-full rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primary-foreground/30 p-1 shadow-2xl">
            <div className="w-full h-full bg-slate-900 rounded-[22px] overflow-hidden relative flex flex-col justify-end p-8 text-white">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
              <div className="relative z-20 space-y-3">
                <span className="text-[10px] uppercase tracking-widest font-bold text-primary px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md self-start inline-block">
                  Director's Note
                </span>
                <blockquote className="text-lg md:text-xl font-bold leading-relaxed italic">
                  "Excellence, transparency, and global networking are the pillars that define our consultation services."
                </blockquote>
                <p className="text-xs text-slate-300 font-medium">
                  — M/S. Shah Jalal Enterprise
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-primary/5 border-t border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-primary font-heading">Why Consult With Us?</h2>
            <p className="text-muted-foreground text-sm">
              Discover the benefits of verified custom guidelines, supplier networking, and direct specialist medical appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-4 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-heading">Full Compliance</h3>
              <p className="text-muted-foreground text-xs leading-relaxed max-w-[280px]">
                Avoid penalties or LC issues. We audit commercial paperwork, HS Codes, ERC, and IRC lists under strict government directives.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-4 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-heading">Expert Advisors</h3>
              <p className="text-muted-foreground text-xs leading-relaxed max-w-[280px]">
                Years of custom clearance and logistics experience to offer optimized route and duty calculations.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-4 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-heading">Medical Sourcing Support</h3>
              <p className="text-muted-foreground text-xs leading-relaxed max-w-[280px]">
                Complete assistance for patient visas, hospital bookings, flight tickets, and local logistics in India, Thailand, and Singapore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-2xl mx-auto leading-tight text-foreground font-heading">
            Connect With Our Global Trade & Medical Consultants
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Ready to import, export, or seek international treatment? We are here to help.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/contact" passHref>
              <Button size="lg" className="rounded-full px-8 py-6 font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Contact Us Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
