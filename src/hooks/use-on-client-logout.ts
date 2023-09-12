import { useCookies } from "next-client-cookies";
import { useCallback } from "react";

import { CART_ID_COOKIE_KEY } from "~/commerce-layer/constants";

export function useOnClientLogout() {
  const clientCookies = useCookies();

  return useCallback(() => {
    clientCookies.remove(CART_ID_COOKIE_KEY);
    window.location.href = "/api/auth/logout";
  }, [clientCookies]);
}
