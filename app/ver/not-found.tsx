import { BugIcon, InfoIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function MenuNotFound() {
  return (
    <div>
      <div className="flex h-svh flex-col items-center justify-center gap-3 p-6 text-center">
        <h2 className="font-mono text-7xl font-bold">404</h2>
        <p className="text-xl">
          La carta que buscabas no existe o no está disponible 😔
        </p>
      </div>

      <div className="flex justify-end gap-3 p-6">
        <Button variant="ghost" size="sm">
          <BugIcon />
          <span>Quiero reportar un inconveniente</span>
        </Button>

        <Button asChild variant="link" size="sm">
          <Link href="/">
            <InfoIcon />
            <span>
              Quiero saber más sobre <strong>nuestra carta</strong>
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
