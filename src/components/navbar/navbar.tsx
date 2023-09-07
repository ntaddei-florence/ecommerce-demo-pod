import { Order } from "@commercelayer/sdk";
import Link from "next/link";
import { FC } from "react";

import { ShoppingCartDropdown } from "./shopping-cart-dropdown";
import { UserProfileDropdown } from "./user-profile-dropdown";

export interface NavbarProps {
  cart: Order | null;
}

export const Navbar: FC<NavbarProps> = ({ cart }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        {/* Logo */}
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          {/* Site name */}
          Ecommerce
        </Link>
      </div>
      <div className="flex-none flex gap-3">
        <ShoppingCartDropdown
          amountInCents={9900}
          currency="€"
          itemsCount={cart?.line_items?.length ?? 0}
        />
        <UserProfileDropdown />
      </div>
    </div>
  );
};
