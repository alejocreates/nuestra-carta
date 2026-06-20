import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

export default function LoginWithGoogle() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        const response = await authClient.signIn.social({ provider: "google" });

        if (response.error) {
          toast.error(response.error.message ?? response.error.statusText);
          setLoading(false);
        }
      }}
      type="submit"
      variant="secondary"
    >
      {!loading ? (
        <span>
          Iniciar sesión con <b>Google</b>
        </span>
      ) : (
        <Spinner />
      )}
    </Button>
  );
}
