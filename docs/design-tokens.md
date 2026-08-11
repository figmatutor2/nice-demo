# Design Tokens — 매핑 테이블

Figma "NHN 실습 디자인시스템" → 코드 토큰 매핑. 추출: `get_variable_defs` (node `146-10144`).

- 변환 규칙: Figma 변수명 `/` → CSS `-` (예: `text/primary` → `--color-text-primary`).
- 구조: **Primitive → Semantic 참조**. Primitive는 `:root` 팔레트(유틸리티 미생성), Semantic만 `@theme`에서 유틸리티 생성.
- raw hex는 `src/tokens/*.tokens.css`(SSOT)에만 존재. 컴포넌트는 semantic 유틸리티만 사용.

## 진행 상태

| 카테고리 | 상태 | 파일 |
|----------|------|------|
| **Color** | ✅ 완료 | `src/tokens/colors.tokens.css` |
| **Spacing** (`scale/*`) | ✅ 완료 | `src/tokens/spacing.tokens.css` |
| **Radius** (`radius/*`) | ✅ 완료 | `src/tokens/radius.tokens.css` |
| **Typography** (Text Styles, @utility) | ✅ 완료 | `src/tokens/typography.tokens.css` |
| **Shadow** | ✅ 완료 (컴포넌트 effect 유래, Figma 공용 변수 없음) | `src/tokens/shadows.tokens.css` |
| **Breakpoint** | ✅ 완료 (Tailwind 기본값, Figma 출처 없음) | `src/tokens/breakpoint.tokens.css` |

---

## 2026-07-14 재동기화 결과 (READ + DIFF)

Figma cleanup(하드코딩→토큰 연결, 외부 라이브러리 참조→로컬 변수 교체, 일부 텍스트 스타일 정리) 후 재동기화.
읽은 노드: `146-10144`(전체 변수+텍스트 스타일), `75:3942`(타이포), `155:5240`(spacing), `155:5329`(radius).

- **값 변경 0건.** 색·간격·라디우스·타이포(size/lineHeight/weight) 모두 기존 코드 값과 일치 — cleanup은 값 보존형이었음을 확인. 토큰 값은 변경하지 않음(주석·문서만 갱신).
- **'Label' 텍스트 스타일 삭제:** Figma에서 없어짐. 코드에 대응 유틸리티(`type-label`)가 없어 지울 토큰 없음.
- **15px → Body Base 통합 (이관 완료):** Figma의 유일한 15px 스타일은 `Body Base`(15/22/500). `type-button-lg`(15/18/400)를 뒷받침하던 Figma 스타일은 삭제됨. figma-implementer가 node `106:4623` 실측으로 Button lg 레이블 = `Typography/Body Base`(15/22/500) 링크임을 확인하고 `Button.tsx`의 `LABEL.lg`를 `type-button-lg` → `type-body-base`로 이관 완료. 이로써 `type-button-lg`는 className 사용처 0건이 되어 **유틸리티를 코드에서 제거**함(code↔Figma 일치). 이관에 따른 시각 변화: line-height 18→22, weight 400(Regular)→500(Medium).
- **code-only 토큰(Figma 부재이나 사용 중 → 유지):**
  - `--color-text-placeholder` / `--palette-neutral-550`(#c8ccd4) — Figma에 `text/placeholder`·`neutral/550` 없음.
  - `--spacing-32` — Pagination size-32·Input h-32·Toolbar h-32.  `--spacing-40` — Button lg h-40·RoundButton sm h-40·Modal overlay p-40.
- **참조 한계:** `get_variable_defs`는 최종 해석값(hex/px)만 반환하므로 "하드코딩→토큰 연결·외부 참조→로컬 변수 교체" 같은 **참조 출처 변경은 개별 관측 불가.** 단 최종값이 코드와 전부 일치 → CSS 출력 무변화 확인.

---

## 2026-07-15 타이포 정합 감사

전 컴포넌트 타이포 정합 감사 실시.

- **NhncloudGnb → Body Large 이관:** GNB 메뉴 텍스트가 Figma 공유 스타일 `Typography/Body Large`(16/20/500)임이 figma-implementer node `256:2900` 실측으로 확인됨. 기존 `type-nav`(17/26/500)는 Figma 근거 없던 code-only 값이었음. NhncloudGnb.tsx를 `type-nav` → `type-body-large`로 이관 완료. 이로써 `type-nav`는 className 사용처 0건 orphan이 되어 **유틸리티를 코드에서 제거**함. 이관에 따른 시각 변화: size 17→16, line-height 26→20.
- **결과: code-only 타이포 유틸리티 0개.** 타이포 유틸리티 10개 전부 Figma 텍스트 스타일과 1:1 대응.
- **정합 확인·코드 미수정(Figma 후속 사안):**
  - Button lg secondary/tertiary는 Figma 로컬 15/18/400 잔재이나 코드는 `type-body-base`(Body Base) 유지.
  - Footer 링크 line-height 40은 바 센터링 관용.
  - 둘 다 코드 미수정, Figma 측 후속 사안으로 남김.

---

## Color — Primitive 팔레트

`:root` 의 `--palette-*` 변수(`--color-` 접두사 미사용). 유틸리티 미생성(semantic을 통해서만 사용).

| Figma 변수 | CSS 토큰 | 값 |
|------------|----------|-----|
| `blue/100` | `--palette-blue-100` | `#e9f1ff` |
| `blue/200` | `--palette-blue-200` | `#c8dcff` |
| `blue/300` | `--palette-blue-300` | `#a6c6ff` |
| `blue/400` | `--palette-blue-400` | `#84b1ff` |
| `blue/500` | `--palette-blue-500` | `#609afe` |
| `blue/600` | `--palette-blue-600` | `#377cf4` |
| `blue/700` | `--palette-blue-700` | `#125de6` |
| `blue/800` | `--palette-blue-800` | `#1446c8` |
| `blue/900` | `--palette-blue-900` | `#162faa` |
| `neutral/100` | `--palette-neutral-100` | `#f9f9f9` |
| `neutral/200` | `--palette-neutral-200` | `#f4f4f4` |
| `neutral/300` | `--palette-neutral-300` | `#eeeeee` |
| `neutral/400` | `--palette-neutral-400` | `#e5e5e5` |
| `neutral/500` | `--palette-neutral-500` | `#dddddd` |
| `neutral/600` | `--palette-neutral-600` | `#cccccc` |
| `neutral/700` | `--palette-neutral-700` | `#aaaaaa` |
| `neutral/800` | `--palette-neutral-800` | `#777777` |
| `neutral/850` | `--palette-neutral-850` | `#444444` |
| `neutral/900` | `--palette-neutral-900` | `#555555` |
| `red/100` | `--palette-red-100` | `#fff0f0` |
| `red/200` | `--palette-red-200` | `#ffd6d6` |
| `red/300` | `--palette-red-300` | `#ffadad` |
| `red/500` | `--palette-red-500` | `#e14040` |
| `red/700` | `--palette-red-700` | `#b31111` |
| `green/100` | `--palette-green-100` | `#f2ffe8` |
| `green/200` | `--palette-green-200` | `#c4eed4` |
| `green/300` | `--palette-green-300` | `#6fd395` |
| `green/500` | `--palette-green-500` | `#1ca653` |
| `green/700` | `--palette-green-700` | `#1a7a33` |
| `purple/100` | `--palette-purple-100` | `#f6e9ff` |
| `purple/200` | `--palette-purple-200` | `#e2c4ff` |
| `purple/300` | `--palette-purple-300` | `#bf84f5` |
| `purple/500` | `--palette-purple-500` | `#9421db` |
| `purple/700` | `--palette-purple-700` | `#6b18a0` |

## Color — Semantic 토큰

`@theme` 변수. `bg-*`, `text-*`, `border-*` 유틸리티 생성. 값은 primitive 참조.

| Figma 변수 | CSS 토큰 | 참조 primitive | 값 | 유틸리티 예 |
|------------|----------|----------------|-----|-------------|
| `static/white` | `--color-static-white` | (고정) | `#ffffff` | `text-static-white` |
| `static/black` | `--color-static-black` | (고정) | `#222222` | `bg-static-black` |
| `text/default` | `--color-text-default` | `static/black` | `#222222` | `text-text-default` |
| `text/primary` | `--color-text-primary` | `blue/700` | `#125de6` | `text-text-primary` |
| `text/secondary` | `--color-text-secondary` | `neutral/900` | `#555555` | `text-text-secondary` |
| `text/disabled` | `--color-text-disabled` | `neutral/700` | `#aaaaaa` | `text-text-disabled` |
| `bg/canvas` | `--color-bg-canvas` | `static/white` | `#ffffff` | `bg-bg-canvas` |
| `bg/surface` | `--color-bg-surface` | `neutral/100` | `#f9f9f9` | `bg-bg-surface` |
| `bg/subtle` | `--color-bg-subtle` | `neutral/200` | `#f4f4f4` | `bg-bg-subtle` |
| `bg/muted` | `--color-bg-muted` | `neutral/400` | `#e5e5e5` | `bg-bg-muted` |
| `bg/inverse` | `--color-bg-inverse` | `neutral/850` | `#444444` | `bg-bg-inverse` |
| `border/subtle` | `--color-border-subtle` | `neutral/300` | `#eeeeee` | `border-border-subtle` |
| `border/default` | `--color-border-default` | `neutral/500` | `#dddddd` | `border-border-default` |
| `border/medium` | `--color-border-medium` | `neutral/600` | `#cccccc` | `border-border-medium` |
| `border/strong` | `--color-border-strong` | `neutral/700` | `#aaaaaa` | `border-border-strong` |
| `border/primary` | `--color-border-primary` | `blue/700` | `#125de6` | `border-border-primary` |
| `border/caution` | `--color-border-caution` | `red/700` | `#b31111` | `border-border-caution` |
| `border/inverse` | `--color-border-inverse` | `static/white` | `#ffffff` | `border-border-inverse` |
| `icon/default` | `--color-icon-default` | `static/black` | `#222222` | `text-icon-default` |
| `icon/subtle` | `--color-icon-subtle` | `neutral/700` | `#aaaaaa` | `text-icon-subtle` |
| `icon/accent` | `--color-icon-accent` | `blue/700` | `#125de6` | `text-icon-accent` |
| `icon/on-white` | `--color-icon-on-white` | `neutral/100` | `#f9f9f9` | `text-icon-on-white` |
| `icon/tertiary` | `--color-icon-tertiary` | `neutral/500` | `#dddddd` | `text-icon-tertiary` |
| `interactive/primary` | `--color-interactive-primary` | `blue/700` | `#125de6` | `bg-interactive-primary` |
| `interactive/hover` | `--color-interactive-hover` | `blue/800` | `#1446c8` | `hover:bg-interactive-hover` |
| `interactive/light` | `--color-interactive-light` | `blue/100` | `#e9f1ff` | `bg-interactive-light` |
| `status/critical` | `--color-status-critical` | `red/500` | `#e14040` | `text-status-critical` |
| `status/critical-surface` | `--color-status-critical-surface` | `red/100` | `#fff0f0` | `bg-status-critical-surface` |
| `status/success` | `--color-status-success` | `green/500` | `#1ca653` | `text-status-success` |
| `status/success-surface` | `--color-status-success-surface` | `green/100` | `#f2ffe8` | `bg-status-success-surface` |
| `status/urgent` | `--color-status-urgent` | `purple/500` | `#9421db` | `text-status-urgent` |
| `status/urgent-surface` | `--color-status-urgent-surface` | `purple/100` | `#f6e9ff` | `bg-status-urgent-surface` |
| `status/info` | `--color-status-info` | `blue/400` | `#84b1ff` | `text-status-info` |
| `status/info-surface` | `--color-status-info-surface` | `blue/100` | `#e9f1ff` | `bg-status-info-surface` |
| `fill/default` | `--color-fill-default` | `static/black` | `#222222` | `bg-fill-default` |
| `fill/primary-01` | `--color-fill-primary-01` | `blue/700` | `#125de6` | `bg-fill-primary-01` |
| `fill/primary-02` | `--color-fill-primary-02` | `blue/800` | `#1446c8` | `bg-fill-primary-02` |
| `fill/secondary-01` | `--color-fill-secondary-01` | `neutral/800` | `#777777` | `bg-fill-secondary-01` |
| `fill/secondary-02` | `--color-fill-secondary-02` | `neutral/900` | `#555555` | `bg-fill-secondary-02` |
| `fill/tertiary-01` | `--color-fill-tertiary-01` | `neutral/100` | `#f9f9f9` | `bg-fill-tertiary-01` |
| `fill/subtle` | `--color-fill-subtle` | `neutral/100` | `#f9f9f9` | `bg-fill-subtle` |
| `fill/muted` | `--color-fill-muted` | `neutral/400` | `#e5e5e5` | `bg-fill-muted` |
| `fill/white` | `--color-fill-white` | `static/white` | `#ffffff` | `bg-fill-white` |

> 참고: Figma에서 `neutral/850`(#444444)이 `neutral/900`(#555555)보다 어둡다 — 원본 데이터 그대로 유지함.

## Typography — Text Styles ↔ @utility

Figma 텍스트 스타일(node `75:3942`) → 코드 `@utility`. 값 형식: size / lineHeight / weight.
size·lineHeight·weight가 묶인 합성이라 CSS 변수가 아니라 `@utility` 클래스로 생성한다.

| Figma 텍스트 스타일 | 코드 유틸리티 | size / lh / weight | style |
|---|---|---|---|
| `Typography/Display` | `type-display` | 34 / 50 / 700 | Bold |
| `Typography/Heading 1` | `type-heading-1` | 22 / 34 / 400 | Regular |
| `Typography/Heading 2` | `type-heading-2` | 20 / 28 / 400 | Regular |
| `Typography/Heading 3` | `type-heading-3` | 19 / 34 / 700 | Bold |
| `Typography/Heading 4` | `type-heading-4` | 18 / 44 / 400 | Regular |
| `Typography/Body Large` | `type-body-large` | 16 / 20 / 500 | Medium |
| `Typography/Body Base` | `type-body-base` | 15 / 22 / 500 | Medium |
| `Typography/Body Small` | `type-body-small` | 14 / 20 / 400 | Regular |
| `Typography/Caption Base` | `type-caption-base` | 13 / 20 / 400 | Regular |
| `Typography/Caption Small` | `type-caption-small` | 12 / 18 / 400 | Regular |

> **code-only 타이포 없음** — 유틸리티 10개 모두 Figma 텍스트 스타일과 1:1 대응.
> `type-button-lg`(15/18/400)는 Body Base 통합으로 Button lg가 `type-body-base` 이관 후 제거(2026-07-14).
> `type-nav`(17/26/500)는 Figma 근거 없던 code-only 값으로, NhncloudGnb 실제 스펙이 Body Large(16/20/500)임이 확인되어 `type-body-large` 이관 후 제거(2026-07-15).
