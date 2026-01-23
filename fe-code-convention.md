# Frontend Code Convention

> 이 문서는 [프로젝트 이름]의 프론트엔드 코드 스타일과 규칙을 정의하여 일관성 있는 코드를 유지하고, Gemini와 같은 AI 어시스턴트와의 협업을 원활하게 하기 위해 작성되었습니다.

---

## 1. General Principles

- **KISS (Keep It Simple, Stupid)**: 코드는 최대한 단순하고 명료하게 작성합니다. 불필요한 복잡성을 피합니다.
- **DRY (Don't Repeat Yourself)**: 반복되는 코드는 함수나 컴포넌트로 분리하여 재사용성을 높입니다.
- **Self-documenting Code**: 변수, 함수, 컴포넌트의 이름만으로도 그 의도가 명확히 드러나도록 작성합니다.

---

## 2. Directory & File Structure

```
/src
├── /app                # 라우팅 및 페이지 단위 컴포넌트
│   └── /some-page
├── /features
│   └── /some-page
│       ├── /api        # api endpoint function
│       ├── /components # 특정 도메인에 종속된 UI 요소
│       ├── /queries    # useQuery & useMutation 커스텀 훅
│       ├── /store      # 특정 도메인에 종속된 전역 상태 관리 (Zustand)
│       ├── /hooks      # 커스텀 훅 (Custom Hooks)
│       └── /schemas      # schema (zod)
├── /components         # 재사용 가능한 공통 컴포넌트
│   └── /ui             # 버튼, 인풋 등 기본적인 UI 요소
├── /hooks              # 공통 커스텀 훅
├── /lib                # 외부 라이브러리 설정, 유틸리티 함수
├── /store              # 공통 전역 상태 관리 (Zustand)
├── /styles             # 전역 스타일, 테마
└── /types              # 공통으로 사용되는 타입 정의
```

- 파일명은 **PascalCase** (`MyComponent.tsx`) 또는 **kebab-case** (`my-component.tsx`)를 사용합니다. (하나로 통일)
- 컴포넌트 파일은 `index.ts`를 사용하여 외부에 노출할 파일을 관리합니다. (Barrel-Export)

---

## 3. Naming Conventions

- **Components**: `PascalCase`를 사용합니다. (e.g., `UserProfile`, `PrimaryButton`)
- **Variables/Functions**: `camelCase`를 사용합니다. (e.g., `userName`, `calculateTotal`)
- **Types/Interfaces**: `PascalCase`를 사용하고, 필요시 `T` 또는 `I` 접두사를 붙일 수 있습니다. (e.g., `TUser`, `IProduct`)
- **Global Constants**: `ALL_CAPS_SNAKE_CASE`를 사용합니다. (e.g., `MAX_RETRIES`)
- **Hook**: `use` 접두사를 사용합니다. (e.g., `useUserData`)
- **Event Handler**: `handle` 또는 `on` 접두사를 사용합니다. (e.g., `handleClick`, `onChange`)

---

## 4. 컴포넌트 디자인 (Component Design)

- **Props**:
  - `props`의 개수는 5개를 넘지 않도록 노력합니다.
  - `boolean` 타입의 `prop`은 `is`, `has`, `should` 등의 접두사를 사용합니다. (e.g., `isOpen`)
- **State**:
  - 상태는 가능한 한 지역적으로(Locally) 유지합니다.
  - 여러 컴포넌트에서 공유해야 하는 상태만 전역으로 "끌어올립니다(Lifting State Up)".
- **단일 책임 원칙 (Single Responsibility Principle)**: 하나의 컴포넌트는 하나의 기능만 담당하도록 설계합니다.

---

## 5. State Management

- **Local State**: `useState`를 기본으로 사용합니다.
- **Global State**: 여러 페이지/컴포넌트에서 공유되는 상태는 [라이브러리 이름, e.g., Zustand]를 사용합니다.
- **Server State**: API로부터 받아오는 데이터는 [라이브러리 이름, e.g., React-Query, SWR]을 사용하여 캐싱 및 동기화를 관리합니다.

---

## 6. Styling

- 스타일링은 [라이브러리 이름, e.g., Styled-Components, Emotion, Tailwind CSS]를 사용합니다.
- 디자인 시스템에 정의된 `Color`, `Typography`, `Spacing`을 최대한 활용합니다. (e.g., `theme.colors.primary`)
- `px` 대신 `rem` 단위를 사용합니다.

---

## 7. AI Collaboration - Do Not

> AI 어시스턴트(Gemini)가 아래와 같은 행동을 하는 것을 금지합니다.

- **임의 라이브러리/프레임워크 사용**: 프로젝트 내에서 사용이 확인되지 않은 라이브러리나 프레임워크를 임의로 도입하거나 가정하지 마십시오.
- **주요 변경 사항 단독 진행**: 사용자에게 명확한 확인 없이 코드베이스에 중대한 변경(예: 아키텍처 변경, 대규모 리팩토링)을 단독으로 진행하지 마십시오.
- **코드 자동 추가**: 코드 변경 후 테스트 코드나 불필요한 콘솔 로그 등을 임의로 추가하지 마십시오. 필요한 경우 사용자의 명시적인 지시를 따릅니다.
- **불필요한 주석 추가/수정**: 코드 주석은 _왜_ 그렇게 코딩되었는지 설명하는 데 집중하며, _무엇을_ 하는지 설명하는 주석은 피합니다. 기존 주석을 임의로 수정하지 마십시오.
- **변경 사항 되돌리기**: 사용자의 명시적인 지시 없이는 코드 변경 사항을 되돌리지 마십시오.
- **원격 저장소 푸시**: 사용자의 명시적인 지시 없이는 원격 Git 저장소(예: GitHub, GitLab)에 코드를 푸시하지 마십시오.
- **빌드/테스트/린트 명령어 추정**: 프로젝트의 빌드, 테스트, 린트 명령어를 임의로 추정하지 마십시오. `package.json`, `README.md` 등을 통해 확인하거나 사용자에게 문의합니다.
- **파일 내용 임의 가정**: `read_file` 도구를 사용하여 파일 내용을 직접 확인하기 전까지는 파일의 내용을 임의로 가정하지 마십시오.
