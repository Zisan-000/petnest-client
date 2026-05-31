"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import RequestTable from "@/components/RequestTable";
import { toast } from "react-toastify";

export default function MyRequest() {
  const { data: session, isPending: authLoading } = authClient.useSession();
  const user = session?.user;

  const [myRequests, setMyRequests] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchMyRequests = async () => {
      if (!user?.email) return;

      try {
        setDataLoading(true);
        const { data: tokenData } = await authClient.token();
        const res = await fetch("http://localhost:5000/adoptions", {
          headers: { authorization: `Bearer ${tokenData?.token}` },
        });
        if (res.ok) {
          const allAdoptions = await res.json();
          const filteredRequests = allAdoptions.filter(
            (req) => req.userEmail?.toLowerCase() === user.email.toLowerCase(),
          );

          setMyRequests(filteredRequests);
        } else {
          //console.error("Failed to fetch adoptions registry collection.");
        }
      } catch (error) {
        toast.error(
          "Network error pulling client requests profile logs:",
          error,
        );
      } finally {
        setDataLoading(false);
      }
    };

    if (!authLoading) {
      fetchMyRequests();
    }
  }, [user?.email, authLoading]);

  if (authLoading || (user && dataLoading)) {
    return (
      <div className="max-w-7xl mx-auto min-h-screen my-10 px-6 flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-gray-500 font-semibold animate-pulse">
          Loading your adoption records...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto min-h-screen my-20 px-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-500 mt-2">
          Please log in to review your submitted adoption requests.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen my-10 px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold  tracking-tight">
          My Adoption Requests
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Tracking records for:{" "}
          <span className="font-semibold text-amber-600">{user.email}</span>
        </p>
      </div>

      {myRequests.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl">
          <p className="text-gray-400 text-lg font-medium">
            You have not submitted any pet adoption requests yet.
          </p>
        </div>
      ) : (
        <RequestTable requests={myRequests} />
      )}
    </div>
  );
}
