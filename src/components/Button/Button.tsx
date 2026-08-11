/*
 * Button — NHN 디자인시스템 버튼.
 * 출처: Figma "NHN 실습 디자인시스템" node 106-4623 (Button, 3 size × 3 type × 3 state = 27 심볼).
 *
 * 변형 축:
 *  - size:    sm · md · lg   (프레임 높이 24 · 32 · 40)
 *  - variant: primary · secondary · tertiary   (Figma 축 이름 `type`, HTML `type` 속성과 충돌 피해 rename)
 *  - state:   default · hover · disabled
 *      · hover 는 별도 prop 이 아니라 실제 `hover:` 유틸리티(상호작용 상태)로 구현.
 *      · disabled 는 네이티브 `disabled` 속성으로 구동.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  배경   fill/primary-01·02        → bg-fill-primary-01 / hover:bg-fill-primary-02
 *         fill/secondary-01·02      → bg-fill-secondary-01 / hover:bg-fill-secondary-02
 *         fill/tertiary-01          → bg-fill-tertiary-01
 *  텍스트 fill/white                → text-static-white
 *         text/default              → text-text-default   (tertiary)
 *         text/disabled             → text-text-disabled  (tertiary disabled)
 *  보더   border/default            → border-border-default        (tertiary)
 *         border/strong             → hover:border-border-strong   (tertiary hover)
 *  disabled(primary·secondary)      → opacity-40 (Figma 레이어 불투명도 40%, 동일 fill 유지)
 *  라운드 radius/2                  → rounded-2
 *  높이   24 · 32 · 40              → h-24 / h-32 / h-40
 *  여백   scale 8·4 / 12·6 / 13·11  → px-8 py-4 / px-12 py-6 / px-13 py-11
 *  간격   scale 1 / 2               → gap-1 / gap-2
 *  레이블 Body 13 R                 → type-caption-base (sm·md)
 *         Button lg → Body Base 15/22/500 → type-body-base (lg)
 *  아이콘 size-20, 색은 currentColor 상속(레이블 색과 동일) → <Icon> 기본 크기
 *  최소너비 Figma min-width md 47 / lg 86 → min-w-47 / min-w-86 (sm은 min-width 없음)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 * 좌우 패딩(px-8/12/13)은 아이콘 유무와 무관하게 항상 유지되고, min-width가 짧은 레이블에도 최소 너비를 보장한다.
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "../icons/Icon";

/** 시각 유형 (Figma 축 `type`). */
export type ButtonVariant = "primary" | "secondary" | "tertiary";
/** 크기 (Figma 축 `size`). */
export type ButtonSize = "sm" | "md" | "lg";

/** 크기별 높이·여백·간격 유틸리티. */
const SIZE: Record<ButtonSize, string> = {
  sm: "h-24 gap-1 px-8 py-4",
  md: "h-32 gap-1 px-12 py-6 min-w-47",
  lg: "h-40 gap-2 px-13 py-11 min-w-86",
};

/** 크기별 레이블 타이포 유틸리티. */
const LABEL: Record<ButtonSize, string> = {
  sm: "type-caption-base",
  md: "type-caption-base",
  lg: "type-body-base",
};

/** 유형별 배경·텍스트·보더 (enabled = default+hover, disabled 별도). */
const VARIANT: Record<ButtonVariant, { enabled: string; disabled: string }> = {
  primary: {
    enabled: "bg-fill-primary-01 text-static-white hover:bg-fill-primary-02",
    disabled: "bg-fill-primary-01 text-static-white opacity-40",
  },
  secondary: {
    enabled: "bg-fill-secondary-01 text-static-white hover:bg-fill-secondary-02",
    disabled: "bg-fill-secondary-01 text-static-white opacity-40",
  },
  tertiary: {
    // 레이블 색은 size별로 다름(아래 TERTIARY_LABEL 참조)이라 여기선 배경·보더만.
    enabled:
      "bg-fill-tertiary-01 border border-border-default hover:border-border-strong",
    disabled:
      "bg-fill-tertiary-01 text-text-disabled border border-border-default",
  },
};

/**
 * tertiary enabled 레이블 색 (Figma node 106-4623 실측):
 *  - sm  : 기본 text/secondary → hover 시 text/default 로 전환
 *  - md·lg: text/default 고정
 * (disabled 는 VARIANT.tertiary.disabled 의 text-text-disabled 로 처리)
 */
const TERTIARY_LABEL: Record<ButtonSize, string> = {
  sm: "text-text-secondary hover:text-text-default",
  md: "text-text-default",
  lg: "text-text-default",
};

const BASE =
  "inline-flex items-center justify-center whitespace-nowrap rounded-2 select-none cursor-pointer disabled:cursor-not-allowed";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 시각 유형. 기본 primary. (Figma 축 `type`) */
  variant?: ButtonVariant;
  /** 크기. 기본 md. */
  size?: ButtonSize;
  /** 레이블 앞 아이콘(선택). Icon 세트 이름. */
  leadingIcon?: IconName;
  /** 레이블 뒤 아이콘(선택). Icon 세트 이름. */
  trailingIcon?: IconName;
  /** 버튼 레이블. */
  children?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  disabled = false,
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  const state = disabled ? VARIANT[variant].disabled : VARIANT[variant].enabled;
  // tertiary enabled 만 size별 레이블 색 오버라이드(sm=text/secondary, md·lg=text/default).
  const tertiaryLabel =
    variant === "tertiary" && !disabled ? TERTIARY_LABEL[size] : "";

  return (
    <button
      type={type}
      disabled={disabled}
      className={[BASE, SIZE[size], LABEL[size], state, tertiaryLabel, className]
        .filter(Boolean)
        .join(" ")}
      data-node-id="106:4623"
      {...rest}
    >
      {leadingIcon ? <Icon name={leadingIcon} /> : null}
      {children != null ? <span>{children}</span> : null}
      {trailingIcon ? <Icon name={trailingIcon} /> : null}
    </button>
  );
}
