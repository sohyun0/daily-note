<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 하루노트(DAILY NOTE) 프로젝트 컨벤션

사람과 AI 모두 이 규칙을 따른다. 규칙을 바꿀 때는 이 문서를 먼저 수정한다.

## 1. 폴더 컨벤션

기능 단위를 기본으로 하고, FSD(Feature-Sliced Design)의 핵심 규칙 하나만 차용한다.

```
src/
├─ app/            # Next.js 라우팅 전용. 얇게 유지하고 화면 로직은 features 에서 가져온다.
├─ features/       # 기능(메뉴) 단위 폴더
│  └─ <기능명>/
│     ├─ components/   # 해당 기능 전용 컴포넌트
│     ├─ hooks/        # 해당 기능 전용 훅 (react-query 훅 포함)
│     ├─ api/          # 해당 기능 API 호출 함수
│     ├─ types/        # 해당 기능 타입
│     └─ index.ts      # 외부에 공개할 것만 export (public API)
└─ shared/         # 모든 기능이 함께 쓰는 공용 코드
   ├─ components/  ├─ hooks/  ├─ lib/  ├─ styles/  ├─ types/  └─ providers/
```

### 핵심 규칙 (ESLint 로 자동 검사됨)

1. **`features` 끼리는 서로 import 하지 않는다.** 두 기능이 같이 쓰는 코드는 `shared` 로 올린다.
2. **`shared` 는 `features`, `app` 을 import 하지 않는다.** 의존 방향은 `app → features → shared` 한 방향이다.
3. 같은 feature 내부에서는 **상대 경로**(`./`, `../`)를 쓰고, 다른 계층은 `@/` 별칭을 쓴다.
4. feature 밖에서는 해당 feature 의 `index.ts` 로만 가져온다. 내부 파일을 직접 import 하지 않는다.
5. `app/` 의 `page.tsx` 에는 라우팅과 데이터 연결만 두고, UI 로직은 `features` 로 위임한다.

### 네이밍

- 폴더/파일: 컴포넌트 파일은 `PascalCase.tsx`, 그 외는 `camelCase.ts`, 폴더는 `kebab-case`.
- 스타일: 컴포넌트와 같은 폴더에 `Component.module.scss` 로 둔다.
- Storybook: 컴포넌트와 같은 폴더에 `Component.stories.tsx` 로 둔다.

## 2. 커밋 컨벤션

형식: `타입: 한글 설명` (프리픽스만 영어, 설명은 **반드시 한글**)

```
fix: 노트 목록 기능에서 데이터가 비어 있을 때 오류가 발생하여 기본값을 추가하도록 수정함
```

- 설명은 짧게 줄이지 말고, **무엇을 왜 어떻게 바꿨는지** 길게 풀어서 쓴다. (15자 이상 강제)
- 필요하면 본문(두 번째 문단 이후)에 배경과 영향 범위를 더 적는다.
- 하나의 커밋에는 하나의 목적만 담는다.
- 마침표는 생략해도 된다.

| 타입       | 용도                                |
| ---------- | ----------------------------------- |
| `feat`     | 새로운 기능 추가                    |
| `fix`      | 버그 수정                           |
| `docs`     | 문서 수정                           |
| `style`    | 코드 동작과 무관한 포맷/스타일 수정 |
| `refactor` | 동작 변경 없는 구조 개선            |
| `perf`     | 성능 개선                           |
| `test`     | 테스트 추가/수정                    |
| `chore`    | 빌드/설정/패키지 등 기타 작업       |
| `build`    | 빌드 시스템, 의존성 변경            |
| `ci`       | CI 설정 변경                        |
| `revert`   | 이전 커밋 되돌리기                  |

`husky` + `commitlint` 가 커밋 시 형식을 자동 검사하고, `lint-staged` 가 스테이징된 파일을 `prettier`/`eslint` 로 정리한다.

## 3. 브랜치 컨벤션 (git flow 간소화)

```
main      # 배포 브랜치. 직접 커밋 금지
develop   # 개발 통합 브랜치. 직접 커밋 금지
feature/* # develop 에서 파생, 작업 후 develop 으로 PR 병합
```

- 브랜치 이름: `feature/<기능-요약>` (영문 소문자 + 하이픈). 예) `feature/note-list`
- 흐름: `develop` → `feature/*` 작업 → PR → `develop` 병합 → 배포 시점에 `develop` → `main` PR
- `release/*`, `hotfix/*` 브랜치는 필요해질 때 도입한다. (현재는 사용하지 않음)

## 4. PR 컨벤션

- 제목은 커밋 컨벤션과 같은 형식: `타입: 한글 설명`
- 대상 브랜치: feature → `develop`, 배포 시 `develop` → `main`
- 본문은 `.github/PULL_REQUEST_TEMPLATE.md` 양식을 따른다. (변경 배경, 변경 내용, 확인 방법, 체크리스트)
- 병합 전 `npm run lint`, `npm run typecheck`, `npm run build` 가 통과해야 한다.

## 5. 코드 작성 규칙

- 언어는 TypeScript, 스타일은 SCSS Modules(`*.module.scss`)를 사용한다.
- 서버 상태(API 데이터)는 `@tanstack/react-query` 로 관리한다. 쿼리 키는 feature 안에서 한 곳에 모아 정의한다.
- 새 공용 컴포넌트는 Storybook 스토리를 함께 작성한다.
- 환경변수는 `.env.example` 에 이름만 추가하고, 실제 값은 `.env.local` 에 둔다. 비밀 값은 절대 커밋하지 않는다.
