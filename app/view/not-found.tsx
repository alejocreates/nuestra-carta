import { BugIcon, InfoIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "No se encontró la carta",
};

export default function MenuNotFound() {
  return (
    <div className="flex h-svh flex-col">
      <div className="flex grow flex-col items-center justify-center gap-3 p-6 pb-0">
        <h2 className="font-mono text-7xl font-bold">404</h2>
        <p className="text-center text-xl">
          La carta que buscabas no existe o no está disponible 😔
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 p-6 md:flex-row">
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
