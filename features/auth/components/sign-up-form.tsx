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
import { signUpSchema } from "../schemas/sign-up-schema";

export default function SignUpForm() {
  const router = useRouter();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await authClient.signUp.email({
      name: values.name,
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
      <h2 className="mb-6 text-xl font-semibold">Registro</h2>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel>Nombre</FieldLabel>
          <Input {...register("name")} aria-invalid={!!errors.name} />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field data-invalid={!!errors.email}>
          <FieldLabel>Email</FieldLabel>
          <Input {...register("email")} aria-invalid={!!errors.email} />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field data-invalid={!!errors.password}>
          <FieldLabel>Contraseña</FieldLabel>
          <Input
            {...register("password")}
            aria-invalid={!!errors.password}
            type="password"
          />
          <FieldError errors={[errors.password]} />
        </Field>
        <Button disabled={isSubmitting} type="submit">
          Completar registro
        </Button>
        <FieldSeparator />
        <div className="grid grid-cols-2 gap-3">
          <Button asChild size="sm" variant="link">
            <Link href="/auth/signin">Ya tengo una cuenta</Link>
          </Button>
          <Button asChild size="sm" variant="link">
            <Link href="/auth/recovery">Olvidé mi contraseña</Link>
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
