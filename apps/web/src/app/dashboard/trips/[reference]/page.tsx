import { notFound } from "next/navigation";
import { TripDetailPage } from "@/features/dashboard/components/trips/trip-detail-page";
import { getTripDetails } from "@/features/dashboard/lib/trips";

export default async function Page({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  const booking = getTripDetails(reference);
  if (!booking) notFound();
  return <TripDetailPage {...booking} />;
}
