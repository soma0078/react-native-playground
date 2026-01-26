---
name: react-native-developer
description: React Native 프론트엔드 개발 통합 스킬. 컴포넌트 설계, API 연동(React-Query), 코드 스타일 가이드라인을 포함합니다. UI 컴포넌트 생성, API 호출, 데이터 fetching, 코드 리뷰, 새 기능 구현 등 모든 프론트엔드 개발 작업에서 이 스킬을 활성화합니다.
---

# React Native Developer

프로젝트의 프론트엔드 개발 가이드라인을 준수하여 코드를 작성하고 검토합니다.

## 핵심 원칙

- **KISS**: 단순하고 명료하게 작성
- **DRY**: 반복 코드는 함수/컴포넌트로 분리
- **Self-documenting Code**: 이름만으로 의도가 드러나도록
- **Modularity**: 독립적 모듈로 분리, 응집도↑ 결합도↓

## 지양 사항

- 불필요한 추상화, 매직 넘버/스트링
- 과도한 조기 최적화
- 없는 라이브러리 가정/도입
- 요청되지 않은 리팩토링
- 파일 내용 확인 없이 가정

## 프로젝트 구조

```
/src
├── /app                # 라우팅 및 페이지
├── /features           # 도메인별 모듈
│   └── /[feature]
│       ├── /api        # API 로직
│       ├── /components # 도메인 UI
│       ├── /queries    # useQuery/useMutation 훅
│       ├── /store      # 도메인 상태
│       ├── /hooks      # 커스텀 훅
│       └── /schemas    # zod 스키마
├── /components         # 공통 컴포넌트
│   └── /ui             # 기본 UI 요소
├── /hooks              # 공통 훅
├── /lib                # 유틸리티
├── /store              # 전역 상태
├── /styles             # 스타일/테마
└── /types              # 공통 타입
```

---

## 1. 컴포넌트 설계

### Props

- 개수는 5개 이하로 제한
- Boolean은 `is`, `has`, `should` 접두사: `isOpen`, `hasError`

### State

- 가능한 한 지역 상태로 유지
- 공유 필요시에만 끌어올리기

### 단일 책임 원칙

- 하나의 컴포넌트 = 하나의 책임

---

## 2. 네이밍 컨벤션

| 대상            | 규칙             | 예시                          |
| --------------- | ---------------- | ----------------------------- |
| 변수/함수       | camelCase        | `getUserData`, `isLoading`    |
| 타입/인터페이스 | PascalCase       | `UserProfileProps`, `TUser`   |
| 전역 상수       | UPPER_SNAKE      | `MAX_RETRIES`, `API_BASE_URL` |
| 훅              | use 접두사       | `useAuth`, `usePosts`         |
| 핸들러          | handle/on 접두사 | `handleClick`, `onChange`     |

---

## 3. API 연동

- **Server State**: React-Query 사용 (클라이언트/서버 상태 분리)
- **HTTP Client**: axios
- **타입 정의**: 요청/응답 데이터 TypeScript로 명확하게

상세 예제: [references/api-examples.md](references/api-examples.md)

---

## 4. 커밋 메시지

### 형식

```
<type>: <subject>

[body]
```

### Type

| Type       | 설명                          |
| ---------- | ----------------------------- |
| `feat`     | 새로운 기능 추가              |
| `fix`      | 버그 수정                     |
| `refactor` | 리팩토링 (기능 변경 없음)     |
| `style`    | 코드 포맷팅, 세미콜론 누락 등 |
| `docs`     | 문서 수정                     |
| `test`     | 테스트 코드 추가/수정         |
| `chore`    | 빌드, 설정 파일 수정          |

### 규칙

- **subject**: 50자 이내, 명령형으로 작성 (예: "Add login feature")
- **body**: 선택사항, 변경 이유와 내용 설명
- 한글/영어 일관되게 사용

### 예시

```
feat: 로그인 화면 추가

- 이메일/비밀번호 입력 폼 구현
- 유효성 검사 로직 추가
```

```
fix: 프로필 이미지 로딩 오류 수정
```

---

## 작업 절차

1. **요청 분석** - 기능 단위로 분해
2. **구조 설계** - 컴포넌트/API 구조 정의
3. **코드 구현** - 가이드라인 준수
4. **스타일 점검** - 네이밍, 포맷팅 확인
5. **결과 보고** - 변경 사항 설명
