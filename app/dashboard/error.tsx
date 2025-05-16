"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error }: ErrorProps) {
  useEffect(() => console.error(error), [error]);

  return (
    <div className="flex-1 h-full flex items-center justify-center">
      <div className="text-red-500">
        <strong>Błąd:</strong> <span>{error.message}</span>
      </div>
    </div>
  );
}
