// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import simpleImportSort from "eslint-plugin-simple-import-sort";
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "storybook-static/**",
    "next-env.d.ts",
  ]),
  ...storybook.configs["flat/recommended"],
  // TypeScript 컨벤션 및 5단계 Import 자동 정렬 규칙
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/stories/**"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. React / Next.js (타입 import 제외)
            ["^(react|next)(/.*)?(?<!\\u0000)$"],
            // 2. 외부 라이브러리 (node:, @패키지, 일반 패키지 - 타입 import 제외)
            ["^(node:)?@?\\w.*(?<!\\u0000)$"],
            // 3. 내부 모듈 (@/... - 타입 import 제외)
            ["^@/.*(?<!\\u0000)$"],
            // 4. 상대 경로 (./, ../) 및 스타일/사이드이펙트 import (타입 import 제외)
            ["^\\u0000", "^\\..*(?<!\\u0000)$"],
            // 5. 타입 import (import type ...)
            ["\\u0000$"],
          ],
        },
      ],
    },
  },
  // 폴더 경계 규칙 (FSD 핵심 규칙 차용)
  // features 끼리는 서로 import 하지 않는다. 공용 코드는 shared 로 올린다.
  // 같은 feature 내부는 상대 경로(./, ../)로 import 한다.
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*", "@/features/**"],
              message:
                "features 끼리는 import 할 수 없습니다. 공용 코드는 src/shared 로 옮기고, 같은 feature 안에서는 상대 경로를 사용하세요.",
            },
            {
              group: ["@/app/*", "@/app/**"],
              message: "features 는 app 계층을 import 할 수 없습니다.",
            },
          ],
        },
      ],
    },
  },
  // shared 는 가장 하위 계층이므로 features / app 을 import 할 수 없다.
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*", "@/features/**", "@/app/*", "@/app/**"],
              message: "shared 는 features, app 을 import 할 수 없습니다.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
