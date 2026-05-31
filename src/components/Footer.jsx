// "use client";

import React from "react";
import Link from "next/link";
import { Link as HeroLink } from "@heroui/react";
// Assumes Gravity Icons are imported via their standard package names (e.g., @gravity-ui/icons)
import {
  Envelope,
  Handset,
  MapPin,
  LogoFacebook,
  LogoLinkedin,
} from "@gravity-ui/icons";
import { IoPawSharp } from "react-icons/io5";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-divider text-default-600 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-foreground font-bold text-2xl tracking-tight">
            {/* <LogoPaws className="text-warning text-2xl" /> */}
            <IoPawSharp className="text-warning text-2xl" />
            <span>PetAdopt</span>
          </div>
          <p className="text-sm text-default-500 max-w-xs leading-relaxed">
            Connecting lovable pets with caring families. Find your new best
            friend today and give them the forever home they deserve.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Contact Us
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-2 text-default-500">
              <Envelope className="text-default-400" size={16} />
              <span>support@petadopt.com</span>
            </li>
            <li className="flex items-center gap-2 text-default-500">
              <Handset className="text-default-400" size={16} />
              <span>+880 1234-567890</span>
            </li>
            <li className="flex items-center gap-2 text-default-500">
              <MapPin className="text-default-400" size={16} />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

        {/* Social Links Section */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Follow Our Journey
          </h4>
          <p className="text-sm text-default-500">
            Stay updated with adoption stories and helpful pet care tips.
          </p>
          <div className="flex items-center gap-3">
            <HeroLink
              isExternal
              href="https://facebook.com"
              className="p-2.5 rounded-full bg-default-100 text-default-600 hover:bg-warning hover:text-warning-foreground transition-all"
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
            </HeroLink>
            <HeroLink
              isExternal
              href="https://twitter.com"
              className="p-2.5 rounded-full bg-default-100 text-default-600 hover:bg-warning hover:text-warning-foreground transition-all"
              aria-label="Twitter"
            >
              <FaXTwitter size={18} />
            </HeroLink>
            <HeroLink
              isExternal
              href="https://instagram.com"
              className="p-2.5 rounded-full bg-default-100 text-default-600 hover:bg-warning hover:text-warning-foreground transition-all"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </HeroLink>
            <HeroLink
              isExternal
              href="https://linkedin.com"
              className="p-2.5 rounded-full bg-default-100 text-default-600 hover:bg-warning hover:text-warning-foreground transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </HeroLink>
          </div>
        </div>
      </div>

      {/* Copyright Divider & Text */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-divider flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-default-400">
        <p>
          &copy; {new Date().getFullYear()} PetAdopt Platform. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
