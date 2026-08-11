# NHN Cloud 디자인 시스템 하네스

Figma 디자인 시스템을 **토큰 기반 React 컴포넌트**로 변환하는 하네스다. NHN Cloud 콘솔·퍼블릭 존 화면을 Vite 6 · React 19 · TypeScript 5 · Tailwind CSS v4 · Storybook 8 스택으로 구현하며, 모든 시각 값(색·간격·라운드·타이포·그림자)은 `src/tokens`에 정의된 디자인 토큰만 참조한다. 토큰 외 하드코딩(raw hex, raw px, `rgb()`, arbitrary Tailwind)은 커밋 훅(`.claude/hooks/check-hardcode.mjs`)이 도구 레벨에서 자동 차단해, 사람 리뷰와 무관하게 일관성을 강제한다.

## 토큰 구성

모든 토큰은 `src/tokens/*.tokens.css`에 Tailwind v4 `@theme`로 정의된 SSOT다. Storybook의 각 `*.stories.tsx`가 토큰을 시각화한다.

| 토큰 | 파일 | 내용 |
|------|------|------|
| Colors | `colors.tokens.css` | 브랜드·시맨틱 색(interactive/text/bg/border 등). 액션 전용 `brand-primary` 등 맥락별 시맨틱 유틸. |
| Spacing | `spacing.tokens.css` | 8그리드 스케일 + Figma 프레임에서 유래한 비그리드 raw 값(각 값에 출처 주석). |
| Radius | `radius.tokens.css` | 라운드(버튼 pill, 입력, 카드 등) 반경 토큰. |
| Typography | `typography.tokens.css` | `type-*` @utility(display/body/caption 등) — 폰트·크기·행간 합성. |
| Shadows | `shadows.tokens.css` | Elevation. 현재 `shadow-modal`(Modal drop-shadow 스펙에서 직접 유래)만 정의. |

## 컴포넌트 목록

### Nhncloud 퍼블릭 존
`LogoNhncloud` · `NhncloudGnb`(페이지 레벨 GNB 바) · `TextInput` · `RoundButton`(pill) · `Modal`(서버 보안 점검 다이얼로그)

### 콘솔 존
`Topbar` · `LnbNavigation`(사이드 네비) · `Navigation` · `TabMenu` / `TabMenuList` · `TabBox` / `TabBoxGroup` · `Table` / `TableControls` · `Pagination` · `Footer` · `Breadcrumb` · `Toolbar` · `Button` · `Dropdown` · `Input` · `Logo` · `AccountMenu`(계정 드롭다운) · 공통 원자(`Checkbox` · `Divider` · `icons`) · `DescriptionGuide`(화면설계서 산출물)

### 페이지
`ConsolePage`(콘솔 리소스 목록 조립) · `PasswordConfirmPage`(비밀번호 재확인). `App.tsx`가 라우터 없이 두 화면을 상태 전환으로 렌더한다 — 콘솔 계정 드롭다운에서 [회원 정보] 선택 시 재확인 페이지로 이동.

## 실행 방법

**설치.** 저장소를 클론한 뒤 `npm install`로 의존성을 설치한다. Node 18+ 환경을 권장한다.

**개발 서버.** `npm run dev`로 Vite 개발 서버를 띄운다(기본 `http://localhost:5173`). `App.tsx`의 콘솔/비밀번호 재확인 화면 전환을 브라우저에서 확인할 수 있다.

**Storybook.** `npm run storybook`으로 Storybook을 실행한다(기본 `http://localhost:6006`). 토큰 시각화 스토리와 컴포넌트별 변형·상태를 addon-designs·autodocs와 함께 확인한다. 정적 빌드는 `npm run build-storybook`.
