import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Linkedin, Twitter, Github, EyeOff, Eye } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl overflow-hidden rounded-md shadow-lg border-0">
        <div className="grid md:grid-cols-[1fr_auto_1fr] min-h-[400px] items-stretch">
          <div className="bg-white p-8 h-full">
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
                  <input type="checkbox" className="h-4 w-4" />
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
                <a href="#" className="text-emerald-600 hover:underline">
                  Cadastre-se
                </a>
              </p>
            </form>
          </div>

          <div className="relative hidden md:flex items-center justify-center bg-white px-2 h-full">
            <div className="h-full w-px bg-slate-200" />
            <span className="absolute bg-white px-2 text-xs font-semibold text-slate-500">
              Ou
            </span>
          </div>

          <div className="bg-emerald-50 p-8 h-full w-full flex flex-col justify-center items-center relative overflow-hidden">
            <div className="relative z-10 w-full max-w-xs text-center">
              <p className="text-sm text-slate-600 mb-1">Você pode</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Fazer login com:
              </h2>

              <div className="space-y-3 flex flex-col items-center">
                <Button
                  className="w-44 justify-center gap-2 bg-sky-500 hover:bg-sky-600"
                  type="button"
                >
                  <Twitter className="h-4 w-4" />
                  Login com Twitter
                </Button>

                <Button
                  className="w-44 justify-center gap-2 bg-blue-500 hover:bg-blue-600"
                  type="button"
                >
                  <Facebook className="h-4 w-4" />
                  Login com Facebook
                </Button>

                <Button
                  className="w-44 justify-center gap-2 bg-red-500 hover:bg-red-600"
                  type="button"
                >
                  <span className="font-bold">G</span>
                  Login com Google
                </Button>

                <Button
                  className="w-44 justify-center gap-2 bg-sky-700 hover:bg-sky-800"
                  type="button"
                >
                  <Linkedin className="h-4 w-4" />
                  Login com Linkedin
                </Button>

                <Button className="w-44 justify-center gap-2 bg-black hover:bg-gray-700 text-white">
                  <Github className="h-4 w-4" />
                  Login com Github
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
