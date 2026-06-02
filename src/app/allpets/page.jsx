import PetsCard from "@/components/PetsCard";
import FilterUI from "@/components/FilterUI"; // We will create this small client file next
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AllPets = async ({ searchParams }) => {
  const params = await searchParams;
  const nameQuery = params?.name || "";
  const speciesQuery = params?.species || "";

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const queryParams = new URLSearchParams();
  if (nameQuery) queryParams.append("name", nameQuery);
  if (speciesQuery) queryParams.append("species", speciesQuery);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/pets?${queryParams.toString()}`,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  const data = await res.json();
  const pets = Array.isArray(data) ? data : data?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          All Available Pets
        </h1>
        <p className="text-default-500 text-sm mt-1">
          Explore companions ready to find a loving home.
        </p>
      </div>

      <FilterUI initialName={nameQuery} initialSpecies={speciesQuery} />

      {pets.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-divider rounded-2xl mt-6">
          <p className="text-default-400 text-lg">
            No companions match your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {pets.map((pet) => (
            <PetsCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPets;
