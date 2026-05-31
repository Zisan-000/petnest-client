"use client";

import React from "react";
import Link from "next/link";
import { Button, Card, CardHeader, Avatar } from "@heroui/react";
import { RiSparkling2Line } from "react-icons/ri";
import { FaArrowRight, FaRegHeart } from "react-icons/fa6";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaRegSmileBeam } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { GrCircleInformation } from "react-icons/gr";
import { RxAvatar } from "react-icons/rx";
import FeaturedCompanions from "./FeaturedCompanions";

export default function HomePage() {
  return (
    <div className="w-full bg-blue-200 text-foreground flex flex-col gap-20 pb-20">
      {/* 1. HERO / BANNER SECTION */}
      <section className="relative min-h-[75vh] flex items-center bg-blue-400 justify-center bg-linear-to-b from-warning-50/30 to-transparent px-6 text-center mb-5">
        <div className="max-w-3xl flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warning-100 text-warning-800 text-xs font-semibold">
            <RiSparkling2Line size={14} /> Find Your Forever Companion
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Every Pet Deserves a{" "}
            <span className="text-warning">Loving Home</span>
          </h1>
          <p className="text-lg text-default-500 max-w-xl">
            Browse through hundreds of lovable dogs, cats, birds, and rabbits
            waiting for a second chance. Start your journey toward unconditional
            companionship today.
          </p>
          <div className="flex gap-4 mt-2">
            <Link href={"/allpets"}>
              <Button
                as={Link}
                href="/all-pets"
                size="lg"
                className="font-semibold shadow-lg shadow-warning-200 bg-green-700"
                endContent={<FaArrowRight size={16} />}
              >
                Adopt Now
              </Button>
            </Link>
            <Button
              as={Link}
              href="#why-adopt"
              variant="bordered"
              size="lg"
              className="font-medium"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PETS SECTION (DATABASE PLACEHOLDER) */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <FeaturedCompanions></FeaturedCompanions>
      </section>

      {/* 3. WHY ADOPT PETS SECTION */}
      <section className="bg-emerald-300 shadow-2xl">
        <div id="why-adopt" className="max-w-7xl mx-auto  px-6 w-full py-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Why Choose Adoption?
            </h2>
            <p className="text-default-500 mt-2">
              Adopting shifts the narrative from purchasing to saving lives,
              offering unparalleled benefits for your family and the community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-4 border border-divider shadow-none bg-purple-300">
              <header className="flex gap-4">
                <div className="p-3 rounded-xl bg-danger-50 text-danger">
                  <FaRegHeart size={24} />
                </div>
                <h3 className="text-xl font-semibold">Save a Life</h3>
              </header>
              <div className="text-sm text-default-500">
                Millions of healthy animals face homelessness every year. By
                adopting, you provide a beautiful soul with the safe, stable
                home they completely deserve.
              </div>
            </Card>

            <Card className="p-4 border border-divider shadow-none bg-red-300">
              <header className="flex gap-4">
                <div className="p-3 rounded-xl bg-success-50 text-success">
                  <IoShieldCheckmarkOutline size={24} />
                </div>
                <h3 className="text-xl font-semibold">Healthy & Screened</h3>
              </header>
              <div className="text-sm text-default-500">
                Shelter animals are thoroughly evaluated for temperament, fully
                vaccinated, and checked for safe medical health statuses prior
                to listing.
              </div>
            </Card>

            <Card className="p-4 border border-divider shadow-none bg-orange-300">
              <header className="flex gap-4">
                <div className="p-3 rounded-xl bg-primary-50 text-primary">
                  <FaRegSmileBeam size={24} />
                </div>
                <h3 className="text-xl font-semibold">Fight Puppy Mills</h3>
              </header>
              <div className="text-sm text-default-500">
                Choosing adoption directly ensures illegal, commercial animal
                factories are shut down while heavily supporting humane local
                community networks.
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. EXTRA STATIC 1: HOW THE ADOPTION PROCESS WORKS */}
      <section className="bg-orange-300">
        <div className="bg-default-50 border-y border-divider py-16 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight">
                Simple 4-Step Process
              </h2>
              <p className="text-default-500 mt-2">
                Getting your pet home safely is easy through our secure platform
                pipeline.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  name: "Browse Profiles",
                  desc: "Find a compatible pet based on species, breed, location, or temperament needs.",
                },
                {
                  step: "02",
                  name: "Submit Request",
                  desc: "Fill out a pickup date and a message for validation from our safe portal interface.",
                },
                {
                  step: "03",
                  name: "Shelter Review",
                  desc: "The shelter owner evaluates your profile credentials and application securely.",
                },
                {
                  step: "04",
                  name: "Happy Pickup",
                  desc: "Coordinate safe travel, handle adoption fees, and bring your sweet companion home.",
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-2 relative p-4">
                  <span className="text-5xl font-black text-warning-200 tracking-wider select-none">
                    {item.step}
                  </span>
                  <h4 className="text-lg font-bold text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-sm text-default-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUCCESS STORIES SECTION */}
      <section className="bg-purple-300 shadow-2xl py-10">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Real Success Stories
            </h2>
            <p className="text-default-500 mt-2">
              Heartwarming memories from pet owners who found pure joy through
              our simple application layout.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 bg-default-50/50 border border-divider shadow-none">
              <div className="flex flex-col gap-4">
                <div className="flex gap-1 text-warning">
                  {[...Array(5)].map((_, i) => (
                    <CiStar key={i} size={16} />
                  ))}
                </div>
                <p className="text-default-600 italic text-sm">
                  Finding Milo changed our dynamic completely! The application
                  modal process was entirely seamless. We could easily
                  coordinate pickup dates, check vaccination forms, and
                  coordinate with the shelter seamlessly.
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <RxAvatar size={30} />
                  <div>
                    <h4 className="text-sm font-semibold">Sarah Khan</h4>
                    <p className="text-xs text-default-400">
                      Adopted Milo (Golden Retriever)
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-default-50/50 border border-divider shadow-none">
              <div className="flex flex-col gap-4">
                <div className="flex gap-1 text-warning">
                  {[...Array(5)].map((_, i) => (
                    <CiStar key={i} size={16} />
                  ))}
                </div>
                <p className="text-default-600 italic text-sm">
                  We were worried about adopting a senior cat, but Lunas digital
                  health dashboard sheet was so clean and detailed that it gave
                  us perfect confidence. The private dashboard routes let us
                  monitor approval states immediately.
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <RxAvatar size={30} />
                  <div>
                    <h4 className="text-sm font-semibold">Rahat Mahmud</h4>
                    <p className="text-xs text-default-400">
                      Adopted Luna (Persian Cat)
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. PET CARE TIPS SECTION */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Essential Pet Care Tips
          </h2>
          <p className="text-default-500 mt-2">
            Keep your new best friend healthy, strong, and highly responsive
            after their arrival.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border border-divider shadow-sm">
            <div className="p-5 flex flex-col gap-3">
              <div className="p-2 w-fit rounded-lg bg-warning-50 text-warning">
                <GrCircleInformation size={20} />
              </div>
              <h3 className="text-lg font-bold">Nutritional Balance</h3>
              <p className="text-sm text-default-500">
                Ensure you are matching custom feed schedules to the specific
                breed, size, and health status indicators provided by the
                shelter platform.
              </p>
            </div>
          </Card>

          <Card className="border border-divider shadow-sm">
            <div className="p-5 flex flex-col gap-3">
              <div className="p-2 w-fit rounded-lg bg-warning-50 text-warning">
                <GrCircleInformation size={20} />
              </div>
              <h3 className="text-lg font-bold">Routine Vet Visits</h3>
              <p className="text-sm text-default-500">
                Keep track of pending vaccine deadlines. Schedule check-ups with
                a local veterinarian at least twice a year for comprehensive
                screening.
              </p>
            </div>
          </Card>

          <Card className="border border-divider shadow-sm">
            <div className="p-5 flex flex-col gap-3">
              <div className="p-2 w-fit rounded-lg bg-warning-50 text-warning">
                <GrCircleInformation size={20} />
              </div>
              <h3 className="text-lg font-bold">Mental Stimulation</h3>
              <p className="text-sm text-default-500">
                Dogs, cats, and birds need active enrichment. Regular
                interactive playtime prevents anxiety development and unwanted
                behavioral trends.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 7. EXTRA STATIC 2: COMMUNITY IMPACT METRICS */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <Card className="bg-linear-to-r from-warning-500 to-emerald-500 text-white p-8 md:p-12 shadow-xl border-none">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center items-center">
            <div className="flex flex-col gap-1">
              <span className="text-4xl md:text-5xl font-black">1,200+</span>
              <span className="text-warning-100 font-medium text-sm uppercase tracking-wide">
                Successful Adoptions
              </span>
            </div>
            <div className="flex flex-col gap-1 border-y sm:border-y-0 sm:border-x border-white/20 py-4 sm:py-0">
              <span className="text-4xl md:text-5xl font-black">450+</span>
              <span className="text-warning-100 font-medium text-sm uppercase tracking-wide">
                Registered Shelters
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl md:text-5xl font-black">99.8%</span>
              <span className="text-warning-100 font-medium text-sm uppercase tracking-wide">
                Safe Placement Rate
              </span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
