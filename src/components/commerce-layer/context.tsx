"use client";

import { authentication } from "@commercelayer/js-auth";
import { CommerceLayer, OrderContainer, OrderStorage } from "@commercelayer/react-components";
import { FC, PropsWithChildren, useEffect, useState } from "react";

import { CL_ACCESS_TOKEN_KEY, CL_PERSIST_KEY } from "./constants";

const clientId = process.env.NEXT_COMMERCELAYER_CLIENT_ID!;
const endpoint = process.env.NEXT_COMMERCELAYER_ENDPOINT!;
const slug = process.env.NEXT_COMMERCELAYER_SLUG!;
const scope = process.env.NEXT_COMMERCELAYER_SCOPE!;

const options = {
  clientId,
  slug,
  scope,
};

export const CommerceLayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const existingToken = window.localStorage.getItem(CL_ACCESS_TOKEN_KEY);
    if (existingToken) {
      setAccessToken(existingToken);
    } else {
      authentication("client_credentials", options).then(({ accessToken: token }) => {
        window.localStorage.setItem(CL_ACCESS_TOKEN_KEY, token);
        setAccessToken(token);
      });
    }
  }, []);

  if (!accessToken) return children;

  return (
    <CommerceLayer accessToken={accessToken} endpoint={endpoint}>
      <OrderStorage persistKey={CL_PERSIST_KEY}>
        <OrderContainer
          attributes={{
            cart_url: "/cart",
            return_url: "/return",
            privacy_url: "/privacy",
          }}
        >
          {/* CommerceLayer wants a "DefaultChildrenType" that I'm not able to import */}
          {children as any}
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  );
};
