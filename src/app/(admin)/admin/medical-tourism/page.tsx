'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Plus, Stethoscope, Building2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export default function AdminMedicalTourismPage() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [hospRes, docRes] = await Promise.all([
        fetch('/api/admin/hospitals'),
        fetch('/api/admin/doctors')
      ]);
      if (hospRes.ok) setHospitals(await hospRes.json());
      if (docRes.ok) setDoctors(await docRes.json());
    } catch {
      toast.error('Failed to load doctors and hospitals database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Simulate initial setup/fetch to avoid blank states
    setHospitals([
      { id: '1', name: 'Fortis Hospital Delhi', country: 'India', city: 'New Delhi', departments: ['Cardiology', 'Neurology'] },
      { id: '2', name: 'Bumrungrad International', country: 'Thailand', city: 'Bangkok', departments: ['Oncology', 'Orthopedics'] }
    ]);
    setDoctors([
      { id: '1', name: 'Dr. Ashok Seth', specialty: 'Cardiology', qualification: 'MBBS, MD, FRCP', country: 'India' },
      { id: '2', name: 'Dr. Sombat Treeprasertsuk', specialty: 'Gastroenterology', qualification: 'MD, PhD', country: 'Thailand' }
    ]);
    setLoading(false);
  }, []);

  const handleAddHospital = () => {
    Swal.fire({
      title: 'Add Partner Hospital',
      html: `
        <input id="h-name" class="swal2-input" placeholder="Hospital Name">
        <input id="h-country" class="swal2-input" placeholder="Country">
        <input id="h-city" class="swal2-input" placeholder="City">
        <input id="h-address" class="swal2-input" placeholder="Address">
        <input id="h-depts" class="swal2-input" placeholder="Departments (comma separated)">
      `,
      showCancelButton: true,
      confirmButtonText: 'Add',
      confirmButtonColor: 'var(--primary)',
      preConfirm: () => {
        const name = (document.getElementById('h-name') as HTMLInputElement).value;
        const country = (document.getElementById('h-country') as HTMLInputElement).value;
        const city = (document.getElementById('h-city') as HTMLInputElement).value;
        const address = (document.getElementById('h-address') as HTMLInputElement).value;
        const depts = (document.getElementById('h-depts') as HTMLInputElement).value;
        if (!name || !country || !city || !address) {
          Swal.showValidationMessage('Please fill all basic fields');
          return false;
        }
        return { name, country, city, address, departments: depts.split(',').map(s => s.trim()) };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setHospitals(prev => [...prev, { ...result.value, id: Math.random().toString() }]);
        toast.success('Hospital added successfully');
      }
    });
  };

  const handleAddDoctor = () => {
    Swal.fire({
      title: 'Add Specialist Doctor',
      html: `
        <input id="d-name" class="swal2-input" placeholder="Doctor Name">
        <input id="d-specialty" class="swal2-input" placeholder="Specialty">
        <input id="d-qual" class="swal2-input" placeholder="Qualification">
        <input id="d-exp" class="swal2-input" placeholder="Experience (years)">
        <input id="d-country" class="swal2-input" placeholder="Country">
      `,
      showCancelButton: true,
      confirmButtonText: 'Add',
      confirmButtonColor: 'var(--primary)',
      preConfirm: () => {
        const name = (document.getElementById('d-name') as HTMLInputElement).value;
        const specialty = (document.getElementById('d-specialty') as HTMLInputElement).value;
        const qualification = (document.getElementById('d-qual') as HTMLInputElement).value;
        const experience = (document.getElementById('d-exp') as HTMLInputElement).value;
        const country = (document.getElementById('d-country') as HTMLInputElement).value;
        if (!name || !specialty || !qualification || !country) {
          Swal.showValidationMessage('Please fill all required fields');
          return false;
        }
        return { name, specialty, qualification, experience, country };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDoctors(prev => [...prev, { ...result.value, id: Math.random().toString() }]);
        toast.success('Doctor added successfully');
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight text-foreground font-heading">Medical Tourism Directory Manager</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Hospitals Table */}
        <Card className="bg-card text-card-foreground border border-border shadow-md">
          <CardHeader className="flex flex-row justify-between items-center pb-4 border-b border-border">
            <CardTitle className="text-xl flex items-center gap-2 font-heading">
              <Building2 className="w-5 h-5 text-primary" /> Partner Hospitals
            </CardTitle>
            <Button onClick={handleAddHospital} size="sm" className="bg-primary text-primary-foreground font-semibold">
              <Plus className="w-4 h-4 mr-1" /> Add Hospital
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Hospital Name</TableHead>
                  <TableHead className="font-bold">Location</TableHead>
                  <TableHead className="text-right font-bold w-[80px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hospitals.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell className="font-semibold text-sm">{h.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{h.city}, {h.country}</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => setHospitals(prev => prev.filter(item => item.id !== h.id))} variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Doctors Table */}
        <Card className="bg-card text-card-foreground border border-border shadow-md">
          <CardHeader className="flex flex-row justify-between items-center pb-4 border-b border-border">
            <CardTitle className="text-xl flex items-center gap-2 font-heading">
              <Stethoscope className="w-5 h-5 text-primary" /> Specialist Doctors
            </CardTitle>
            <Button onClick={handleAddDoctor} size="sm" className="bg-primary text-primary-foreground font-semibold">
              <Plus className="w-4 h-4 mr-1" /> Add Doctor
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Doctor Name</TableHead>
                  <TableHead className="font-bold">Specialty</TableHead>
                  <TableHead className="text-right font-bold w-[80px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-semibold text-sm">{d.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{d.specialty} ({d.country})</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => setDoctors(prev => prev.filter(item => item.id !== d.id))} variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
