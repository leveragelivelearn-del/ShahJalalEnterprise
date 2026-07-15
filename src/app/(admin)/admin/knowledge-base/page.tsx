'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Plus, Database, Sparkles, FileText, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export default function AdminKnowledgeBasePage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated RAG files list
    setDocuments([
      { id: '1', title: 'Bangladesh Custom Duty Guidelines 2026', category: 'Import', size: '2.4 MB', status: 'Indexed' },
      { id: '2', title: 'Medical Visa Checklist for India/Thailand', category: 'Medical Tourism', size: '840 KB', status: 'Indexed' },
      { id: '3', title: 'Export Documentation Checklist for Ready-Made Garments', category: 'Export', size: '1.2 MB', status: 'Indexed' }
    ]);
    setLoading(false);
  }, []);

  const handleUploadDocument = () => {
    Swal.fire({
      title: 'Upload RAG Knowledge Document',
      html: `
        <input id="doc-title" class="swal2-input" placeholder="Document Title / Guideline Name">
        <select id="doc-cat" class="swal2-input">
          <option value="Import">Import</option>
          <option value="Export">Export</option>
          <option value="Medical Tourism">Medical Tourism</option>
          <option value="General">General</option>
        </select>
        <input id="doc-file" type="file" class="swal2-input" style="padding-top: 10px;">
      `,
      showCancelButton: true,
      confirmButtonText: 'Index Document',
      confirmButtonColor: 'var(--primary)',
      preConfirm: () => {
        const title = (document.getElementById('doc-title') as HTMLInputElement).value;
        const category = (document.getElementById('doc-cat') as HTMLSelectElement).value;
        if (!title) {
          Swal.showValidationMessage('Document title is required');
          return false;
        }
        return { title, category, size: 'Generated Embeddings', status: 'Processing' };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setDocuments(prev => [...prev, { ...result.value, id: Math.random().toString() }]);
        toast.success('Document uploaded and queued for Vector Embedding indexing');
        
        // Simulating complete indexing after 2 seconds
        setTimeout(() => {
          setDocuments(prev => prev.map(d => d.title === result.value.title ? { ...d, status: 'Indexed' } : d));
          toast.success('Vector search sync completed successfully!');
        }, 2000);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight text-foreground font-heading">RAG Knowledge Base CMS</h1>
        <Button onClick={handleUploadDocument} className="bg-primary text-primary-foreground font-semibold">
          <Plus className="w-4 h-4 mr-1" /> Add RAG Guideline
        </Button>
      </div>

      {/* RAG Status Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-none shadow-none">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase">Total Indexed Documents</p>
              <h4 className="text-2xl font-black text-foreground">{documents.length} guidelines</h4>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-none shadow-none">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase">AI Vector Search Engine</p>
              <h4 className="text-2xl font-black text-foreground">Active (Gemini RAG)</h4>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-none shadow-none">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase">Sync Status</p>
              <h4 className="text-2xl font-black text-foreground">Synced 100%</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Card className="bg-card text-card-foreground border border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-heading">Uploaded Rules & Guidelines for Chatbot Memory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Document Title</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">File Size</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right font-bold w-[80px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-semibold text-sm">{doc.title}</TableCell>
                  <TableCell className="text-xs text-primary">{doc.category}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{doc.size}</TableCell>
                  <TableCell>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      doc.status === 'Indexed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {doc.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => setDocuments(prev => prev.filter(item => item.id !== doc.id))} variant="ghost" size="sm" className="text-destructive">
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
  );
}
