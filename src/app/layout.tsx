import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";

import "./globals.css";
import { getCommerceLayerCart, getCommerceLayerClient } from "~/commerce-layer";
import { Navbar } from "~/components/navbar/navbar";
import { ApolloWrapper } from "~/graphql/apollo-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ecommerce demo pod",
  description: "ecommerce demo pod",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const clClient = await getCommerceLayerClient();
  const cart = await getCommerceLayerCart(clClient);

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ApolloWrapper>
            <Navbar cart={cart} />
            <main className="flex min-h-screen flex-col items-center justify-between">
              {children}
            </main>
          </ApolloWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
