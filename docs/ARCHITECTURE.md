# 아키텍처 가이드

## 라우팅 구조

이 프로젝트는 Expo Router의 파일 기반 라우팅을 사용합니다.

### 라우팅 규칙

```
app/
├── _layout.tsx        # 루트 레이아웃 (모든 화면에 적용)
├── index.tsx          # "/" 경로
├── modal.tsx          # "/modal" 경로
└── (tabs)/            # 그룹 (URL에 포함되지 않음)
    ├── _layout.tsx    # 탭 레이아웃
    ├── index.tsx      # "/" (탭 내 홈)
    ├── explore.tsx    # "/explore"
    └── test.tsx       # "/test"
```

### 레이아웃 계층

```
RootLayout (_layout.tsx)
└── ThemeProvider
    └── Stack Navigator
        ├── (tabs) - 탭 네비게이션
        │   ├── Home (index.tsx)
        │   ├── Explore (explore.tsx)
        │   └── Test (test.tsx)
        └── Modal (modal.tsx) - 모달 프리젠테이션
```

---

## 테마 시스템

### 색상 정의

**위치**: `constants/theme.ts`

```typescript
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};
```

### 테마 적용 흐름

```
useColorScheme()     # 시스템 설정 감지
        ↓
useThemeColor()      # 색상 키에 맞는 값 반환
        ↓
ThemedText/View      # 자동 테마 적용 컴포넌트
```

---

## 플랫폼별 코드

### 파일 확장자 규칙

```
component.tsx          # 기본 (Android + Web)
component.ios.tsx      # iOS 전용
component.web.ts       # Web 전용
component.android.tsx  # Android 전용
```

### 예시: IconSymbol

```
components/ui/
├── icon-symbol.tsx       # Material Icons (Android, Web)
└── icon-symbol.ios.tsx   # SF Symbols (iOS)
```

빌드 시 플랫폼에 맞는 파일이 자동 선택됩니다.

---

## 애니메이션 아키텍처

### react-native-reanimated 사용

```typescript
// Animated Value 생성
const scrollOffset = useRef(new Animated.Value(0)).current;

// Animated Event 연결
<Animated.ScrollView
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffset } } }],
    { useNativeDriver: true }
  )}
/>

// Interpolation
const headerTransform = scrollOffset.interpolate({
  inputRange: [0, HEADER_HEIGHT],
  outputRange: [0, -HEADER_HEIGHT],
  extrapolate: 'clamp',
});
```

### 애니메이션 패턴

| 패턴 | 구현 위치 | 설명 |
|------|----------|------|
| Parallax | `parallax-scroll-view.tsx` | 스크롤에 따른 헤더 변환 |
| Wave | `hello-wave.tsx` | 반복 회전 애니메이션 |
| Collapse | `collapsible.tsx` | 높이 확장/축소 |

---

## 컴포넌트 설계 원칙

### 1. 테마 독립적 스타일링

```typescript
// Bad
const styles = StyleSheet.create({
  text: { color: '#000' }
});

// Good
const color = useThemeColor({}, 'text');
<Text style={{ color }}>{children}</Text>
```

### 2. 플랫폼 추상화

```typescript
// components/ui/icon-symbol.tsx (기본)
export function IconSymbol({ name, ...props }) {
  return <MaterialIcon name={SF_TO_MATERIAL[name]} {...props} />;
}

// components/ui/icon-symbol.ios.tsx (iOS)
export function IconSymbol({ name, ...props }) {
  return <SymbolView name={name} {...props} />;
}
```

### 3. 합성 기반 컴포넌트

```typescript
// ParallaxScrollView는 자식을 받아 레이아웃만 담당
<ParallaxScrollView headerImage={...}>
  <ThemedView>
    <ThemedText>콘텐츠</ThemedText>
  </ThemedView>
</ParallaxScrollView>
```

---

## 상태 관리

현재 프로젝트는 단순한 구조로, React의 기본 상태 관리를 사용합니다.

### 로컬 상태 (useState)

```typescript
// app/(tabs)/test.tsx
const [selectedIds, setSelectedIds] = useState<string[]>([]);
```

### 확장 시 권장 패턴

| 복잡도 | 권장 방식 |
|--------|----------|
| 단순 | useState, useReducer |
| 중간 | Context API |
| 복잡 | Zustand, Jotai |

---

## 폴더 구조 규칙

### 파일 명명 규칙

- **케밥 케이스**: `themed-text.tsx`, `use-theme-color.ts`
- **컴포넌트**: PascalCase export (`ThemedText`)
- **훅**: camelCase export (`useThemeColor`)

### 디렉토리 역할

| 디렉토리 | 역할 | 예시 |
|----------|------|------|
| `app/` | 라우팅/화면 | `index.tsx`, `modal.tsx` |
| `components/` | 재사용 UI | `themed-text.tsx` |
| `components/ui/` | 원자적 UI | `icon-symbol.tsx` |
| `hooks/` | 커스텀 훅 | `use-theme-color.ts` |
| `constants/` | 설정/상수 | `theme.ts` |
| `assets/` | 정적 파일 | `images/icon.png` |

---

## 타입 시스템

### 경로 별칭

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**사용법**:

```typescript
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
```

### 타입 안전 라우팅

```json
// app.json
{
  "experiments": {
    "typedRoutes": true
  }
}
```

이 설정으로 `<Link href="/modal">` 같은 경로가 타입 체크됩니다.
