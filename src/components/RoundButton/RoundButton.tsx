/*
 * RoundButton — NHN Cloud 퍼블릭 존 pill 버튼.
 * 출처: Figma "NHN 실습 디자인시스템" node 256-2852 (Nhncloud/RoundButton).
 *   ⚠️ 콘솔 존 Button과 별개의 신규 컴포넌트다(콘솔 Button 미수정). 토큰만 공용 재사용.
 *
 * 변형 축:
 *  - size: lg · sm   (프레임 높이 48 · 40)
 *  - state: default · hover
 *      · hover 는 별도 prop 이 아니라 실제 `hover:` 유틸리티(상호작용 상태)로 구현.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  배경   fill/primary-01           → bg-fill-primary-01
 *         fill/primary-02           → hover:bg-fill-primary-02
 *  텍스트 fill/white                → text-static-white
 *  보더   border/primary            → border-border-primary
 *  라운드 Figma pill 라운드         → rounded-30 (높이의 절반으로 클램프되어 알약형)
 *  높이   프레임 48 · 40            → h-48 / h-40
 *  좌우   패딩 28 · 20              → px-28 / px-20
 *  레이블 Body Large 16/20 Medium   → type-body-large (lg)
 *         Body Base  15/22 Medium   → type-body-base  (sm)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";

/** 크기 (Figma 축 `size`). */
export type RoundButtonSize = "lg" | "sm";

/** 크기별 높이·좌우 패딩·레이블 타이포 유틸리티. */
const SIZE: Record<RoundButtonSize, string> = {
  lg: "h-48 px-28 type-body-large",
  sm: "h-40 px-20 type-body-base",
};

const BASE =
  "inline-flex items-center justify-center whitespace-nowrap select-none cursor-pointer " +
  "rounded-30 border border-border-primary bg-fill-primary-01 text-static-white " +
  "hover:bg-fill-primary-02 disabled:cursor-not-allowed";

export interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 크기. 기본 lg. (Figma 축 `size`) */
  size?: RoundButtonSize;
  /** 버튼 레이블. */
  children?: ReactNode;
}

export function RoundButton({
  size = "lg",
  type = "button",
  className,
  children,
  ...rest
}: RoundButtonProps) {
  return (
    <button
      type={type}
      className={[BASE, SIZE[size], className].filter(Boolean).join(" ")}
      data-node-id="256:2852"
      {...rest}
    >
      {children}
    </button>
  );
}
