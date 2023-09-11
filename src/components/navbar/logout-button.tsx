"use client";

import { FC } from "react";

import { useOnClientLogout } from "~/hooks/use-on-client-logout";

export const LogoutButton: FC = () => {
  const onLogout = useOnClientLogout();
  return <button onClick={onLogout}>Logout</button>;
};
