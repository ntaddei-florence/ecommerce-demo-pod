import type { CodegenConfig } from "@graphql-codegen/cli";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({
  path: `.env.${process.env.NODE_ENV ?? "local"}`,
});

const codegenConfig: CodegenConfig = {
  overwrite: true,
  schema: {
    [process.env.GRAPHQL_URL!]: {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    },
  },
  documents: "src/**/*.graphql",
  generates: {
    "src/graphql/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default codegenConfig;
