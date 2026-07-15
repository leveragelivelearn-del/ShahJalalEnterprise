import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Lead from '@/models/Lead';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { clientName, email, phone, division, serviceType, details } = body;

    if (!clientName || !email || !phone || !division || !serviceType || !details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Try to get authenticated user if present to associate as assignedAdmin or tracking reference
    const session = await auth();
    const userId = session?.user?.id;

    const newLead = new Lead({
      clientName,
      email,
      phone,
      division,
      serviceType,
      details,
      applicationStatus: 'Submitted',
      assignedAdmin: userId || undefined,
      logs: [
        {
          status: 'Submitted',
          notes: 'Application submitted successfully via web portal.',
          date: new Date(),
        },
      ],
    });

    await newLead.save();

    return NextResponse.json({ success: true, leadId: newLead._id }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');
    const email = searchParams.get('email');

    const query: any = {};
    if (phone) query.phone = phone;
    if (email) query.email = email;

    // If no params and not an admin, restrict or return user's own leads matching email
    if (!phone && !email) {
      query.email = session.user.email;
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).lean().exec();
    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
