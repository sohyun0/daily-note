# Git / 브랜치 / 커밋 / PR / CI 컨벤션

## 1. 브랜치 전략 & 네이밍

```
main      # 배포 브랜치 (Vercel 프로덕션)
develop   # 개발 통합 브랜치 (GitHub 기본 브랜치)
```

- 작업 브랜치는 `develop`에서 파생하고, 작업 완료 후 `develop`으로 PR을 올린다.
- `release/*`, `hotfix/*` 브랜치는 추후 필요할 때 도입한다.

### 브랜치 네이밍 규칙

형식: `{기능종류}/#{이슈번호}-{작업설명}`

- `feature`는 약어 `feat`로 사용 가능하다.
- 작업 설명은 영문 소문자 `kebab-case`로 작성한다.

```
feature/#10-ci-workflow
feat/#12-note-editor
fix/#15-empty-note-crash
refactor/#18-query-key-structure
chore/#20-storybook-config
```

### 병합(Merge) 방식

| PR 방향              | 병합 방식            | 이유                                                                                    |
| -------------------- | -------------------- | --------------------------------------------------------------------------------------- |
| `feat/*` → `develop` | **Squash and merge** | 기능 단위로 커밋 히스토리를 깔끔하게 남긴다. PR 제목이 곧 커밋 메시지가 된다.           |
| `develop` → `main`   | **Merge commit**     | Squash 병합 시 두 브랜치의 공통 조상이 끊겨 다음 배포 PR마다 충돌이 발생하는 걸 막는다. |

## 2. 커밋 메시지 컨벤션

형식: `타입: #이슈번호 한글 설명`

```
fix: #15 aa 기능에 대해서 xx 버그가 발생하여 bb 로 수정함
refactor: #10 노트 상세 조회 쿼리 키 구조를 상수 객체로 분리함
feat: #12 하루노트 작성 폼 컴포넌트와 유효성 검사 로직을 추가함
```

### 핵심 규칙 (`husky` + `commitlint` 자동 검사)

1. **프리픽스(타입)는 영어 소문자**만 사용한다 (`feat`, `fix`, `ui`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`, `asset`, `deploy`, `revert`).
2. **설명 맨 앞에 `#이슈번호`를 포함**한다. (예: `refactor: #10 ...`)
3. **설명은 반드시 한글로 작성**하며, 간결하게 줄이지 않고 **무엇을 왜 어떻게 수정했는지 15자 이상 길게 풀어서** 작성한다.
4. 본문(두 번째 문단 이후) 줄 길이 제한은 없으므로 필요한 배경을 자세히 적는다.

## 3. 이슈 & PR 컨벤션

- **이슈 템플릿 (`.github/ISSUE_TEMPLATE/`)**: 작업 성격에 맞춰 7가지 대분류 템플릿(`feat`, `ui`, `fix`, `refactor`, `chore`, `docs`, `test`)과 예외 작업용 `general` 템플릿을 사용한다. 일반 템플릿에 없는 예외 상황에서는 빈 Issue를 만들 수 있다. 템플릿의 라벨은 GitHub 저장소에 등록된 `labels.json` 기준 라벨과 일치해야 한다.
- **PR 제목**: 커밋 메시지와 동일하게 `타입: #이슈번호 한글 설명` 형식으로 작성한다. (`Squash and merge` 시 PR 제목이 그대로 커밋 메시지가 되며, CI에서 제목도 검사한다.)
- **이슈 자동 연결**: GitHub는 PR 제목의 `#이슈번호`만으로는 이슈를 자동으로 닫아주지 않는다. 반드시 PR 본문(템플릿의 `## 관련 이슈` 영역)에 아래 키워드를 적어야 병합 시 자동 연결/종료된다.
  - 병합 시 이슈 자동 종료: `Closed #이슈번호` (또는 `Closes #10`, `Fixes #10`)
  - 단순 참조 연결(종료 안 함): `Related #이슈번호`
- `.github/PULL_REQUEST_TEMPLATE.md` 양식을 채워 작성한다.

## 4. CI / 배포 파이프라인

- 모든 검증은 `develop`, `main`으로 향하는 **PR 단계(GitHub Actions CI)에서 완료**하고, 배포(Vercel)는 오직 배포만 담당한다.
- `.github/workflows/ci.yml` 검증 항목:
  1. `commitlint`: PR 내 커밋 메시지 및 PR 제목 컨벤션 검사
  2. `branch-flow`: `작업 브랜치 → develop`, `develop → main` 흐름과 브랜치 이름 검사
  3. `lint`: ESLint 검사 (폴더 간 의존 경계, `no-explicit-any` 등 포함)
  4. `typecheck`: `tsc --noEmit` 타입 검사
  5. `format`: Prettier 포맷 확인
  6. `test`: Vitest + Storybook 브라우저 테스트
  7. `build`: Next.js 프로덕션 빌드 확인
  8. `build-storybook`: Storybook 정적 빌드 확인
  9. `ci-success`: 위 검사가 모두 통과했는지 확인하는 최종 게이트

- CI는 PR에서 자동 실행된다. 초기 설정처럼 PR을 만들지 않는 상태에서도 GitHub Ruleset에 `CI 통과` 상태 검사를 등록해야 할 때는 Actions 화면에서 `workflow_dispatch`로 수동 실행할 수 있다. 수동 실행에서는 PR 전용 검사인 `commitlint`, `branch-flow`가 건너뛰어지고 나머지 품질 검사가 실행된다.

## 관련 문서

- [폴더 구조](./folder-structure.md)
- [네이밍 컨벤션](./naming.md)
- [코딩 스타일](./coding-style.md)
- [API / 데이터 컨벤션](./api-and-data.md)
- [컨벤션 목차](../../AGENTS.md)
