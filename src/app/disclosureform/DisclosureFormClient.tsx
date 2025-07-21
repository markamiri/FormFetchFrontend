"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  onExtract: (to: string, deadline: string | null) => void;
};

export default function DisclosureFormSearchParams({ onExtract }: Props) {
  const searchParams = useSearchParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");

    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://formfetchbackend.onrender.com/api/disclosureData?id=${id}`
        );
        if (!res.ok) {
          console.error("Failed to fetch disclosure data");
          return;
        }
        const data = await res.json();

        const deadlineRaw = data.deadline;
        let formattedDeadline: string | null = null;

        if (deadlineRaw) {
          const date = new Date(deadlineRaw);
          formattedDeadline = date.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short",
          });
        }

        onExtract(data.to, formattedDeadline);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchParams, onExtract]);

  if (!loaded) {
    return (
      <div className="flex justify-center mt-8">
        <div className="w-6 h-6 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return null;
}
