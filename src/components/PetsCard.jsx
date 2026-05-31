"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Card, CardHeader } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaHeart } from "react-icons/fa6";

const PetsCard = ({ pet }) => {
  const {
    petName,
    breed,
    species,
    age,
    imageUrl,
    location,
    adoptionFee,
    description,
    _id,
  } = pet;
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <div>
      <Card className="w-full p-4 flex flex-col md:flex-row gap-5 items-stretch border border-divider shadow-sm bg-background">
        {/* Left Column: Image Box */}
        <div className="relative h-40 w-full md:w-40 shrink-0 overflow-hidden rounded-2xl bg-default-100 flex items-center justify-center">
          <Image
            width={300}
            height={300}
            alt={petName}
            // className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none transition-transform duration-300 hover:scale-105"
            // loading="lazy"
            src={imageUrl}
          />
        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-1 flex-col justify-between gap-4">
          <header className="flex flex-col items-start gap-1 p-0">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {petName}{" "}
              <span className="text-default-400 font-normal text-lg">
                ({breed})
              </span>
            </h2>

            <div className="flex flex-wrap gap-2 text-xs text-default-400 font-medium mb-1">
              <span>Age: {age}</span>
              <span>&bull;</span>
              <span>Location: {location}</span>
            </div>

            <p className="text-sm text-default-500 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </header>

          {/* Bottom Row Layout */}
          <div className="mt-auto flex flex-col gap-4 pt-3 border-t border-divider/60 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col">
              <span className="text-base font-bold text-warning">
                Adoption Fee:{" "}
                {adoptionFee === 0 || !adoptionFee ? "Free" : `৳${adoptionFee}`}
              </span>
            </div>

            {/* Fixed Buttons Area */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Wrap the button in a standard Link instead of using as={Link} */}
              <Link href={`/allpets/${_id}`} className="w-full sm:w-auto">
                <Button
                  color="warning"
                  variant="flat"
                  className="w-full font-semibold"
                  endContent={<FaEye size={14} />}
                >
                  View Details
                </Button>
              </Link>
              <Link href={`/allpets/${_id}`} className="w-full sm:w-auto">
                <Button
                  color="warning"
                  className="w-full sm:w-auto font-bold shadow-sm"
                >
                  Adopt Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PetsCard;
