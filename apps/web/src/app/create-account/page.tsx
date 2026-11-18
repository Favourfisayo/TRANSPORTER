import Link from "next/link";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { AccountForm } from "@/features/auth/components/auth-forms";

export default function CreateAccountPage() {
  return (
    <AuthLayout title="Create an account" description={<p>Already have an account? <Link href="/login" className="text-body-medium text-accent-600 hover:underline">Log in</Link></p>}>
      <AccountForm />
    </AuthLayout>
  );
}
