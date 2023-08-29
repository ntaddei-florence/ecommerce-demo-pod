"use client";

import { authentication } from "@commercelayer/js-auth";
import { CommerceLayer } from "@commercelayer/react-components";
import { FC, PropsWithChildren, useEffect, useState } from "react";

const clientId = process.env.NEXT_COMMERCELAYER_CLIENT_ID!;
const endpoint = process.env.NEXT_COMMERCELAYER_ENDPOINT!;
const slug = process.env.NEXT_COMMERCELAYER_SLUG!;
const scope = process.env.NEXT_COMMERCELAYER_SCOPE!;

const options = {
  clientId,
  slug,
  scope,
};

const accessTokenKey = "@CommerceLayerAccessToken";

export const CommerceLayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const existingToken = window.localStorage.getItem(accessTokenKey);
    if (existingToken) {
      setAccessToken(existingToken);
    } else {
      authentication("client_credentials", options).then(({ accessToken: token }) => {
        window.localStorage.setItem(accessTokenKey, token);
        setAccessToken(token);
      });
    }
  }, []);

  if (!accessToken) return null;

  return (
    <CommerceLayer accessToken={accessToken} endpoint={endpoint}>
      {/* CommerceLayer wants a "DefaultChildrenType" that I'm not able to import */}
      {children as any}
    </CommerceLayer>
  );
};
