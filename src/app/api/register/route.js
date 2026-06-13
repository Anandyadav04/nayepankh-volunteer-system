import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, skills, reason } = body;

    // Basic validation
    if (!name || !email || !phone || !skills || !reason) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if email already exists
    const existingVolunteer = await prisma.volunteer.findUnique({
      where: { email }
    });

    if (existingVolunteer) {
      return NextResponse.json({ error: 'A volunteer with this email is already registered.' }, { status: 400 });
    }

    // Create volunteer
    const newVolunteer = await prisma.volunteer.create({
      data: {
        name,
        email,
        phone,
        skills,
        reason
      }
    });

    return NextResponse.json({ success: true, volunteer: newVolunteer }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
