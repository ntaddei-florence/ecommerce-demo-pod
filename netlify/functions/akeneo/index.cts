import type { Config, Context } from "@netlify/functions";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, context: Context) => {
  console.log(req);
  console.log(context);
  // if (req.method !== "PATCH") {
  //   return new Response(null, { status: 405 });
  // }
  return Response.json({ requestBody: await req.json() });
};

// export default syncAlgolia;

export const config: Config = {
  method: "PATCH",
  // path: "/akeneo/pluto",
  // path: "/algolia/push/contentful",
};
