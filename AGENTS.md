<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 하루노트 (DAILY NOTE) 프로젝트 컨벤션 허브

사람과 AI 에이전트 모두 코드를 작성하거나 수정하기 전에 반드시 아래 컨벤션 문서를 확인하고 준수한다.
하나의 파일이 비대해지는 것을 막기 위해 주제별로 문서를 분리해 관리한다.

## 세부 컨벤션 문서 목록 (필독)

1. **[폴더 구조 컨벤션](./docs/conventions/folder-structure.md)**
   - 기능 단위(`src/features/<기능명>`) + `src/shared` 구조 및 FSD 단방향 의존 규칙 (`app → features → shared`)
   - 컴포넌트/훅/API/타입의 폴더 단위(`index.tsx`, `index.ts`) 관리 및 타입 공유 기준
2. **[네이밍 컨벤션](./docs/conventions/naming.md)**
   - 변수(`camelCase`), 상수(`UPPER_SNAKE_CASE`), 컴포넌트(`PascalCase`), 일반/복합 폴더(`lowercase` / `camelCase`)
   - 핸들러(`handle` + 대상 + 행동), API 함수(`get`/`post`/`put`/`patch`/`delete` + 대상), boolean(`is` 우선, 불가피 시 `has`), 이미지(`ic` / `img` 프리픽스)
3. **[코딩 스타일 & 컴포넌트 컨벤션](./docs/conventions/coding-style.md)**
   - 함수 스타일: 페이지/컴포넌트는 `function Comp() {}`, 그 외(훅/유틸/API/핸들러)는 화살표 함수
   - TypeScript: `strict` 모드, `any` 금지(`unknown` + 타입 가드), `interface` 우선, Props `interface`는 컴포넌트 바로 위 선언
   - 컴포넌트: 최상단 `'use client'`, 파라미터 destructuring, Early Return, 매직 넘버/복잡 조건 상수·변수화, 5단계 Import 순서
4. **[API & 데이터 컨벤션](./docs/conventions/api-and-data.md)**
   - 실제 백엔드 API 도메인 구조대로 폴더링(`api/users/index.ts`), Server Action(`camelCase.ts`), `@tanstack/react-query` 쿼리 키 관리
5. **[Git / 브랜치 / 커밋 / PR / CI 컨벤션](./docs/conventions/git-workflow.md)**
   - 브랜치: `main`(배포), `develop`(기본 개발), `{기능종류}/#{이슈번호}-{작업설명}` (예: `feat/#10-ci-workflow`)
   - 커밋 & PR 제목: `타입: #이슈번호 한글 상세 설명` (15자 이상, 무엇을/왜/어떻게 수정했는지 길게 작성)
   - PR 본문 이슈 연결(`Closed #이슈번호`, `Related #이슈번호`) 및 GitHub Actions CI 검증 게이트

## 개발 환경 요약

- **Node.js**: `24.x` 고정 (`.nvmrc`, `package.json` `engines`)
- **패키지 매니저**: `npm` (`npm ci` 기준)
- **필수 로컬 검증 명령**: `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm test`, `npm run build`
