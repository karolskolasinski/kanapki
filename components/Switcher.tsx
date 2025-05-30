"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";

type SwitcherProps = {
  checked?: boolean;
  dishId: string;
  userId: string;
};

export default function Switcher(props: SwitcherProps) {
  const { checked = false, dishId, userId } = props;
  const [isChecked, setIsChecked] = useState(checked);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = async () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);

    try {
      const response = await fetch("/api/dishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: dishId, userId, checked: newChecked }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Błąd zapisu");
        return;
      }

      setError(null);
      router.push("/dashboard/dishes");
    } catch (err) {
      console.error(err);
      setError("Błąd zapisu");
    }
  };

  return (
    <>
      <Input type="switcher" checked={isChecked} name="" handleChange={handleChange} />
      {error && <p className="text-red-500 pr-3">{error}</p>}
    </>
  );
}
