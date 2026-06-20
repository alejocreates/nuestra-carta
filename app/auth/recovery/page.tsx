import type { Metadata } from "next";
import AccountRecoveryForm from "@/features/auth/components/account-recovery-form";

export const metadata: Metadata = {
  title: "Olvidé mi contraseña",
};

export default function AccountRecoveryPage() {
  return <AccountRecoveryForm />;
}
