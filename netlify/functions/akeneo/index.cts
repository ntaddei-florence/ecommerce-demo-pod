import type { Config } from "@netlify/functions";

const akeneoWebhook = async (req: Request) => {
  if (req.method !== "PATCH") {
    return new Response(null, { status: 405 });
  }

  let requestBody: object;

  try {
    requestBody = await req.json();
  } catch (e) {
    requestBody = {
      error: "Request body not found.",
    };
  }

  return Response.json({ requestBody });
};

export default akeneoWebhook;

export const config: Config = {
  method: "PATCH",
};
