"use server";

import { getSession } from "@auth0/nextjs-auth0";
import { CommerceLayerClient } from "@commercelayer/sdk";

export async function getCommerceLayerCustomer(client: CommerceLayerClient) {
  const session = await getSession();
  const email = session?.user.email;
  if (!email) return null;
  const customers = await client.customers.list({ filters: { email_eq: email } });
  return customers[0] ?? null;
}
