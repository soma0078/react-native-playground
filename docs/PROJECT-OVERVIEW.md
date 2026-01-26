# React Native Playground 프로젝트 개요

## 목적

이 프로젝트는 **Expo를 사용한 React Native 개발 학습 및 실험용 플레이그라운드**입니다.

- Expo와 Expo Router를 기반으로 한 멀티플랫폼 앱 개발 환경 제공
- iOS, Android, Web을 동시에 지원하는 유니버설 앱 개발 예제 포함
- 파일 기반 라우팅(file-based routing)을 통한 현대적인 개발 방식 시연

---

## 기술 스택

### 핵심 프레임워크

| 기술 | 버전 | 용도 |
|------|------|------|
| React | 19.1.0 | UI 라이브러리 |
| React Native | 0.81.5 | 크로스플랫폼 모바일 개발 |
| Expo | ~54.0.32 | 개발 플랫폼 |
| Expo Router | ~6.0.22 | 파일 기반 라우팅 |
| TypeScript | ~5.9.2 | 타입 안전성 |

### 네비게이션

- `@react-navigation/native` ^7.1.8
- `@react-navigation/bottom-tabs` ^7.4.0
- `@react-navigation/elements` ^2.6.3

### 애니메이션 및 인터랙션

- `react-native-reanimated` ~4.1.1
- `react-native-gesture-handler` ~2.28.0
- `react-native-worklets` 0.5.1

### UI/그래픽

- `expo-image` ~3.0.11
- `@expo/vector-icons` ^15.0.3
- `expo-symbols` ~1.0.8

### 개발 도구

- ESLint ^9.25.0 (eslint-config-expo 사용)
- VS Code 설정 (자동 포맷팅, import 정렬)

---

## 프로젝트 구조

```
react-native-playground/
├── app/                          # 라우팅 및 화면 (Expo Router)
│   ├── _layout.tsx               # 루트 레이아웃
│   ├── modal.tsx                 # 모달 화면
│   └── (tabs)/                   # 탭 네비게이션 그룹
│       ├── _layout.tsx           # 탭 레이아웃
│       ├── index.tsx             # Home 탭
│       ├── explore.tsx           # Explore 탭
│       └── test.tsx              # Test 탭
│
├── components/                   # 재사용 가능한 컴포넌트
│   ├── themed-text.tsx           # 테마 지원 Text
│   ├── themed-view.tsx           # 테마 지원 View
│   ├── hello-wave.tsx            # 손 흔드는 애니메이션
│   ├── parallax-scroll-view.tsx  # 패럴렉스 스크롤뷰
│   ├── haptic-tab.tsx            # 촉각 피드백 탭
│   ├── external-link.tsx         # 외부 링크
│   └── ui/                       # UI 전용 컴포넌트
│       ├── icon-symbol.tsx       # Android/Web 아이콘
│       ├── icon-symbol.ios.tsx   # iOS 아이콘
│       └── collapsible.tsx       # 확장/축소 컴포넌트
│
├── hooks/                        # 커스텀 Hooks
│   ├── use-color-scheme.ts       # 색상 스킴 감지
│   ├── use-color-scheme.web.ts   # 웹 전용 구현
│   └── use-theme-color.ts        # 테마 색상 관리
│
├── constants/                    # 상수 정의
│   └── theme.ts                  # 색상/폰트 테마
│
├── assets/                       # 정적 자산
│   └── images/                   # 이미지 파일
│
├── scripts/                      # 유틸리티 스크립트
│   └── reset-project.js          # 프로젝트 초기화
│
└── Configuration Files
    ├── app.json                  # Expo 설정
    ├── package.json              # 의존성 관리
    ├── tsconfig.json             # TypeScript 설정
    └── eslint.config.js          # ESLint 설정
```

---

## 주요 화면

### Home 탭 (`app/(tabs)/index.tsx`)

- 환영 메시지와 손 흔드는 애니메이션
- 프로젝트 시작 가이드 (3단계)
- 모달 화면 네비게이션 예제
- Parallax 스크롤 효과 헤더

### Explore 탭 (`app/(tabs)/explore.tsx`)

- 파일 기반 라우팅 설명
- Android, iOS, Web 지원 정보
- 이미지 다중 해상도 사용법
- 라이트/다크 모드 컴포넌트 설명
- 애니메이션 사용법

### Test 탭 (`app/(tabs)/test.tsx`)

- 커피 메뉴 선택 앱 예제
- 다중 선택 기능
- 상태 관리 (useState) 예제
- 조건부 렌더링 및 리스트 맵핑

### Modal (`app/modal.tsx`)

- 모달 프리젠테이션 스타일
- 네비게이션 예제

---

## 주요 기능 및 패턴

### 파일 기반 라우팅

Expo Router를 사용한 폴더 구조 기반 라우팅:

- `(tabs)` 그룹으로 탭 네비게이션 관리
- `_layout.tsx` 파일로 네비게이션 설정
- 타입 안전 라우팅 (`typedRoutes: true`)

### 다크모드 지원

- `useColorScheme()` 훅으로 시스템 설정 자동 감지
- `useThemeColor()` 훅으로 테마별 색상 반환
- ThemedText, ThemedView로 일관된 스타일링

### 크로스플랫폼 호환성

- 플랫폼별 파일 확장자: `.ios.tsx`, `.web.ts`, `.android.tsx`
- `Platform.select()`를 통한 조건부 스타일링
- SF Symbols(iOS) / Material Icons(Android, Web) 자동 매핑

### 성능 최적화

- react-native-reanimated를 통한 네이티브 UI 스레드 애니메이션
- 스크롤 이벤트 throttling (`scrollEventThrottle={16}`)
- 컴포넌트 memo화 가능한 구조

---

## 실행 방법

```bash
# 개발 서버 시작 (대화형 메뉴)
npm start

# 플랫폼별 실행
npm run ios      # iOS 시뮬레이터
npm run android  # Android 에뮬레이터
npm run web      # 웹 브라우저

# 코드 품질 검사
npm run lint
```

---

## 프로젝트 초기화

새 프로젝트로 시작하려면:

```bash
npm run reset-project
```

이 명령은 현재 `app/` 폴더를 `app-example/`로 이동하고, 새로운 빈 `app/` 디렉토리를 생성합니다.

---

## 설정 파일

### app.json 주요 설정

```json
{
  "expo": {
    "name": "react-native-playground",
    "newArchEnabled": true,
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}
```

### tsconfig.json 주요 설정

- Strict 모드 활성화
- 경로 별칭: `@/*` → `./*`
