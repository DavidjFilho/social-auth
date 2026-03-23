import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "./auth-layout";
import { SocialLoginPanel } from "./social-login-painel";

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "O e-mail é obrigatório.")
      .email("Digite um e-mail válido."),
    confirmEmail: z
      .string()
      .min(1, "A confirmação do e-mail é obrigatória.")
      .email("Digite um e-mail válido."),
    cpf: z
      .string()
      .min(14, "Digite um CPF válido.")
      .max(14, "Digite um CPF válido."),
    password: z
      .string()
      .min(1, "A senha é obrigatória.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
        "A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial.",
      ),
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Os e-mails não coincidem.",
    path: ["confirmEmail"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

function formatCpf(value: string) {
  const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);

  return onlyNumbers
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
      cpf: "",
      password: "",
      confirmPassword: "",
    },
  });

  const cpfValue = watch("cpf");

  function onSubmit(data: RegisterFormData) {
    console.log(data);
  }

  function handleCpfChange(value: string) {
    setValue("cpf", formatCpf(value), { shouldValidate: true });
  }

  return (
    <AuthLayout
      minHeight="min-h-[520px]"
      leftContent={
        <>
          <p className="text-xs text-muted-foreground mb-2">Crie sua conta</p>

          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            Faça seu cadastro
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmEmail">Confirme seu e-mail</Label>
              <Input
                id="confirmEmail"
                type="email"
                placeholder="Digite novamente seu e-mail"
                {...register("confirmEmail")}
              />
              {errors.confirmEmail && (
                <p className="text-sm text-red-500">
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                value={cpfValue}
                onChange={(e) => handleCpfChange(e.target.value)}
              />
              {errors.cpf && (
                <p className="text-sm text-red-500">{errors.cpf.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirme sua senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Digite novamente sua senha"
                  className="pr-10"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>

            <p className="text-center text-sm text-slate-600 pt-2">
              Já tem conta?{" "}
              <Link to="/" className="text-emerald-600 hover:underline">
                Faça login
              </Link>
            </p>
          </form>
        </>
      }
      rightContent={
        <SocialLoginPanel topText="Você também pode" title="Entrar com:" />
      }
    />
  );
}
