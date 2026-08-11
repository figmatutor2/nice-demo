/*
 * TabMenuList — NHN 디자인시스템 언더라인형 페이지 탭의 "아이템 1개".
 * 출처: Figma "NHN 실습 디자인시스템" node 135-7059 (state=Default·active·hover·disabled, 4종 · 높이 42).
 *
 * 역할 구분: 이 컴포넌트는 탭 "한 칸"이다. 여러 칸을 담는 바(하단 border 포함)는 TabMenu 가 조립한다.
 *   같은 섹션의 박스형 토글(TabBox, 높이 36)과는 다른 컴포넌트다 — 언더라인 탭은 TabMenu 계열.
 *
 * 변형 축 (Figma state 4종 → 상태 구동 방식):
 *   - default   : 기본. 언더라인 없음(투명 border 유지).
 *   - active    : 선택 상태 → prop `active` (aria-selected). 하단 언더라인 = interactive/primary.
 *   - hover     : 상호작용 상태 → 별도 prop 아님. CSS `hover:` 로 하단 언더라인 = border/strong.
 *   - disabled  : 네이티브 `disabled` 속성으로 구동. 텍스트 text/disabled, hover 비활성.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *   텍스트   text/default            → text-text-default
 *            text/disabled           → text-text-disabled (disabled)
 *   언더라인 interactive/primary     → border-border-primary (active)
 *            border/strong           → hover:border-border-strong (hover)
 *   라벨     Body 13 R               → type-caption-base
 *   높이     42(스펙 고정)           → py-10 + type-caption-base(line-height 20) + border-b-2
 *                                      = 10+20+10+2 = 42. (Figma py-13 은 line-height 16 기준;
 *                                        프로젝트 13 텍스트 토큰 line-height 20 에 맞춰 py 를 보정해 동일 높이 유지.)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";

const BASE =
  "inline-flex flex-col items-center justify-center box-border border-b-2 border-transparent bg-transparent py-10 type-caption-base whitespace-nowrap select-none";

export interface TabMenuListProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 선택(active) 상태 여부. 하단 언더라인이 interactive/primary 로 표시된다. */
  active?: boolean;
  /** 탭 라벨. */
  children?: ReactNode;
}

export function TabMenuList({
  active = false,
  disabled = false,
  className,
  children,
  ...rest
}: TabMenuListProps) {
  const state = disabled
    ? "text-text-disabled cursor-not-allowed"
    : active
      ? "text-text-default border-border-primary cursor-pointer"
      : "text-text-default cursor-pointer hover:border-border-strong";

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={disabled}
      className={[BASE, state, className].filter(Boolean).join(" ")}
      data-node-id="135:7059"
      {...rest}
    >
      {children}
    </button>
  );
}
