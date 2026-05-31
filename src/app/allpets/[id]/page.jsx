import AdoptionForm from "@/components/AdoptionForm";
import { auth } from "@/lib/auth";
import { Button, Card } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import {
  FaArrowLeft,
  FaArrowLeftLong,
  FaHeart,
  FaLocationDot,
  FaShieldVirus,
} from "react-icons/fa6";
import { MdOutlineEmail, MdOutlineMedicalInformation } from "react-icons/md";

const PetDetails = async ({ params }) => {
  const { id } = await params;
  // console.log("Received ID:", id);
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  // console.log(token);
  const res = await fetch(`http://localhost:5000/pets/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const pet = await res.json();

  const {
    petName,
    species,
    breed,
    age,
    gender,
    imageUrl,
    healthStatus,
    vaccinationStatus,
    location,
    adoptionFee,
    description,
    ownerEmail,
  } = pet;

  return (
    <div className="w-full mx-auto bg-background min-h-screen text-foreground py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Back Button */}
        <div className="mb-6">
          <Link href="/allpets">
            <Button
              variant="light"
              color="warning"
              className="font-medium p-0 hover:bg-transparent"
              startContent={<FaArrowLeft size={14} />}
            >
              <FaArrowLeftLong />
              Back to All Pets
            </Button>
          </Link>
        </div>

        {/* Main Details Card Layout */}
        <Card className="p-6 border border-divider shadow-sm bg-background flex flex-col md:flex-row gap-8">
          {/* Left Column: Pet Image Banner */}
          <div className="relative w-full md:w-80 h-80 rounded-2xl overflow-hidden bg-default-100 shrink-0 border border-divider">
            {imageUrl ? (
              <Image
                width={400}
                height={400}
                src={imageUrl}
                alt={petName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-default-300">
                <FaHeart size={64} />
              </div>
            )}
            <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {species}
            </span>
          </div>

          {/* Right Column: Information Profile Content */}
          <div className="flex flex-col gap-4 flex-1 justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                {petName}
              </h1>
              <p className="text-default-400 font-medium text-base mt-1">
                {breed} &bull; {age} &bull; {gender}
              </p>

              <p className="text-sm text-default-600 leading-relaxed border-y border-divider py-4 my-4 whitespace-pre-line">
                {description}
              </p>

              {/* Specification Metadata Grid Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-default-500">
                <div className="flex items-center gap-2">
                  <FaLocationDot className="text-danger" />
                  <span>
                    <strong>Location:</strong> {location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaShieldVirus className="text-success" />
                  <span>
                    <strong>Vaccination:</strong> {vaccinationStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                  <MdOutlineMedicalInformation className="text-warning text-base" />
                  <span>
                    <strong>Health Condition:</strong> {healthStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                  <MdOutlineEmail className="text-primary text-base" />
                  <span>
                    <strong>Owner:</strong> {ownerEmail}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row Layout: Fee & Adopt Button Trigger */}
            <div className="pt-4 border-t border-divider/60 flex items-center justify-between gap-4 mt-4">
              <div>
                <span className="text-xs text-default-400 block font-semibold uppercase tracking-wider">
                  Adoption Cost
                </span>
                <span className="text-2xl font-black text-warning">
                  {adoptionFee === 0 || !adoptionFee
                    ? "Free"
                    : `৳${adoptionFee}`}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="my-5  max-w-4xl mx-auto">
        <h2 className="my-5 text-3xl font-bold text-center">Adoption Form</h2>
        <AdoptionForm pet={pet}></AdoptionForm>
      </div>
    </div>
  );
};

export default PetDetails;
