import type { Config, Context } from "@netlify/functions";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, context: Context) => {
  console.log(req);
  console.log(context);
  return Response.json({ data: "Hello World!" });
};

// export default syncAlgolia;

export const config: Config = {
  method: "PATCH",
  // path: "/algolia/push/contentful",
};
