# Design Tokens (SSOT)

모든 시각 값의 **유일한 원천(single source of truth)**. 컴포넌트/앱 코드는 여기서 파생된
토큰과 Tailwind 유틸리티만 참조한다. raw 값(hex/px/rgb/hsl/arbitrary Tailwind)은 **이 디렉토리 밖에서 금지**되며,
`.claude/hooks/check-hardcode.mjs`가 도구 레벨에서 자동 차단한다(강제 계약 레이어 3).

## 파일 구조

| 파일 | 카테고리 | 생성되는 유틸리티(예) |
|------|----------|------------------------|
| `color.tokens.css`      | 색 (surface/text/border/accent/status) | `bg-bg-base`, `text-fg-muted`, `border-border-base` |
| `spacing.tokens.css`    | 간격 (t-shirt scale) | `p-md`, `gap-lg`, `m-xl` |
| `radius.tokens.css`     | 라운드 | `rounded-md`, `rounded-full` |
| `typography.tokens.css` | 폰트 패밀리/사이즈/굵기 | `font-sans`, `text-base`, `font-semibold` |
| `shadow.tokens.css`     | 그림자/엘리베이션 | `shadow-sm`, `shadow-lg` |
| `breakpoint.tokens.css` | 반응형 브레이크포인트 | `sm:`, `md:`, `lg:` |
| `design-tokens.css`     | **집약 엔트리** — 위 전부를 `@import` | (import 전용) |

`src/index.css`는 `design-tokens.css` 하나만 import 하면 된다.

## 네이밍 규칙 — 의미 기반(semantic), raw 금지

토큰 이름은 **용도(의미)**로 짓는다. **원시 값이나 색상명으로 짓지 않는다.**

- ✅ `--color-fg-muted`, `--color-accent-base`, `--spacing-lg`, `--radius-md`
- ❌ `--color-gray-500`, `--color-indigo`, `--spacing-16px`, `--blue`

패턴: `--<category>-<role>[-<variant>]`
- category: `color` · `spacing` · `radius` · `text`/`font` · `shadow` · `breakpoint`
- role(color): `bg-*` (surface) · `fg-*` (text) · `border-*` · `accent-*` · `danger/success/warning-*`
- variant: `base` · `muted` · `subtle` · `hover` · `strong` 등 상태/강도

## 새 토큰 추가 절차

1. 정말 새 값이 필요한지 확인 — 기존 토큰 재사용 우선(Simplicity First).
2. 해당 카테고리 `*.tokens.css`의 `@theme` 블록에 의미 기반 이름으로 추가.
3. 값은 여기(토큰 파일)에만 둔다. 컴포넌트에는 절대 raw 값을 넣지 않는다.
4. Figma 변수와의 매핑/동기화는 `token-guardian` 에이전트(`/sync-tokens`)가 담당.

## 예외(token-exempt)

hook은 `design-tokens.css`와 `*.tokens.css`를 자동 예외 처리한다. 그 외 파일에서
불가피하게 raw 값이 필요한 극히 예외적 경우에만, 해당 줄 끝에 사유를 남긴다:

```css
outline: 2px solid #000; /* token-exempt: OS 고대비 포커스 링, 토큰화 대상 아님 */
```

사유 없는 `token-exempt`는 무효다.
