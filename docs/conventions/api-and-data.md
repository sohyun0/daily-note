# API & 데이터 컨벤션

## 1. API 폴더 구조

- API 호출 함수는 **실제 백엔드 API 엔드포인트(도메인) 구조대로 폴더링**하고 파일명은 `index.ts`로 둔다.
  - 특정 기능 전용 API: `src/features/<기능명>/api/<도메인>/index.ts`
  - 여러 기능에서 공용으로 쓰는 API 또는 공통 클라이언트: `src/shared/lib/` 또는 `src/features/<기능명>/api/`
  - 예: `/api/users` 관련 → `api/users/index.ts`, `/api/articles` 관련 → `api/articles/index.ts`

## 2. API 함수 네이밍 & 선언

- HTTP 메서드 프리픽스(`get`, `post`, `put`, `patch`, `delete`) + 대상 이름으로 짓고 **화살표 함수**로 선언한다.

```ts
// api/articles/index.ts
import type { ArticleDetail, UpdateArticlePayload } from "../../types/articles";

export const getArticleDetail = async (
  articleId: string,
): Promise<ArticleDetail> => {
  // ...
};

export const postArticleDetail = async (payload: UpdateArticlePayload) => {
  // ...
};

export const patchArticleDetail = async (
  articleId: string,
  payload: Partial<UpdateArticlePayload>,
) => {
  // ...
};

export const deleteArticleDetail = async (articleId: string) => {
  // ...
};
```

## 3. React Query (`@tanstack/react-query`) 규칙

- 서버 상태는 `@tanstack/react-query`로 관리한다.
- Query Key는 하드코딩하지 않고, 해당 feature 내부(예: `hooks/` 또는 `api/`)에서 상수/팩토리로 한곳에 모아 관리한다.
- 커스텀 쿼리 훅은 `hooks/use<Name>/index.ts`에 화살표 함수로 작성한다.

```ts
// features/note/hooks/useArticleDetail/index.ts
import { useQuery } from "@tanstack/react-query";

import { getArticleDetail } from "../../api/articles";

export const ARTICLE_QUERY_KEYS = {
  all: ["articles"] as const,
  detail: (articleId: string) =>
    [...ARTICLE_QUERY_KEYS.all, articleId] as const,
};

export const useArticleDetail = (articleId: string) => {
  return useQuery({
    queryKey: ARTICLE_QUERY_KEYS.detail(articleId),
    queryFn: () => getArticleDetail(articleId),
  });
};
```

## 4. Server Action

- Next.js Server Action 파일은 예외적으로 `camelCase.ts` 파일명을 사용한다. (예: `cache.ts`, `noteActions.ts`)
- 파일 최상단 첫 줄에 `'use server'`를 선언하고, 함수는 화살표 함수 또는 `async` 함수로 export 한다.

## 관련 문서

- [폴더 구조](./folder-structure.md)
- [네이밍 컨벤션](./naming.md)
- [코딩 스타일](./coding-style.md)
- [컨벤션 목차](../../AGENTS.md)
