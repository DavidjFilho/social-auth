import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export default function HomePage() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert variant="warn">
        <CheckCircle2Icon className="size-8" />
        <AlertTitle>Bem-vindo a Home</AlertTitle>
        <AlertDescription>Meu primeiro componente</AlertDescription>
      </Alert>
    </div>
  );
}
