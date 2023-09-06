"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export interface UserProfileDropdownProps {}

export const UserProfileDropdown: FC<UserProfileDropdownProps> = ({}) => {
  const { user, error, isLoading } = useUser();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {isLoading ? (
            <span className="loading loading-spinner text-accent loading-lg" />
          ) : user?.picture ? (
            <Image src={user.picture} width={60} height={60} alt="profile picture" />
          ) : (
            <UserCircleIcon className="w-full h-full" />
          )}
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {user ? (
          <>
            <li>
              <Link href="/profile" className="justify-between">
                {user.name}
              </Link>
            </li>
            <li>
              <a href="/api/auth/logout">Logout</a>
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
  );
};
