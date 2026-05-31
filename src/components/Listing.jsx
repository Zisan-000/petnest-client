"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Chip,
  Tooltip,
} from "@heroui/react";
import Image from "next/image";
import { FaEye, FaPen, FaTrash, FaInbox } from "react-icons/fa6";

export default function Listing({
  pet,
  onOpenRequests,
  onOpenUpdate,
  onDelete,
}) {
  // Determine color accents dynamically based on adoption state parameters
  const isAdopted = pet.status?.toLowerCase() === "adopted";

  return (
    <Card className="py-4 shadow-sm border border-divider hover:shadow-md transition-all flex flex-col justify-between h-full bg-background">
      {/* 1. HEADER LOGIC (Species, Breed, Name & Adoption Status Status) */}
      <div className="pb-0 pt-2 px-4 flex justify-between items-start gap-2">
        <div className="flex flex-col items-start">
          <p className="text-tiny uppercase font-bold text-warning">
            {pet.species}
          </p>
          <small className="text-default-500">{pet.breed}</small>
          <h4 className="font-bold text-xl mt-1 tracking-tight text-foreground">
            {pet.petName}
          </h4>
        </div>

        {/* Visual Badge representing availability state */}
        <Chip
          size="sm"
          variant="flat"
          color={isAdopted ? "danger" : "success"}
          className="capitalize font-semibold shrink-0"
        >
          {pet.status || "Available"}
        </Chip>
      </div>

      {/* 2. BODY CONTENT (Image & Pricing Details) */}
      <div className="overflow-visible py-3 px-4 grow flex flex-col gap-3">
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-default-100">
          <Image
            alt={`Image of ${pet.petName}`}
            className="object-cover rounded-xl"
            src={
              pet.imageUrl ||
              "https://images.unsplash.com/photo-1543466835-00a7907e9de1"
            }
            loading="eager"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="text-sm text-default-600 flex justify-between items-center px-1">
          <span className="flex items-center gap-1">📍 {pet.location}</span>
          <span className="font-bold text-base text-foreground">
            {pet.adoptionFee === 0 || !pet.adoptionFee
              ? "Free"
              : `$${pet.adoptionFee}`}
          </span>
        </div>

        {/* --- ACTIONS DASHBOARD PAD --- */}
        <div className="grid grid-cols-3 pl-12 mt-2 pt-2 border-t border-divider">
          <div>
            <Button
              size="sm"
              color="warning"
              variant="flat"
              className="font-semibold w-full"
              startContent={<FaInbox size={14} />}
              onClick={() => onOpenRequests?.(pet)}
            >
              Requests
            </Button>
          </div>
          <div>
            <Link
              href={`/dashboard/mylistings/edit/${pet._id}`}
              className="w-full"
            >
              <button
                type="button"
                className="w-full h-8 px-3 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center gap-2 transition-colors"
              >
                <FaPen size={12} /> Edit
              </button>
            </Link>
          </div>
          <div>
            {" "}
            <Tooltip content="Delete Listing" color="danger" closeDelay={100}>
              <Button
                isIconOnly
                size="sm"
                color="danger"
                variant="flat"
                aria-label="Delete listing"
                onClick={() => onDelete?.(pet._id)}
              >
                <FaTrash size={14} />
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Global Inspection Control Bar */}
        <div className=" w-full mt-1">
          {/* View Details Navigation Wrapper */}
          <Link href={`/allpets/${pet._id}`} className="grow">
            <Button
              size="sm"
              variant="bordered"
              className="w-full font-semibold border-default-200 text-default-700 hover:bg-default-100"
              startContent={<FaEye size={14} />}
            >
              View Details <FaEye size={14} />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
