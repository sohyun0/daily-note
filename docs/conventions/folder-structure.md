# 폴더 구조 컨벤션

기능 단위를 기본으로 하고, FSD(Feature-Sliced Design)의 핵심 규칙 하나만 차용한다.

## 전체 구조

```
src/
├─ app/                      # Next.js 라우팅 전용. 얇게 유지하고 화면 로직은 features 에서 가져온다.
├─ features/                 # 기능(메뉴) 단위
│  └─ <기능명>/              # 예) note, calendar, userProfile (camelCase)
│     ├─ api/                # 해당 기능의 API 호출 함수 (실제 API 구조대로 도메인 폴더)
│     │  └─ <도메인>/index.ts
│     ├─ components/         # 해당 기능 전용 컴포넌트
│     │  └─ <ComponentName>/ # 컴포넌트 폴더 (PascalCase)
│     │     ├─ index.tsx
│     │     ├─ index.module.scss
│     │     ├─ index.test.tsx
│     │     └─ index.stories.tsx
│     ├─ hooks/              # 해당 기능 전용 훅 (react-query 훅 포함)
│     │  └─ <useHookName>/index.ts
│     ├─ types/              # 해당 기능 전용 공유 타입
│     │  └─ <도메인>/index.ts
│     ├─ actions/            # Server Action (camelCase.ts)
│     └─ index.ts            # 외부에 공개할 것만 export (public API)
└─ shared/                   # 모든 기능이 함께 쓰는 공용 코드
   ├─ components/  ├─ hooks/  ├─ lib/  ├─ styles/  ├─ types/  └─ providers/
```

`app/` 의 `page.tsx`, `layout.tsx` 등 Next.js 예약 파일은 예외로 그대로 둔다.

## 핵심 규칙 (ESLint 로 자동 검사됨)

1. **`features` 끼리는 서로 import 하지 않는다.** 두 기능이 같이 쓰는 코드는 `shared` 로 올린다.
2. **`shared` 는 `features`, `app` 을 import 하지 않는다.** 의존 방향은 `app → features → shared` 한 방향이다.
3. 같은 feature 내부에서는 **상대 경로**(`./`, `../`)를 쓰고, 다른 계층은 `@/` 별칭을 쓴다.
4. feature 밖에서는 해당 feature 의 `index.ts` 로만 가져온다. 내부 파일을 직접 import 하지 않는다.
5. `app/` 의 `page.tsx` 에는 라우팅과 데이터 연결만 두고, UI 로직은 `features` 로 위임한다.

## 폴더 단위 관리 규칙

- 컴포넌트, 훅, API, 타입은 모두 **폴더 단위**로 만들고 파일명은 `index.tsx` / `index.ts` 로 한다.
- 컴포넌트 폴더에는 구현(`index.tsx`), 스타일(`index.module.scss`), 테스트(`index.test.tsx`), 스토리(`index.stories.tsx`)를 함께 둔다.
- 폴더 이름이 곧 모듈 이름이므로 컴포넌트는 `PascalCase`, 훅은 `useXxx` 로 짓는다. (세부 규칙은 [naming.md](./naming.md))
- Server Action 은 예외로 `camelCase.ts` 파일을 쓴다. (예: `cache.ts`)

## 타입 공유

- 한 파일 안에서만 쓰는 타입은 그 파일에 둔다. (컴포넌트 Props 는 컴포넌트 바로 위)
- 같은 타입을 여러 곳에서 반복해서 쓰면 `types/` 폴더로 올려 공유한다.
  - 한 기능 안에서만 쓰면 `features/<기능명>/types/`
  - 여러 기능에서 쓰면 `shared/types/`

## 관련 문서

- [네이밍 컨벤션](./naming.md)
- [API / 데이터 컨벤션](./api-and-data.md)
- [코딩 스타일](./coding-style.md)
- [컨벤션 목차](../../AGENTS.md)
