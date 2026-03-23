import { Button } from "@/components/ui/button";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";

type SocialLoginPanelProps = {
  topText?: string;
  title?: string;
};

export function SocialLoginPanel({
  topText = "Você pode",
  title = "Fazer login com:",
}: SocialLoginPanelProps) {
  return (
    <div className="bg-emerald-50 p-8 h-full w-full flex flex-col justify-center items-center relative overflow-hidden">
      <div className="relative z-10 w-full max-w-xs text-center">
        <p className="text-sm text-slate-600 mb-1">{topText}</p>

        <h2 className="text-3xl font-bold text-slate-900 mb-6">{title}</h2>

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

          <Button
            className="w-44 justify-center gap-2 bg-black hover:bg-gray-700 text-white"
            type="button"
          >
            <Github className="h-4 w-4" />
            Login com Github
          </Button>
        </div>
      </div>
    </div>
  );
}
