import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sendStatusEmail } from '@/lib/mailer';

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updatedVolunteer = await prisma.volunteer.update({
      where: { id },
      data: { status }
    });

    // Send email notification if status is Approved or Rejected
    if (status === 'Approved' || status === 'Rejected') {
      await sendStatusEmail(updatedVolunteer.email, updatedVolunteer.name, status);
    }

    return NextResponse.json({ success: true, volunteer: updatedVolunteer });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
