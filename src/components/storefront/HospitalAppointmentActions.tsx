'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, UserCheck, PhoneCall, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';

interface HospitalAppointmentActionsProps {
  hospitalName: string;
  doctorName?: string;
  mode?: 'appointment' | 'visa' | 'general';
  buttonText?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary';
}

export function HospitalAppointmentActions({
  hospitalName,
  doctorName,
  mode = 'general',
  buttonText,
  className = '',
  variant = 'default'
}: HospitalAppointmentActionsProps) {

  const handleAction = () => {
    let modalTitle = `Book Appointment at ${hospitalName}`;
    let defaultDetails = `I would like to request an appointment at ${hospitalName}`;

    if (doctorName) {
      modalTitle = `Consultation with ${doctorName}`;
      defaultDetails = `I would like to book a medical appointment with ${doctorName} at ${hospitalName}.`;
    } else if (mode === 'visa') {
      modalTitle = `Request Medical Visa NOC - ${hospitalName}`;
      defaultDetails = `Please issue a Medical Visa Invitation Letter (NOC) for ${hospitalName}. Patient details are as follows:`;
    }

    Swal.fire({
      title: modalTitle,
      html: `
        <div style="text-align: left; font-size: 14px;">
          <label style="font-weight: 600; display: block; margin-top: 8px;">Patient Name</label>
          <input id="swal-input-name" class="swal2-input" style="margin-top: 4px;" placeholder="Full Name">
          
          <label style="font-weight: 600; display: block; margin-top: 8px;">Phone Number (WhatsApp)</label>
          <input id="swal-input-phone" class="swal2-input" style="margin-top: 4px;" placeholder="e.g. 01711223344">
          
          <label style="font-weight: 600; display: block; margin-top: 8px;">Email Address</label>
          <input id="swal-input-email" class="swal2-input" style="margin-top: 4px;" placeholder="Email">
          
          <label style="font-weight: 600; display: block; margin-top: 8px;">Medical Issue / Passport Details</label>
          <textarea id="swal-input-details" class="swal2-textarea" style="margin-top: 4px;" placeholder="${defaultDetails}">${defaultDetails}</textarea>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submit Consultation Request',
      confirmButtonColor: 'var(--primary)',
      preConfirm: () => {
        const name = (document.getElementById('swal-input-name') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input-phone') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input-email') as HTMLInputElement).value;
        const details = (document.getElementById('swal-input-details') as HTMLTextAreaElement).value;

        if (!name || !phone || !email || !details) {
          Swal.showValidationMessage('Please fill out all required fields');
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
              division: 'Medical Tourism',
              serviceType: mode === 'visa' ? 'Visa NOC Request' : 'Hospital & Doctor Appointment',
              details: `[${hospitalName}] ${doctorName ? 'Doctor: ' + doctorName + ' | ' : ''}${result.value.details}`,
            })
          });
          if (res.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Request Received!',
              text: 'Our Medical Tourism Advisor will contact you within 24 hours to confirm your appointment & visa invitation.',
              confirmButtonColor: 'var(--primary)',
            });
          } else {
            throw new Error();
          }
        } catch {
          Swal.fire({
            icon: 'error',
            title: 'Submission Error',
            text: 'Could not log request. Please call our hotline directly.',
            confirmButtonColor: 'var(--primary)',
          });
        }
      }
    });
  };

  const renderIcon = () => {
    if (mode === 'visa') return <FileText className="w-4 h-4 mr-2" />;
    if (doctorName) return <UserCheck className="w-4 h-4 mr-2" />;
    return <Calendar className="w-4 h-4 mr-2" />;
  };

  const defaultText = buttonText || (doctorName ? `Book Doctor Consultation` : (mode === 'visa' ? `Get Visa NOC Invitation` : `Book Hospital Appointment`));

  return (
    <Button onClick={handleAction} variant={variant} className={`font-semibold shadow-md ${className}`}>
      {renderIcon()}
      {defaultText}
    </Button>
  );
}
