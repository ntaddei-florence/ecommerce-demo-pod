"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { CookiesProvider } from "next-client-cookies";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { LogoutButton } from "./logout-button";

export interface UserProfileDropdownProps {
  cookies: Array<{ name: string; value: string }>;
}

export const UserProfileDropdown: FC<UserProfileDropdownProps> = ({ cookies }) => {
  const { user, error, isLoading } = useUser();

  return (
    <CookiesProvider value={cookies}>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 mask mask-squircle !inline-flex justify-center items-center">
            {isLoading ? (
              <span className="loading loading-spinner text-accent loading-lg" />
            ) : user?.picture ? (
              <Image src={user.picture} width={60} height={60} alt="profile picture" />
            ) : (
              <UserCircleIcon width={28} />
            )}
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg border border-gray-100 w-52"
        >
          {user ? (
            <>
              <li>
                <Link href="/profile">
                  <p title={user.name ?? ""} className="truncate">
                    {user.name}
                  </p>
                </Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          ) : error ? (
            <li>Error</li>
          ) : (
            <li>
              <a href="/api/auth/login">Login</a>
            </li>
          )}
        </ul>
      </div>
    </CookiesProvider>
  );
};
