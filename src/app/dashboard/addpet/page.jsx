"use client";
import { Button, Input, TextArea, Textarea } from "@heroui/react";
import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const AddPet = () => {
  const router = useRouter();
  const { data: session, isPending: authLoading } = authClient.useSession();
  const user = session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formData.entries());

    petData.adoptionFee = Number(petData.adoptionFee) || 0;

    try {
      const { data: tokenData } = await authClient.token();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(petData),
        },
      );

      if (response.ok) {
        toast.success("🎉 Pet profile added successfully!");

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        toast.error("Failed to submit pet listing data.");
      }
    } catch (error) {
      // //console.error("Error submitting form payload:", error);
      toast.error(
        "Network error: Make sure your Express backend port is listening.",
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <h1 className="text-4xl font-bold my-10">Add pet</h1>
      <div className="py-10 bg-green-50 rounded-3xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-xl mx-auto"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700 px-1">
              Pet Name
            </label>
            <Input
              label="Pet Name"
              name="petName"
              placeholder="Pet name"
              variant="bordered"
              isRequired
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700 px-1">
              Species
            </label>
            <Input
              label="Species"
              name="species"
              placeholder="Dog, Cat, etc."
              variant="bordered"
              isRequired
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700 px-1">
              Breed
            </label>
            <Input
              label="Breed"
              name="breed"
              placeholder="Breed"
              variant="bordered"
              isRequired
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700 px-1">
              Age
            </label>
            <Input
              label="Age"
              name="age"
              placeholder="Age"
              variant="bordered"
              isRequired
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700 px-1">
              Gender
            </label>
            <Input
              label="Gender"
              name="gender"
              placeholder="Gender"
              variant="bordered"
              isRequired
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700 px-1">
              Image URL
            </label>
            <Input
              label="Image URL"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              variant="bordered"
              isRequired
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700 px-1">
              Health Status
            </label>
            <Input
              label="Health Status"
              name="healthStatus"
              placeholder="Health status"
              variant="bordered"
              isRequired
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700 px-1">
              Vaccination Status
            </label>
            <Input
              label="Vaccination Status"
              name="vaccinationStatus"
              placeholder="Vaccination status"
              variant="bordered"
              isRequired
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700 px-1">
              Location
            </label>
            <Input
              label="Location"
              name="location"
              placeholder="Location"
              variant="bordered"
              isRequired
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700 px-1">
              Adoption Fee
            </label>
            <Input
              label="Adoption Fee"
              name="adoptionFee"
              placeholder="Adoption fee"
              type="number"
              variant="bordered"
              isRequired
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700 px-1">
              Owner Email
            </label>
            <Input
              label="Owner Email"
              name="ownerEmail"
              value={user?.email}
              isReadOnly
              variant="flat"
            />
          </div>

          {/* FIXED: Changed from native lowercase textarea to HeroUI Textarea to preserve design */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-default-700 px-1">
              Description
            </label>
            <TextArea
              label="Description"
              name="description"
              placeholder="Description"
              variant="bordered"
              isRequired
            />
          </div>

          <Button type="submit" color="warning" className="font-bold mt-2">
            Submit Pet
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
