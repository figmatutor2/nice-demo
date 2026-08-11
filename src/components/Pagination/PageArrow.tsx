/*
 * PageArrow — NHN 디자인시스템 페이지네이션 화살표 버튼 (PageResource/arrow*Area).
 * 출처: Figma "NHN 실습 디자인시스템" node 109-4837(arrowLeftArea)/109-4838(arrowRightArea).
 *   각 area(가로 63)는 화살표 버튼 2개로 구성 — 이 컴포넌트는 버튼 1개(32×32)를 렌더한다.
 *   Figma 화살표 심볼은 플랫 이미지로 내려오므로, 셰브런은 프로젝트 Icon 세트를 재사용한다.
 *
 * 방향(direction) → 아이콘 / 레이블:
 *  - first → chevron-double-left  / "첫 페이지"
 *  - prev  → chevron-left         / "이전 페이지"
 *  - next  → chevron-right        / "다음 페이지"
 *  - last  → chevron-double-right / "마지막 페이지"
 *
 * 상태 → 구현:
 *  - enabled  → 셰브런 icon/subtle. 클릭 가능.
 *  - disabled → 경계(첫/마지막 페이지)에서 dimmed. 셰브런 icon/tertiary + 네이티브 disabled +
 *               aria-disabled. 박스(배경·보더)는 동일하게 유지, 셰브런 색만 흐려진다.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  크기   size 32         → size-32 (--spacing-32)
 *  배경   fill/white      → bg-fill-white
 *  보더   border/default  → border-border-default
 *  라운드 radius/2        → rounded-2
 *  아이콘 icon/subtle     → text-icon-subtle   (enabled)
 *         icon/tertiary   → text-icon-tertiary (disabled = dimmed)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 * 접근성: 버튼에 방향별 aria-label(첫/이전/다음/마지막 페이지). 셰브런 Icon 은 장식용.
 */

import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "../icons/Icon";

/** 화살표 방향 (Figma arrowLeftArea/arrowRightArea 의 4개 버튼). */
export type ArrowDirection = "first" | "prev" | "next" | "last";

const ARROW: Record<ArrowDirection, { icon: IconName; label: string }> = {
  first: { icon: "chevron-double-left", label: "첫 페이지" },
  prev: { icon: "chevron-left", label: "이전 페이지" },
  next: { icon: "chevron-right", label: "다음 페이지" },
  last: { icon: "chevron-double-right", label: "마지막 페이지" },
};

export interface PageArrowProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 화살표 방향 — 아이콘과 접근성 레이블을 결정한다. */
  direction: ArrowDirection;
}

const BASE =
  "inline-flex items-center justify-center size-32 bg-fill-white border border-solid border-border-default rounded-2 cursor-pointer disabled:cursor-not-allowed";

export function PageArrow({
  direction,
  disabled = false,
  type = "button",
  className,
  ...rest
}: PageArrowProps) {
  const { icon, label } = ARROW[direction];
  // 박스는 두 상태 동일. disabled 는 셰브런 색만 흐리게(icon/tertiary).
  const state = disabled ? "text-icon-tertiary" : "text-icon-subtle";

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-label={label}
      className={[BASE, state, className].filter(Boolean).join(" ")}
      data-node-id="109:4837"
      {...rest}
    >
      <Icon name={icon} size={20} />
    </button>
  );
}
