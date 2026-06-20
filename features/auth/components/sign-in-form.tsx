"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { signInSchema } from "../schemas/sign-in-schema";
import LoginWithGoogle from "./login-with-google";

export default function SignInForm() {
  const router = useRouter();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (response.error) {
      toast.error(response.error.message ?? response.error.statusText);
      return;
    }

    router.push("/");
  });

  return (
    <form className="mx-auto mt-12 max-w-md p-4" onSubmit={onSubmit}>
      <h2 className="mb-6 text-xl font-semibold">Ingreso</h2>
      <FieldGroup>
        <Field data-invalid={!!errors.email}>
          <FieldLabel>Email</FieldLabel>
          <Input {...register("email")} aria-invalid={!!errors.email} />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field data-invalid={!!errors.email}>
          <FieldLabel>Contraseña</FieldLabel>
          <Input
            {...register("password")}
            aria-invalid={!!errors.email}
            type="password"
          />
          <FieldError errors={[errors.password]} />
        </Field>
        <Button disabled={isSubmitting} type="submit">
          Iniciar sesión
        </Button>
        <FieldSeparator />
        <LoginWithGoogle />
        <div className="grid grid-cols-2 gap-3">
          <Button asChild variant="link" size="sm">
            <Link href="/auth/signup">Quiero una cuenta</Link>
          </Button>
          <Button asChild variant="link" size="sm">
            <Link href="/auth/recovery">Olvidé mi contraseña</Link>
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
