"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
  onExtract: (to: string, deadline: string | null) => void;
};

export default function DisclosureFormSearchParams({ onExtract }: Props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const to = searchParams.get("to") || "";
    const deadlineRaw = searchParams.get("deadline");
    let deadline: string | null = null;

    if (deadlineRaw) {
      const date = new Date(deadlineRaw);
      deadline = date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      });
    }

    onExtract(to, deadline);
  }, [searchParams, onExtract]);

  return null;
}
