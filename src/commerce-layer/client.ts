import authentication from "@commercelayer/js-auth";
import { CommerceLayer } from "@commercelayer/sdk";

export async function getIntegrationToken() {
  const token = await authentication("client_credentials", {
    slug: process.env.NEXT_COMMERCELAYER_SLUG!,
    clientId: process.env.NEXT_CL_INTEGRATION_CLIENT_ID!,
    clientSecret: process.env.NEXT_CL_INTEGRATION_SECRET!,
    scope: process.env.NEXT_COMMERCELAYER_SCOPE,
  });
  return token.accessToken;
}

export async function getSalesChannelToken(clientId?: string) {
  const token = await authentication("client_credentials", {
    slug: process.env.NEXT_COMMERCELAYER_SLUG!,
    clientId: clientId ?? process.env.NEXT_COMMERCELAYER_CLIENT_ID!,
    scope: process.env.NEXT_COMMERCELAYER_SCOPE,
  });
  return token.accessToken;
}

export async function getCommerceLayerClient() {
  const token = await getIntegrationToken();
  return CommerceLayer({
    accessToken: token,
    organization: process.env.NEXT_COMMERCELAYER_SLUG!,
  });
}
