import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ResetPasswordForm } from "@/features/auth/components/auth-forms";

export default function ResetPasswordPage() {
  return (
    <AuthLayout title="Reset your password" description={<p>Enter the email address associated with your account.</p>}>
      <ResetPasswordForm />
    </AuthLayout>
  );
}
