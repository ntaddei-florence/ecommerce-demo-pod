"use server";

import { getSession } from "@auth0/nextjs-auth0";
import { CommerceLayerClient } from "@commercelayer/sdk";

export async function getOrCreateCommerceLayerCustomer(client: CommerceLayerClient) {
  const session = await getSession();
  const email = session?.user.email;
  if (!email) return null;

  const customers = await client.customers.list({ filters: { email_eq: email } });
  if (customers.length) return customers[0];

  const newCustomer = await client.customers.create({
    email,
    password: Math.random().toString(36).slice(-8),
  });

  return newCustomer;
}
