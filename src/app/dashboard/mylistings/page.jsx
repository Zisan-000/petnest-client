"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { Spinner } from "@heroui/react";
import Listing from "@/components/Listing";
import { authClient } from "@/lib/auth-client";

const fetcher = async ([url, token]) => {
  const headers = token ? { authorization: `Bearer ${token}` } : {};
  const res = await fetch(url, { headers });
  return res.json();
};

export default function MyListings() {
  const { data: session, isPending: authLoading } = authClient.useSession();
  const user = session?.user;

  const { data: tokenData } = useSWR("jwt-token", () =>
    authClient.token().then((res) => res.data?.token),
  );

  const {
    data: allPets,
    isLoading: dataLoading,
    mutate,
  } = useSWR(
    user?.email && tokenData ? ["http://localhost:5000/pets", tokenData] : null,
    fetcher,
  );

  // --- 🌟 REQUESTS MODAL LOCAL STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePet, setActivePet] = useState(null);
  const [petRequests, setPetRequests] = useState([]);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Executed when a user clicks the "Requests" button inside Listing.jsx
  const handleOpenRequestsModal = async (pet) => {
    setActivePet(pet);
    setIsModalOpen(true);

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch("http://localhost:5000/adoptions", {
        headers: { authorization: `Bearer ${tokenData?.token}` },
      });
      if (res.ok) {
        const allAdoptions = await res.json();
        const filtered = allAdoptions.filter((req) => req.petId === pet._id);
        setPetRequests(filtered);
      }
    } catch (error) {
      console.error("Error pulling pet adoption requests:", error);
    }
  };

  // Handles updating request status to backend (Approve/Reject)
  const handleUpdateStatus = async (requestId, nextStatus) => {
    try {
      setIsActionLoading(true);
      const res = await fetch(`http://localhost:5000/adoptions/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (res.ok) {
        alert(`Request successfully ${nextStatus}!`);

        setPetRequests((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: nextStatus } : req,
          ),
        );
      } else {
        alert("Failed to update execution parameters.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeletePet = async (petId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this listing?",
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/pets/${petId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert("Listing removed successfully!");
        const updatedPetsList = allPets.filter((pet) => pet._id !== petId);
        mutate(updatedPetsList, false);
      } else {
        alert(data.message || "Failed to complete data deletion pipeline.");
      }
    } catch (error) {
      console.error("Deletion lifecycle failure:", error);
      alert("Network error: Verification connection path to server lost.");
    }
  };
  console.log("Logged In User Email:", user?.email);
  console.log("Raw Backend Pets Data:", allPets);

  if (authLoading || dataLoading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <Spinner
          label="Loading listings console dashboard..."
          color="warning"
        />
      </div>
    );
  }
  const petsArray = Array.isArray(allPets)
    ? allPets
    : allPets?.data && Array.isArray(allPets.data)
      ? allPets.data
      : [];

  const myListings = petsArray.filter(
    (pet) => pet.ownerEmail?.toLowerCase() === user?.email?.toLowerCase(),
  );

  return (
    <div className="max-w-7xl mx-auto my-10 px-6 relative">
      <h1 className="text-4xl font-bold my-6">Manage My Listings</h1>

      {myListings.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-divider rounded-2xl">
          <p className="text-default-400 text-lg">
            No pets posted matching your profile signature.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myListings.map((pet) => (
            <Listing
              key={pet._id}
              pet={pet}
              onDelete={handleDeletePet}
              onOpenUpdate={(selectedPet) =>
                console.log(
                  "Open edit workflow layout wrapper context:",
                  selectedPet,
                )
              }
              onOpenRequests={handleOpenRequestsModal}
            />
          ))}
        </div>
      )}

      {/* --- 🛠️ CUSTOM OVERLAY MODAL (RAW HTML/TAILWIND) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col border border-gray-200 shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Adoption Requests
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Applications folder for:{" "}
                  <span className="font-semibold text-amber-600">
                    {activePet?.petName}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-medium"
              >
                &times;
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="p-6 overflow-y-auto grow flex flex-col gap-4">
              {petRequests.length === 0 ? (
                <p className="text-center text-gray-400 py-10 italic">
                  No requests submitted for this companion yet.
                </p>
              ) : (
                petRequests.map((req) => {
                  const isPending =
                    !req.status || req.status.toLowerCase() === "pending";

                  return (
                    <div
                      key={req._id}
                      className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                    >
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-900 text-base">
                          {req.userName || "Applicant"}
                        </h4>
                        <p className="text-xs text-gray-500 font-mono">
                          {req.userEmail}
                        </p>
                        <p className="text-xs text-gray-600 pt-1">
                          📅 Pickup Target:{" "}
                          <span className="font-semibold">
                            {req.pickupDate}
                          </span>
                        </p>
                        {req.message && (
                          <p className="text-xs italic text-gray-500 mt-2 bg-white p-2 rounded border border-gray-100">
                            {req.message}
                          </p>
                        )}
                      </div>

                      {/* --- ACTIONS SEGMENT: Conditional UI buttons based on active status --- */}
                      <div className="shrink-0 flex sm:flex-col items-end justify-end gap-2">
                        {isPending ? (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateStatus(req._id, "Approved")
                              }
                              disabled={isActionLoading}
                              className="h-8 px-4 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStatus(req._id, "Rejected")
                              }
                              disabled={isActionLoading}
                              className="h-8 px-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          /* Hides buttons and renders plain custom status badge if not pending */
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                              req.status.toLowerCase() === "approved"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-red-100 text-red-800 border-red-200"
                            }`}
                          >
                            {req.status}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end rounded-b-2xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-10 px-5 border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
