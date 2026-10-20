// 커밋 메시지 규칙: "영어 타입: #이슈번호 한글 설명"
// 예) fix: #10 노트 목록 기능에서 빈 배열일 때 오류가 발생하여 기본값을 추가하도록 수정함
const HANGUL = /[가-힣]/;
const ISSUE_PREFIX = /^#\d+\s+/;
const MIN_SUBJECT_LENGTH = 15;

/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        // 설명 맨 앞에 #이슈번호 가 포함되어야 한다.
        "subject-issue-prefix": ({ subject }) => [
          ISSUE_PREFIX.test(subject ?? ""),
          "커밋 설명 맨 앞에 이슈 번호(#숫자)를 포함해야 합니다. (예: refactor: #10 메시지)",
        ],
        // 설명에 한글이 반드시 포함되어야 한다.
        "subject-hangul": ({ subject }) => [
          HANGUL.test(subject ?? ""),
          "커밋 설명은 반드시 한글로 작성해야 합니다. (프리픽스만 영어)",
        ],
        // 간결한 한 단어 설명을 막고, 무엇을/왜/어떻게 했는지 풀어 쓰도록 유도한다.
        "subject-detailed": ({ subject }) => {
          const withoutIssue = (subject ?? "").replace(ISSUE_PREFIX, "");
          return [
            withoutIssue.length >= MIN_SUBJECT_LENGTH,
            `커밋 설명은 이슈 번호를 제외하고 ${MIN_SUBJECT_LENGTH}자 이상으로, 무엇을 왜 어떻게 바꿨는지 자세히 작성해 주세요.`,
          ];
        },
      },
    },
  ],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "ui",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore",
        "build",
        "ci",
        "asset",
        "deploy",
        "revert",
      ],
    ],
    "subject-issue-prefix": [2, "always"],
    "subject-hangul": [2, "always"],
    "subject-detailed": [2, "always"],
    // 한글 설명에는 대소문자 규칙이 의미 없으므로 해제한다.
    "subject-case": [0],
    // 길게 설명하는 것을 허용한다.
    "header-max-length": [2, "always", 200],
    "subject-full-stop": [0],
    // 본문은 한글로 길게 풀어 쓰므로 줄 길이 제한을 두지 않는다.
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
  },
};

export default config;
