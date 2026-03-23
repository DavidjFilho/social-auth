import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

type AuthLayoutProps = {
  leftContent: ReactNode;
  rightContent: ReactNode;
  minHeight?: string;
};

export function AuthLayout({
  leftContent,
  rightContent,
  minHeight = "min-h-[400px]",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl overflow-hidden rounded-md shadow-lg border-0">
        <div
          className={`grid md:grid-cols-[1fr_auto_1fr] ${minHeight} items-stretch`}
        >
          <div className="bg-white p-8 h-full">{leftContent}</div>

          <div className="relative hidden md:flex items-center justify-center bg-white px-2 h-full">
            <div className="h-full w-px bg-slate-200" />
            <span className="absolute bg-white px-2 text-xs font-semibold text-slate-500">
              Ou
            </span>
          </div>

          {rightContent}
        </div>
      </Card>
    </div>
  );
}
