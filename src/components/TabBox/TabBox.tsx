/*
 * TabBox — NHN 디자인시스템 박스형 토글 "아이템 1개".
 * 출처: Figma "NHN 실습 디자인시스템" node 137-7401 (state=default·hover·active, 3종 · 높이 36).
 *
 * 역할 구분: 채워진 박스형 토글(필터 등). 언더라인형 페이지 탭(TabMenuList, 높이 42)과는 다른 계열.
 *   여러 개를 gap 으로 묶는 그룹은 TabBoxGroup 이 조립한다.
 *
 * 변형 축 (Figma state 3종 → 상태 구동 방식):
 *   - default : 기본. 배경 bg/subtle.
 *   - hover   : 상호작용 상태 → 별도 prop 아님. CSS `hover:` 로 배경 interactive/light.
 *   - active  : 선택 상태 → prop `active` (aria-pressed). 배경 fill/white + 좌·우·상단 border(primary),
 *               하단은 열림(아래 콘텐츠와 연결되는 형태).
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *   배경    bg/subtle              → bg-bg-subtle (default)
 *           interactive/light      → hover:bg-interactive-light (hover)
 *           fill/white             → bg-fill-white (active)
 *   보더    border/primary         → border-border-primary (active, 상·좌·우)
 *   텍스트  text/default           → text-text-default
 *   라벨    Body 13 R              → type-caption-base
 *   여백    scale 25               → px-25
 *   높이    36(스펙 고정)          → 비active: py-8 + type-caption-base(line-height 20) = 8+20+8 = 36.
 *                                    active: 상단 border 2 를 반영해 pt-6 pb-8 로 6+20+8+2 = 36 유지(라벨 중앙).
 *                                    (Figma py-10 은 line-height 16 기준; 프로젝트 13 토큰 line-height 20 에
 *                                     맞춰 py 를 보정해 동일 높이 36 유지.)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";

const BASE =
  "inline-flex items-center justify-center box-border px-25 type-caption-base text-text-default text-center whitespace-nowrap cursor-pointer select-none";

export interface TabBoxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 선택(active) 상태 여부. 배경 white + 상·좌·우 border(primary), 하단 열림. */
  active?: boolean;
  /** 토글 라벨. */
  children?: ReactNode;
}

export function TabBox({ active = false, className, children, ...rest }: TabBoxProps) {
  const state = active
    ? "bg-fill-white border-t-2 border-x-2 border-border-primary pt-6 pb-8"
    : "bg-bg-subtle py-8 hover:bg-interactive-light";

  return (
    <button
      type="button"
      aria-pressed={active}
      className={[BASE, state, className].filter(Boolean).join(" ")}
      data-node-id="137:7401"
      {...rest}
    >
      {children}
    </button>
  );
}
