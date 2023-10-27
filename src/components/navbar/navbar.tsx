"use client";

import { Order } from "@commercelayer/sdk";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { ShoppingCartDropdown } from "./shopping-cart-dropdown";
import { UserProfileDropdown } from "./user-profile-dropdown";
import { useScrollY } from "~/hooks/use-scroll-y";

export interface NavbarProps {
  cart: Order | null;
  cookies: Array<{ name: string; value: string }>;
}

export const Navbar: FC<NavbarProps> = ({ cart, cookies }) => {
  const scrollY = useScrollY();
  const pathname = usePathname();

  const isScrolled = scrollY > 0 || pathname === "/";

  return (
    <div
      className={clsx(
        "navbar sticky top-0 z-30 hover:bg-base-100",
        "transition ease-in-out duration-300",
        { "bg-base-100 shadow-lg": isScrolled }
      )}
    >
      <div className="flex-1">
        {/* Logo */}
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          {/* Site name */}
          My E-Commerce
        </Link>
      </div>
      <div className="flex-none flex gap-3">
        <ShoppingCartDropdown cart={cart} />
        <UserProfileDropdown cookies={cookies} />
      </div>
    </div>
  );
};
