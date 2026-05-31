"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function FilterUI({ initialName, initialSpecies }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [name, setName] = useState(initialName);
  const [selectedSpecies, setSelectedSpecies] = useState(
    initialSpecies ? initialSpecies.split(",") : [],
  );

  const handleSpeciesToggle = (type) => {
    setSelectedSpecies((prev) =>
      prev.includes(type) ? prev.filter((s) => s !== type) : [...prev, type],
    );
  };

  // Whenever inputs change, calculate the new URL and navigate
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (name) params.set("name", name);
    else params.delete("name");

    if (selectedSpecies.length > 0)
      params.set("species", selectedSpecies.join(","));
    else params.delete("species");

    // Debounce typing to keep performance pristine
    const delayDebounce = setTimeout(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 350);

    return () => clearTimeout(delayDebounce);
  }, [name, selectedSpecies, pathname, router, searchParams]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 border border-divider rounded-xl bg-content1 shadow-sm items-center justify-between">
      <input
        type="text"
        placeholder="Search by pet name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-divider p-2 rounded-xl w-full md:w-1/3 text-sm bg-background focus:outline-warning"
      />

      <div className="flex flex-wrap gap-6 text-sm font-medium">
        {["Dog", "Cat", "Rabbit", "Bird", "Cow"].map((type) => {
          const lower = type.toLowerCase();
          return (
            <label
              key={type}
              className="flex gap-2 items-center cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={selectedSpecies.includes(lower)}
                onChange={() => handleSpeciesToggle(lower)}
                className="w-4 h-4 rounded border-gray-300 accent-warning cursor-pointer"
              />
              {type}s
            </label>
          );
        })}
      </div>
    </div>
  );
}
