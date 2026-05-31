"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateList({ initialPet }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedPayload = Object.fromEntries(formData.entries());

    // Convert adoption fee input text back into a valid number representation
    updatedPayload.adoptionFee = Number(updatedPayload.adoptionFee) || 0;

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `http://localhost:5000/pets/${initialPet._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPayload),
        },
      );

      if (response.ok) {
        alert("🎉 Listing updated successfully!");
        router.push("/dashboard/mylistings");
        router.refresh();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to save updates.");
      }
    } catch (error) {
      console.error("Update request failure:", error);
      alert("Network error: Could not connect to Express server backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Update Pet Listing</h1>
        <p className="text-sm text-gray-500 mt-1">
          Modifying profile details for:{" "}
          <span className="font-semibold text-warning-600">
            {initialPet.petName}
          </span>
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
        {/* Pet Name input fields */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Pet Name
          </label>
          <input
            type="text"
            name="petName"
            required
            defaultValue={initialPet?.petName}
            className="w-full h-10 px-3 bg-transparent border border-gray-300 rounded-lg outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Breed type configuration */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Breed</label>
          <input
            type="text"
            name="breed"
            required
            defaultValue={initialPet?.breed}
            className="w-full h-10 px-3 bg-transparent border border-gray-300 rounded-lg outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Geographic Listing Location */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Location (City)
          </label>
          <input
            type="text"
            name="location"
            required
            defaultValue={initialPet?.location}
            className="w-full h-10 px-3 bg-transparent border border-gray-300 rounded-lg outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Adoption Financial Fee parameters */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Adoption Fee ($)
          </label>
          <input
            type="number"
            name="adoptionFee"
            required
            defaultValue={initialPet?.adoptionFee}
            className="w-full h-10 px-3 bg-transparent border border-gray-300 rounded-lg outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Cloud database Image Hosting location path URL */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Photo URL
          </label>
          <input
            type="url"
            name="imageUrl"
            required
            defaultValue={initialPet?.imageUrl}
            className="w-full h-10 px-3 bg-transparent border border-gray-300 rounded-lg outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Action button container row */}
        <div className="flex justify-end items-center gap-3 mt-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.push("/dashboard/my-listings")}
            disabled={isSubmitting}
            className="h-10 px-4 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-10 px-5 rounded-lg text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors disabled:opacity-70 flex items-center justify-center"
          >
            {isSubmitting ? "Saving Changes..." : "Save Updates"}
          </button>
        </div>
      </form>
    </div>
  );
}
