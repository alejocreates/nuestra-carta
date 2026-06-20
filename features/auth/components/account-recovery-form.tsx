"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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
import { accountRecoverySchema } from "../schemas/account-recovery-schema";

export default function AccountRecoveryForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(accountRecoverySchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await authClient.requestPasswordReset({
      email: values.email,
      redirectTo: "/auth/reset",
    });

    if (response.error) {
      toast.error(response.error.message ?? response.error.statusText);
      return;
    }

    toast.success(
      <span>
        Enviaremos un enlace de recuperación a <b>{values.email}</b>, en caso de
        estar registrado
      </span>,
    );
  });

  return (
    <form className="mx-auto mt-12 max-w-md p-4" onSubmit={onSubmit}>
      <h2 className="mb-6 text-xl font-semibold">Olvidé mi contraseña</h2>
      <FieldGroup>
        <Field data-invalid={!!errors.email}>
          <FieldLabel>Email</FieldLabel>
          <Input {...register("email")} aria-invalid={!!errors.email} />
          <FieldError errors={[errors.email]} />
        </Field>
        <Button disabled={isSubmitting} type="submit">
          Enviar enlace de recuperación
        </Button>
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
