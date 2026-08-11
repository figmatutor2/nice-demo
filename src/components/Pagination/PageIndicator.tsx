/*
 * PageIndicator — NHN 디자인시스템 페이지네이션 숫자 셀 (PageResource/PageIndicator).
 * 출처: Figma "NHN 실습 디자인시스템" node 109-4777 (state=active·default·hover, 각 32×32).
 *
 * 범위: 페이지 번호 한 칸(32×32). Pagination 조립본이 페이지마다 하나씩 렌더한다.
 *
 * 상태(state) → 구현:
 *  - default → 기본 칸 (surface 배경 + border/default). 클릭 시 다른 페이지로 이동.
 *  - hover   → 실제 `:hover` (border/default → border/medium, radius/2). Figma hover 심볼과 동일.
 *  - active  → 현재 페이지(`active` prop). interactive/primary 배경 + 흰 텍스트, aria-current="page".
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  크기   size 32           → size-32 (--spacing-32)
 *  배경   fill/tertiary-01  → bg-fill-tertiary-01   (default·hover)
 *         interactive/primary → bg-interactive-primary (active)
 *  보더   border/default    → border-border-default (default)
 *         border/medium     → border-border-medium  (hover)
 *  텍스트 Neutral/Black     → text-text-default     (default·hover)
 *         fill/white        → text-fill-white        (active)
 *  라운드 radius/2          → rounded-2 (hover)
 *  타이포 Body 13 R         → type-caption-base
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 * 접근성: 현재 페이지 셀은 aria-current="page".
 */

import type { ButtonHTMLAttributes } from "react";

export interface PageIndicatorProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 셀에 표시할 페이지 번호. */
  page: number;
  /** 현재 페이지(active) 여부 — 파란 배경 + 흰 텍스트 + aria-current. */
  active?: boolean;
}

const BASE =
  "inline-flex items-center justify-center size-32 type-caption-base text-center cursor-pointer";

export function PageIndicator({
  page,
  active = false,
  type = "button",
  className,
  ...rest
}: PageIndicatorProps) {
  // 배경·보더·텍스트를 상태별로 완전 지정(같은 속성 유틸리티 충돌 방지 — Dropdown 패턴과 동일).
  const state = active
    ? "bg-interactive-primary text-fill-white"
    : "bg-fill-tertiary-01 border border-solid border-border-default text-text-default hover:border-border-medium hover:rounded-2";

  return (
    <button
      type={type}
      aria-current={active ? "page" : undefined}
      className={[BASE, state, className].filter(Boolean).join(" ")}
      data-node-id="109:4777"
      {...rest}
    >
      {page}
    </button>
  );
}
