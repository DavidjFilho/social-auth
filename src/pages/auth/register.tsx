import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { BaseInput } from "@/components/shared/base/base-input";

import { AuthLayout } from "../auth-layout";
import { SocialLoginPanel } from "../social-login-painel";

import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/auth/register-schema";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      birthDate: "",
      email: "",
      confirmEmail: "",
      cpf: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: RegisterFormData) {
    console.log("VALIDO:", data);
  }

  return (
    <AuthLayout
      leftContent={
        <>
          <h1 className="mb-4 text-2xl font-bold">Cadastro</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <BaseInput
              id="name"
              label="Nome completo"
              type="text"
              labelIsFloating
              error={errors.name?.message}
              {...register("name")}
            />

            <BaseInput
              id="birthDate"
              label="Data de nascimento"
              type="text"
              labelIsFloating
              mask="99/99/9999"
              error={errors.birthDate?.message}
              {...register("birthDate")}
            />

            <BaseInput
              id="email"
              label="E-mail"
              type="email"
              labelIsFloating
              error={errors.email?.message}
              {...register("email")}
            />

            <BaseInput
              id="confirmEmail"
              label="Confirmar e-mail"
              type="email"
              labelIsFloating
              error={errors.confirmEmail?.message}
              {...register("confirmEmail")}
            />

            <BaseInput
              id="cpf"
              label="CPF"
              type="text"
              labelIsFloating
              mask="999.999.999-99"
              error={errors.cpf?.message}
              {...register("cpf")}
            />

            <BaseInput
              id="phone"
              label="Telefone"
              type="text"
              labelIsFloating
              mask="(99) 99999-9999"
              error={errors.phone?.message}
              {...register("phone")}
            />

            <BaseInput
              id="password"
              label="Senha"
              type="password"
              useShowPasswordToggle
              labelIsFloating
              error={errors.password?.message}
              {...register("password")}
            />

            <BaseInput
              id="confirmPassword"
              label="Confirmar senha"
              type="password"
              useShowPasswordToggle
              labelIsFloating
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Carregando..." : "Cadastrar"}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-600 pt-2">
            Já tem conta?{" "}
            <Link to="/" className="text-green-600">
              Login
            </Link>
          </p>
        </>
      }
      rightContent={<SocialLoginPanel title="Entrar com:" topText="Ou use:" />}
    />
  );
}
