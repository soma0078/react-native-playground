# 컴포넌트 가이드

## 기본 컴포넌트

### ThemedText

다크모드를 자동으로 지원하는 텍스트 컴포넌트입니다.

**위치**: `components/themed-text.tsx`

**사용법**:

```tsx
import { ThemedText } from '@/components/themed-text';

<ThemedText>기본 텍스트</ThemedText>
<ThemedText type="title">제목</ThemedText>
<ThemedText type="subtitle">부제목</ThemedText>
<ThemedText type="defaultSemiBold">굵은 텍스트</ThemedText>
<ThemedText type="link">링크 텍스트</ThemedText>
```

**Props**:

| Prop | 타입 | 설명 |
|------|------|------|
| type | `'default' \| 'title' \| 'defaultSemiBold' \| 'subtitle' \| 'link'` | 텍스트 스타일 |
| lightColor | `string` | 라이트 모드 색상 (선택) |
| darkColor | `string` | 다크 모드 색상 (선택) |

---

### ThemedView

다크모드를 자동으로 지원하는 뷰 컴포넌트입니다.

**위치**: `components/themed-view.tsx`

**사용법**:

```tsx
import { ThemedView } from '@/components/themed-view';

<ThemedView style={styles.container}>
  {/* 콘텐츠 */}
</ThemedView>
```

**Props**:

| Prop | 타입 | 설명 |
|------|------|------|
| lightColor | `string` | 라이트 모드 배경색 (선택) |
| darkColor | `string` | 다크 모드 배경색 (선택) |

---

## 레이아웃 컴포넌트

### ParallaxScrollView

헤더와 콘텐츠에 패럴렉스 효과를 적용한 스크롤뷰입니다.

**위치**: `components/parallax-scroll-view.tsx`

**사용법**:

```tsx
import { ParallaxScrollView } from '@/components/parallax-scroll-view';

<ParallaxScrollView
  headerImage={
    <Image source={require('@/assets/images/header.png')} />
  }
  headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
>
  {/* 콘텐츠 */}
</ParallaxScrollView>
```

**Props**:

| Prop | 타입 | 설명 |
|------|------|------|
| headerImage | `ReactElement` | 헤더에 표시할 이미지 |
| headerBackgroundColor | `{ light: string; dark: string }` | 헤더 배경색 |
| children | `ReactNode` | 스크롤 콘텐츠 |

---

### Collapsible

클릭하여 확장/축소할 수 있는 컨테이너입니다.

**위치**: `components/ui/collapsible.tsx`

**사용법**:

```tsx
import { Collapsible } from '@/components/ui/collapsible';

<Collapsible title="자세히 보기">
  <ThemedText>숨겨진 콘텐츠</ThemedText>
</Collapsible>
```

**Props**:

| Prop | 타입 | 설명 |
|------|------|------|
| title | `string` | 헤더 제목 |
| children | `ReactNode` | 확장 시 표시할 콘텐츠 |

---

## 인터랙션 컴포넌트

### HapticTab

iOS에서 촉각 피드백을 제공하는 탭 버튼입니다.

**위치**: `components/haptic-tab.tsx`

**특징**:

- iOS에서 탭 시 촉각 피드백 발생
- BottomTabBarButtonProps와 호환

---

### ExternalLink

외부 URL을 인앱 브라우저로 여는 링크 컴포넌트입니다.

**위치**: `components/external-link.tsx`

**사용법**:

```tsx
import { ExternalLink } from '@/components/external-link';

<ExternalLink href="https://example.com">
  링크 텍스트
</ExternalLink>
```

---

### HelloWave

손 흔드는 애니메이션 이모지 컴포넌트입니다.

**위치**: `components/hello-wave.tsx`

**사용법**:

```tsx
import { HelloWave } from '@/components/hello-wave';

<HelloWave />
```

**특징**:

- react-native-reanimated 기반 애니메이션
- 자동 반복 애니메이션

---

## UI 컴포넌트

### IconSymbol

플랫폼별로 최적화된 아이콘 컴포넌트입니다.

**위치**:
- iOS: `components/ui/icon-symbol.ios.tsx`
- Android/Web: `components/ui/icon-symbol.tsx`

**사용법**:

```tsx
import { IconSymbol } from '@/components/ui/icon-symbol';

<IconSymbol name="house.fill" size={24} color="blue" />
```

**Props**:

| Prop | 타입 | 설명 |
|------|------|------|
| name | `SymbolViewProps['name']` | SF Symbol 이름 |
| size | `number` | 아이콘 크기 (기본: 24) |
| color | `string` | 아이콘 색상 |
| style | `StyleProp<ViewStyle>` | 추가 스타일 |

**지원 아이콘 매핑**:

| SF Symbol (iOS) | Material Icon (Android/Web) |
|-----------------|----------------------------|
| house.fill | home |
| paperplane.fill | send |
| chevron.left.forwardslash.chevron.right | code |
| chevron.right | chevron-right |

---

## 커스텀 Hooks

### useThemeColor

현재 테마에 맞는 색상을 반환합니다.

**위치**: `hooks/use-theme-color.ts`

**사용법**:

```tsx
import { useThemeColor } from '@/hooks/use-theme-color';

const textColor = useThemeColor(
  { light: '#000', dark: '#fff' },
  'text'
);
```

---

### useColorScheme

현재 시스템 색상 스킴을 반환합니다.

**위치**:
- 네이티브: `hooks/use-color-scheme.ts`
- 웹: `hooks/use-color-scheme.web.ts`

**사용법**:

```tsx
import { useColorScheme } from '@/hooks/use-color-scheme';

const colorScheme = useColorScheme(); // 'light' | 'dark'
```
