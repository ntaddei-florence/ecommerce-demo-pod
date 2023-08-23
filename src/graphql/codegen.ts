
import type { CodegenConfig } from '@graphql-codegen/cli';

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV ?? "local"}`,
});

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [process.env.GRAPHQL_URL!]: {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    }
  },
  documents: "src/**/*.graphql",
  generates: {
    "src/graphql/generated/": {
      preset: 'client',
    },
  },
};

export default config;
