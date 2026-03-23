import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import { AuthLayout } from "./auth-layout";
import { SocialLoginPanel } from "./social-login-painel";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

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
            <div className="space-y-2">
              <Label htmlFor="username">Seu nome ou e-mail</Label>
              <Input id="username" placeholder="Entre com seu usuário" />
            </div>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                className="pr-10"
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
