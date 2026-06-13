import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const volunteers = await prisma.volunteer.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Compute stats
  const stats = {
    total: volunteers.length,
    pending: volunteers.filter(v => v.status === 'Pending').length,
    approved: volunteers.filter(v => v.status === 'Approved').length,
    rejected: volunteers.filter(v => v.status === 'Rejected').length,
  };

  return <DashboardClient initialVolunteers={volunteers} stats={stats} userEmail={session.user.email} />;
}
