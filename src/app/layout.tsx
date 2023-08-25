import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Navbar } from "~/components/navbar/navbar";
import { ApolloWrapper } from "~/graphql/apollo-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ecommerce demo pod",
  description: "ecommerce demo pod",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <ApolloWrapper>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
