/*
 * AccountMenuItem — 계정 드롭다운(AccountMenu)의 항목 한 줄.
 * 출처: Figma "NHN 실습 디자인시스템" node 253-2555 (state=default·hover, 각 154×30).
 *
 * 범위: 클릭 가능한 메뉴 항목 1개. AccountMenu 조립본이 항목마다 하나씩 렌더한다.
 *
 * 상태(state) → 구현:
 *  - default → 기본 텍스트 색(text/default). 흰 배경.
 *  - hover   → 실제 `:hover` 로 텍스트만 파랑(text/primary)으로. Figma hover 심볼과 동일.
 *              (상태는 prop 이 아니라 CSS :hover — hover 를 prop 으로 두지 않는다.)
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  타이포   Caption Small(12/18) → type-caption-small
 *  텍스트   text/default         → text-text-default   (default)
 *           text/primary         → hover:text-text-primary (hover)
 *  배경     fill/white           → bg-bg-canvas
 *  좌우패딩 scale/20             → px-20
 *  상하패딩 scale/6              → py-6
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 * 폭은 고정하지 않고 부모(AccountMenu 패널)를 따른다(`w-full`).
 */

import type { ButtonHTMLAttributes } from "react";

export interface AccountMenuItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 항목에 표시할 라벨. */
  label: string;
}

const BASE =
  "flex w-full items-center px-20 py-6 type-caption-small text-left whitespace-nowrap " +
  "bg-bg-canvas text-text-default hover:text-text-primary cursor-pointer";

export function AccountMenuItem({
  label,
  type = "button",
  className,
  ...rest
}: AccountMenuItemProps) {
  return (
    <button
      type={type}
      className={[BASE, className].filter(Boolean).join(" ")}
      data-node-id="253:2555"
      {...rest}
    >
      {label}
    </button>
  );
}
