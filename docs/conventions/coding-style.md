# 코딩 스타일 & 컴포넌트 컨벤션

## 1. 함수 작성 스타일

- **페이지 / 컴포넌트 함수**: 함수 선언문(`function Comp() {}`)을 사용한다.
- **그 외 모든 함수 (훅, 유틸리티, API, 핸들러 등)**: 화살표 함수(`const fn = () => {}`)를 사용한다.

```tsx
// 컴포넌트: 함수 선언문
export default function NoteCard({ title, isLocked }: NoteCardProps) {
  // 핸들러 / 내부 함수: 화살표 함수
  const handleCardClick = () => {
    // ...
  };

  return <article onClick={handleCardClick}>{title}</article>;
}

// 훅 / 유틸 / API: 화살표 함수
export const useNoteDetail = (noteId: string) => {
  // ...
};
```

## 2. TypeScript 규칙

- `tsconfig.json`의 **`strict: true`** 모드를 사용한다.
- **`any` 사용을 금지**한다 (`@typescript-eslint/no-explicit-any: "error"`). 타입을 알 수 없는 경우 `unknown`으로 받고 타입 가드로 좁혀서 사용한다.
- 객체 형태 정의는 **`interface`를 우선** 사용한다. `type`은 유니온(`|`), 교차(`&`), 유틸리티 타입 조합 시에만 사용한다.
- 컴포넌트의 **Props `interface`는 같은 파일, 컴포넌트 함수 바로 위에 선언**한다.
- 여러 곳에서 동일하게 반복 사용되는 타입은 `types/` 폴더(`features/<기능명>/types/` 또는 `shared/types/`)로 분리해 공유한다.
- 타입만 가져올 때는 반드시 `import type`을 사용한다 (`@typescript-eslint/consistent-type-imports`).

```tsx
interface NoteCardProps {
  title: string;
  isLocked?: boolean;
}

export default function NoteCard({ title, isLocked = false }: NoteCardProps) {
  // ...
}
```

## 3. 컴포넌트 구조

- `'use client'` 지시어는 필요한 경우 **파일 최상단 첫 줄**에만 작성한다.
- 컴포넌트는 **폴더 단위**로 관리한다:
  - `ComponentName/index.tsx` (컴포넌트 본체)
  - `ComponentName/index.module.scss` (스타일)
  - `ComponentName/index.test.tsx` (테스트)
  - `ComponentName/index.stories.tsx` (Storybook 스토리)
- **Props destructuring은 함수 파라미터에서** 바로 수행한다.
- 중첩 삼항 연산자나 복잡한 조건부 렌더링 대신 **Early Return**을 우선 활용한다.

```tsx
"use client";

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
}

export default function NoteList({ notes, isLoading }: NoteListProps) {
  if (isLoading) {
    return <Skeleton />;
  }

  if (notes.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  );
}
```

## 4. 가독성 규칙

- **매직 넘버 금지**: 의미 있는 숫자는 `UPPER_SNAKE_CASE` 상수로 선언해 사용한다.
  ```ts
  // Bad
  if (members.length >= 5) { ... }

  // Good
  const MAX_MEMBERS = 5;
  if (members.length >= MAX_MEMBERS) { ... }
  ```
- **복잡한 조건식 변수화**: 조건식이 길거나 논리 연산자가 섞이면 `is`/`has`로 시작하는 boolean 변수로 추출한다.
  ```ts
  // Bad
  if ((a && b) || c) { ... }

  // Good
  const isEligible = (a && b) || c;
  if (isEligible) { ... }
  ```

## 5. Import 순서 (`eslint-plugin-simple-import-sort` 자동 정렬)

그룹 사이에 빈 줄을 두고 아래 5단계 순서를 지킨다.
에디터 저장(`Ctrl+S` / `Cmd+S`) 및 커밋(`lint-staged`) 시 `eslint --fix`가 자동으로 이 순서대로 정렬한다.

1. **React / Next.js** (`react`, `next/*`)
2. **외부 라이브러리** (`@tanstack/*`, `zustand`, `zod`, `axios` 등)
3. **내부 모듈** (`@/features/*`, `@/shared/*` 등)
4. **상대 경로** (`./`, `../` 및 `./index.module.scss`)
5. **타입 import** (`import type ...`)

```tsx
import { useState } from "react";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/shared/components/Button";

import styles from "./index.module.scss";

import type { Note } from "../../types/notes";
```

## 관련 문서

- [폴더 구조](./folder-structure.md)
- [네이밍 컨벤션](./naming.md)
- [API / 데이터 컨벤션](./api-and-data.md)
- [컨벤션 목차](../../AGENTS.md)
