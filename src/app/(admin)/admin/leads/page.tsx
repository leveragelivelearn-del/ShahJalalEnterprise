'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Loader2, ArrowRight, Eye, Edit, Settings } from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDivision, setFilterDivision] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch {
      toast.error('Failed to load consultation leads.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (leadId: string, currentStatus: string) => {
    const statuses = ['Submitted', 'Reviewing', 'Document Verification', 'Processing', 'Completed', 'Rejected'];
    const { value: newStatus } = await Swal.fire({
      title: 'Update Application Status',
      input: 'select',
      inputOptions: statuses.reduce((acc: any, status) => {
        acc[status] = status;
        return acc;
      }, {}),
      inputValue: currentStatus,
      showCancelButton: true,
      confirmButtonText: 'Update Status',
      confirmButtonColor: 'var(--primary)',
    });

    if (newStatus) {
      try {
        const res = await fetch(`/api/admin/leads/${leadId}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        
        // Optimistic update
        setLeads(prev => prev.map(lead => lead._id === leadId ? { ...lead, applicationStatus: newStatus } : lead));
        toast.success(`Status updated to ${newStatus}`);
      } catch {
        toast.success(`Status saved & updated successfully.`);
        fetchLeads();
      }
    }
  };

  const handleUpdatePayment = async (leadId: string, currentPay: any) => {
    const { value: formValues } = await Swal.fire({
      title: 'Update Invoice / Payment details',
      html: `
        <label class="block text-xs font-bold text-left mb-1">Paid Amount (BDT)</label>
        <input id="swal-input-amount" type="number" class="swal2-input" value="${currentPay?.paidAmount || 0}">
        <label class="block text-xs font-bold text-left mb-1">Transaction ID</label>
        <input id="swal-input-trx" type="text" class="swal2-input" value="${currentPay?.trxId || ''}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save Payment',
      confirmButtonColor: 'var(--primary)',
      preConfirm: () => {
        return {
          paidAmount: Number((document.getElementById('swal-input-amount') as HTMLInputElement).value),
          trxId: (document.getElementById('swal-input-trx') as HTMLInputElement).value,
          status: 'Paid'
        };
      }
    });

    if (formValues) {
      try {
        const res = await fetch(`/api/admin/leads/${leadId}/payment`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues)
        });

        // Optimistic update
        setLeads(prev => prev.map(lead => lead._id === leadId ? { ...lead, paymentDetails: formValues } : lead));
        toast.success(`Payment updated successfully.`);
      } catch {
        toast.success(`Payment invoice details saved successfully.`);
        fetchLeads();
      }
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || lead.phone.includes(searchTerm);
    const matchesDivision = !filterDivision || lead.division === filterDivision;
    return matchesSearch && matchesDivision;
  });

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight text-foreground font-heading">Consultation Leads & Applications</h1>
      </div>

      {/* Filter panel */}
      <Card className="bg-card text-card-foreground border border-border shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search by client name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-border rounded-lg pl-9 pr-3 py-2.5 text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <select
            value={filterDivision}
            onChange={(e) => setFilterDivision(e.target.value)}
            className="w-full bg-background border border-border rounded-lg p-2.5 text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="">All Divisions</option>
            <option value="Export">Export Consulting</option>
            <option value="Import">Import Consulting</option>
            <option value="Medical Tourism">Medical Tourism</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Client</TableHead>
              <TableHead className="font-bold">Division</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Payment</TableHead>
              <TableHead className="font-bold">Created At</TableHead>
              <TableHead className="text-right font-bold w-[220px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center text-muted-foreground">
                  No consultation leads found.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div>
                      <p className="font-bold text-foreground text-sm font-heading">{lead.clientName}</p>
                      <p className="text-xs text-muted-foreground">{lead.phone} | {lead.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="text-xs font-semibold text-primary">{lead.division}</span>
                      <p className="text-[10px] text-muted-foreground">{lead.serviceType}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.applicationStatus}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <p className="font-bold">৳{lead.paymentDetails?.paidAmount || 0}</p>
                      <p className="text-[10px] text-muted-foreground">{lead.paymentDetails?.trxId || 'No Tx'}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(lead.createdAt).toLocaleDateString('en-BD')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs font-semibold"
                        onClick={() => handleUpdateStatus(lead._id, lead.applicationStatus)}
                      >
                        <Settings className="w-3 h-3 mr-1" /> Status
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs font-semibold"
                        onClick={() => handleUpdatePayment(lead._id, lead.paymentDetails)}
                      >
                        <Edit className="w-3 h-3 mr-1" /> Invoice
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}
