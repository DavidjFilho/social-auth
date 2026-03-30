import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router";

import { AuthLayout } from "./auth-layout";
import { SocialLoginPanel } from "./social-login-painel";
import { BaseInput } from "@/components/shared/base/base-input";

export default function Home() {
  return (
    <AuthLayout
      minHeight="min-h-[400px]"
      leftContent={
        <>
          <p className="text-xs text-muted-foreground mb-2">Seja Bem-vindo</p>

          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            Faça login na sua conta
          </h1>

          <form className="space-y-4">
            <BaseInput
              className="py-4"
              id="username"
              label="Seu nome ou e-mail"
              placeholder="Entre com seu usuário"
              icon={Mail}
              labelIsFloating
            />

            <BaseInput
              className="py-4"
              id="password"
              label="Senha"
              placeholder="Entre com sua senha"
              type="password"
              useShowPasswordToggle
              icon={Lock}
              labelIsFloating
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="h-4 w-4 accent-emerald-600" />
                Salvar login
              </label>

              <a href="#" className="text-slate-500 hover:underline">
                Esqueceu sua senha?
              </a>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Login
            </Button>

            <p className="text-center text-sm text-slate-600 pt-2">
              Não tem registro?{" "}
              <Link to="/register" className="text-emerald-600 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </form>
        </>
      }
      rightContent={
        <SocialLoginPanel topText="Você pode" title="Fazer login com:" />
      }
    />
  );
}
