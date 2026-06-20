"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { passwordResetSchema } from "../schemas/password-reset-schema";

export default function PasswordResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    if (!token) {
      toast.error("El enlace de recuperación es inválido o se venció");
      return;
    }

    const response = await authClient.resetPassword({
      newPassword: values.newPassword,
      token,
    });

    if (response.error) {
      toast.error(response.error.message ?? response.error.statusText);
      return;
    }

    router.push("/auth/signin");
  });

  return (
    <form className="mx-auto mt-12 max-w-md p-4" onSubmit={onSubmit}>
      <h2 className="mb-6 text-xl font-semibold">Restablecer contraseña</h2>

      <FieldGroup>
        {token ? (
          <Fragment>
            <Field data-invalid={!!errors.newPassword}>
              <FieldLabel>Nueva contraseña</FieldLabel>
              <Input
                {...register("newPassword")}
                aria-invalid={!!errors.newPassword}
                type="password"
              />
              <FieldError errors={[errors.newPassword]} />
            </Field>

            <Button disabled={isSubmitting || !token} type="submit">
              Restablecer contraseña
            </Button>
          </Fragment>
        ) : (
          <p className="text-destructive text-sm">
            El enlace de recuperación es inválido o se venció
          </p>
        )}

        <FieldSeparator />

        <Button asChild variant="secondary">
          <Link href="/auth/signin">
            <ArrowLeft />
            Volver al ingreso
          </Link>
        </Button>
      </FieldGroup>
    </form>
  );
}
