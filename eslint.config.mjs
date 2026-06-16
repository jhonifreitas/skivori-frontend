import pluginQuery from '@tanstack/eslint-plugin-query';
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...pluginQuery.configs['flat/recommended'],
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          "selector": "typeLike",
          "format": ["PascalCase"]
        },
        {
          "selector": "typeAlias",
          "format": ["PascalCase"],
          "prefix": ["T"]
        },
        {
          "selector": "typeParameter",
          "format": ["PascalCase"],
          "prefix": ["T"]
        },
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "prefix": ["I"]
        },
        {
          "selector": "enum",
          "format": ["UPPER_CASE", "PascalCase"],
          "trailingUnderscore": "allow"
        },
        {
          "selector": "enumMember",
          "format": ["UPPER_CASE", "PascalCase"],
          "trailingUnderscore": "allow"
        }
      ]
    },
  }
]);

export default eslintConfig;
