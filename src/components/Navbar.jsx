"use client";
import { useState } from "react";
import { Link, Button, Avatar, Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ThemeSwitch } from "./ThemeSwitch";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  // //console.log(user);

  if (isPending) {
    return (
      <div className="flex items-center justify-center w-8 h-8">
        <Spinner size="sm" color="warning" />
      </div>
    );
  }

  return (
    <div>
      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/30 backdrop-blur-lg">
        <header className="flex h-16 items-center justify-around px-6">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <div className="text-2xl font-bold">
              Pet{" "}
              <span className="text-3xl font-bold text-orange-400">Nest</span>
            </div>
          </div>
          <ul className="hidden items-center gap-4 md:flex">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/allpets">All Pets</Link>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            {user ? (
              // AUTHENTICATED STATE: Logged-in controls displayed inline
              <div className="flex items-center">
                <div className="rounded-full border-2 border-red-500">
                  <Image
                    src={user?.image}
                    width={30}
                    height={30}
                    alt="userimage"
                    className="rounded-full"
                  />
                </div>
                {/* 2. Dashboard Navigation Button */}
                <Link href="/dashboard">
                  <Button
                    variant="flat"
                    color="warning"
                    size="sm"
                    className="font-semibold"
                  >
                    Dashboard
                  </Button>
                </Link>

                {/* 3. Logout Action Button */}
                <Button
                  color="danger"
                  variant="light"
                  size="sm"
                  className="font-semibold"
                  onClick={async () => {
                    await authClient.signOut();
                    window.location.href = "/";
                  }}
                >
                  Log Out
                </Button>
              </div>
            ) : (
              // UNAUTHENTICATED STATE: Guest fallback layout
              <>
                {/* 1. Default Placeholder Avatar */}
                <RxAvatar size={28} />

                {/* 2. Authentication Links */}
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            <div>
              <ThemeSwitch></ThemeSwitch>
            </div>
          </div>
        </header>
        {isMenuOpen && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-2 p-4">
              <li>
                <Link href="/" className="block py-2">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/allpets" className="block py-2">
                  All Pets
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
