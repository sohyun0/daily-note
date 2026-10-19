# 네이밍 컨벤션

| 대상             | 규칙                                                             | 예시                                         |
| ---------------- | ---------------------------------------------------------------- | -------------------------------------------- |
| 변수             | `camelCase`                                                      | `noteList`, `selectedDate`                   |
| 상수             | `UPPER_SNAKE_CASE`                                               | `MAX_MEMBERS`, `STALE_TIME`                  |
| 컴포넌트         | 폴더명, 함수명 모두 `PascalCase`                                 | `NoteCard/index.tsx` → `function NoteCard()` |
| 핸들러 함수      | `handle` + 대상 + 행동                                           | `handleButtonClick`, `handleNameChange`      |
| API 함수         | `get` / `post` / `put` / `patch` / `delete` + 대상               | `getArticleDetail`, `deleteArticleDetail`    |
| 훅               | `use` + 이름                                                     | `useNoteList`                                |
| boolean          | `is` 우선, 불가피할 때만 `has`                                   | `isLocked`, `hasPermission`                  |
| 일반 폴더        | 소문자. 단어가 합쳐지면 `camelCase`                              | `components`, `hooks`, `noteList`            |
| 파일명           | `index.tsx`, `index.ts`                                          | `hooks/useNoteList/index.ts`                 |
| Server Action    | `camelCase.ts`                                                   | `cache.ts`                                   |
| 이미지 파일      | 아이콘은 `ic` + 이름, 그 외는 `img` + 이름 (이름은 `PascalCase`) | `icArrowRight.svg`, `imgLogo.png`            |
| 타입 / interface | `PascalCase`                                                     | `Note`, `ButtonProps`                        |
| 브랜치           | [git-workflow.md](./git-workflow.md) 참고                        | `feat/#10-note-list`                         |

## 컴포넌트 이름과 파일명

컴포넌트 파일은 모두 `index.tsx` 이므로, **컴포넌트 이름은 폴더명으로 구분**한다. 그래서 컴포넌트 폴더는 `PascalCase` 로 짓는다.
일반 폴더(`components`, `hooks` 등)는 소문자, 기능 폴더(`userProfile`)는 `camelCase` 다.

## 핸들러 함수

`handle` + (핸들러 대상) + (행동) 순서로 짓는다.

```tsx
const handleButtonClick = () => {};
const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {};
```

Props 로 내려주는 이벤트 prop 은 `onXxx`, 그 안에서 연결하는 핸들러는 `handleXxx` 로 구분한다.

```tsx
<NoteForm onSubmit={handleNoteSubmit} />
```

## API 관련 함수

```ts
const getArticleDetail = async () => {};
const postArticleDetail = async () => {};
const patchArticleDetail = async () => {};
const deleteArticleDetail = async () => {};
```

폴더는 실제 API 구조를 따라 도메인별로 나눈다. (예: `api/users/index.ts`) 자세한 내용은 [api-and-data.md](./api-and-data.md)

## boolean

```tsx
const [isLocked, setIsLocked] = useState(false); // 기본: is
const [hasLocked, setHasLocked] = useState(false); // 불가피한 경우에만 has
```

## 이미지 파일

- 아이콘: `icArrowRight.svg`, `icClose.svg`
- 일반 이미지: `imgLogo.png`, `imgEmptyNote.png`

## 관련 문서

- [폴더 구조](./folder-structure.md)
- [코딩 스타일](./coding-style.md)
- [API / 데이터 컨벤션](./api-and-data.md)
- [컨벤션 목차](../../AGENTS.md)
