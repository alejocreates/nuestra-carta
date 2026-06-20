import type { Metadata } from "next";
import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";
import PasswordResetForm from "@/features/auth/components/password-reset-form";

export const metadata: Metadata = {
  title: "Restablecer contraseña",
};

export default function PasswordResetPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-svh items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <PasswordResetForm />
    </Suspense>
  );
}
