import type { Metadata } from "next";
import PasswordResetForm from "@/features/auth/components/password-reset-form";

export const metadata: Metadata = {
  title: "Restablecer contraseña",
};

export default function PasswordResetPage() {
  return <PasswordResetForm />;
}
