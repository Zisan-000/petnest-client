"use client";

import { authClient } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdoptionForm({ pet }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleAdoptionSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const adoptionData = Object.fromEntries(formData.entries());

    adoptionData.petId = pet._id;
    adoptionData.ownerEmail = pet.ownerEmail;
    adoptionData.createdAt = new Date().toISOString();

    try {
      const { data: tokenData } = await authClient.token();

      const response = await fetch("http://localhost:5000/adoptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(adoptionData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          `🎉 Application for ${pet.petName} submitted successfully!`,
        );
        e.target.reset();
        router.push("/allpets");
      } else {
        toast.error(data.message || "Failed to submit adoption request.");
      }
    } catch (error) {
      toast.error("Frontend submission network error:", error);
    }
  };

  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [isLoadingCheck, setIsLoadingCheck] = useState(true);

  useEffect(() => {
    const checkIfAdopted = async () => {
      try {
        setIsLoadingCheck(true);

        const tokenResponse = await authClient.token();
        const token = tokenResponse?.data?.token;

        const headers = { "Content-Type": "application/json" };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch("http://localhost:5000/adoptions", {
          method: "GET",
          headers: headers,
        });

        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const adoptionsList = await res.json();

        const sanitizedList = Array.isArray(adoptionsList)
          ? adoptionsList
          : adoptionsList?.data && Array.isArray(adoptionsList.data)
            ? adoptionsList.data
            : [];

        const found = sanitizedList.some((item) => item.petId === pet?._id);
        setIsAlreadyApplied(found);
      } catch (error) {
        //console.error("Error checking adoption status:", error);
      } finally {
        setIsLoadingCheck(false);
      }
    };

    if (pet?._id) {
      checkIfAdopted();
    }
  }, [pet?._id]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-75">
        <Spinner label="Verifying session credentials..." color="warning" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl p-6 border border-divider rounded-xl bg-background">
      <h2 className="text-2xl text-center font-bold mb-4">Adopt This Pet</h2>

      {isAlreadyApplied ? (
        <div className="max-w-xl mx-auto p-6 border border-amber-200 bg-amber-50 rounded-xl text-center shadow-sm">
          <h2 className="text-xl font-bold text-amber-800 mb-2">
            🎉 Happy News!
          </h2>
          <p className="text-sm text-amber-600">
            <strong>{pet.petName}</strong> has already been adopted into a
            loving home! This listing is closed for new adoption applications.
          </p>
        </div>
      ) : !user ? (
        <div className="max-w-xl mx-auto p-8 border border-divider bg-default-50 rounded-xl text-center flex flex-col items-center gap-4 shadow-sm">
          <div className="p-4 bg-warning-50 text-warning-600 rounded-full text-2xl">
            🔒
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Authentication Required
            </h3>
            <p className="text-sm text-default-500 mt-1">
              You must be logged in to submit an adoption application for{" "}
              <strong>{pet.petName}</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="mt-2 px-6 h-10 bg-warning text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm shadow-sm"
          >
            Log In to Your Account
          </button>
        </div>
      ) : user?.email?.toLowerCase() === pet.ownerEmail?.toLowerCase() ? (
        <div className="max-w-xl mx-auto p-6 border border-danger-200 bg-danger-50 rounded-xl text-center">
          <h2 className="text-xl font-bold text-danger-800 mb-2">
            Action Restricted
          </h2>
          <p className="text-sm text-danger-600">
            You are the creator of this listing. You cannot submit an adoption
            request for your own pet, <strong>{pet.petName}</strong>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleAdoptionSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700">
              Pet Name
            </label>
            <input
              type="text"
              name="petName"
              value={pet.petName || ""}
              readOnly
              className="w-full h-10 px-3 bg-default-100 border border-divider rounded-lg outline-none pointer-events-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700">
              Your Name
            </label>
            <input
              type="text"
              name="userName"
              value={user?.name || ""}
              readOnly
              className="w-full h-10 px-3 bg-default-100 border border-divider rounded-lg outline-none pointer-events-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700">
              Your Email
            </label>
            <input
              type="email"
              name="userEmail"
              value={user?.email || ""}
              readOnly
              className="w-full h-10 px-3 bg-default-100 border border-divider rounded-lg outline-none pointer-events-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700">
              Pickup Date
            </label>
            <input
              type="date"
              name="pickupDate"
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full h-10 px-3 bg-transparent border border-default-300 rounded-lg outline-none focus:border-warning"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Write your message to the shelter owner here..."
              required
              className="w-full min-h-25 p-3 bg-transparent border border-default-300 rounded-lg outline-none focus:border-warning resize-y"
            ></textarea>
          </div>

          <input type="hidden" name="status" value="pending" />

          <button
            type="submit"
            className="w-full h-11 bg-warning text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            Submit Adoption Request
          </button>
        </form>
      )}
    </div>
  );
}
