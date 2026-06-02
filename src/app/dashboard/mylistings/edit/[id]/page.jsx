import UpdateList from "@/components/UpdateList";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

export default async function EditPage({ params }) {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`, {
    cache: "no-store",
    headers: { authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return (
      <div className="max-w-xl mx-auto my-20 text-center">
        <h2 className="text-xl font-bold text-red-600">Error</h2>
        <p className="text-gray-500">
          Failed to load pet data. Verify your server is online.
        </p>
      </div>
    );
  }

  const petData = await res.json();

  return (
    <div className="max-w-3xl mx-auto my-12 px-4">
      <UpdateList initialPet={petData} />
    </div>
  );
}
