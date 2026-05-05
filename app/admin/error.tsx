"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin] page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-md space-y-4 rounded-xl border border-red-200 bg-white p-8 shadow-sm dark:border-red-900 dark:bg-zinc-900">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Error al cargar el panel
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {error.message ?? "Se ha producido un error inesperado."}
        </p>
        {error.digest && (
          <p className="font-mono text-xs text-zinc-400">digest: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
