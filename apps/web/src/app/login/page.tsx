import Link from "next/link";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" backHref="/" description={<p>New to TheTransporter? <Link href="/create-account" className="text-body-medium text-accent-600 hover:underline">Create an account</Link></p>}>
      <LoginForm />
    </AuthLayout>
  );
}
