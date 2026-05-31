"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, Spinner } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { authClient } from "@/lib/auth-client"; // Make sure to import your authClient

export default function FeaturedCompanions() {
  const [allPets, setAllPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      try {
        setIsLoading(true);

        const tokenResponse = await authClient.token();
        const token = tokenResponse?.data?.token;

        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch("http://localhost:5000/pets", { headers });

        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const data = await res.json();

        const sanitizedArray = Array.isArray(data)
          ? data
          : data?.data && Array.isArray(data.data)
            ? data.data
            : [];

        setAllPets(sanitizedArray);
      } catch (error) {
        console.error("Failed to retrieve companion records:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPets();
  }, []);

  const featuredPets = allPets.slice(0, 6);

  // Quick console logging matching your original parameters
  useEffect(() => {
    if (!isLoading) {
      console.log("All Pets from server:", allPets);
      console.log("Featured Pets sliced:", featuredPets);
    }
  }, [allPets, featuredPets, isLoading]);

  return (
    <section className="max-w-7xl mx-auto px-6 w-full my-16">
      {/* Header Layout Block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Companions
          </h2>
          <p className="text-default-500 mt-1">
            Meet some of our lovely friends looking for a family.
          </p>
        </div>

        <Link href={"/allpets"}>
          <Button
            as={Link}
            href="/allpets"
            variant="light"
            color="warning"
            className="font-semibold"
          >
            View All Pets <FaArrowRight></FaArrowRight>
          </Button>
        </Link>
      </div>

      {/* Loading State Handling */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-75">
          <Spinner label="Finding lovely companions..." color="warning" />
        </div>
      ) : featuredPets?.length === 0 ? (
        /* Fallback UI if your database is empty or server is offline */
        <div className="text-center py-20 border border-dashed border-divider rounded-2xl">
          <p className="text-default-400 text-3xl font-bold">
            Login to see the featured pets
          </p>
        </div>
      ) : (
        /* Grid Layout Container */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPets.map((pet) => (
            <Card
              key={pet._id}
              className="py-4 shadow-sm border border-divider hover:scale-[1.01] transition-transform"
            >
              <div className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold text-warning">
                  {pet.species}
                </p>
                <small className="text-default-500">{pet.breed}</small>
                <h4 className="font-bold text-large mt-1">{pet.petName}</h4>
              </div>

              <div className="overflow-visible py-2 px-4">
                <Image
                  alt={`Image of ${pet.petName}`}
                  className="object-cover rounded-xl w-full h-55"
                  loading="eager"
                  src={
                    pet.imageUrl ||
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1"
                  }
                  width={400}
                  height={400}
                />

                <div className="mt-4 text-sm text-default-600 flex justify-between items-center w-full">
                  <span className="flex items-center gap-1">
                    📍 {pet.location || "Dhaka"}
                  </span>
                  <span className="font-bold text-foreground bg-default-100 px-3 py-1 rounded-full text-xs">
                    {pet.adoptionFee === 0 || !pet.adoptionFee
                      ? "Free"
                      : `$${pet.adoptionFee}`}
                  </span>
                </div>

                {/* Navigation details redirection trigger */}
                <Link
                  href={`/allpets/${pet._id}`}
                  className="w-full my-8 block"
                >
                  <Button
                    size="sm"
                    color="warning"
                    variant="flat"
                    className="w-full font-semibold my-5 bg-orange-500"
                  >
                    View Details <FaArrowRight></FaArrowRight>
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
