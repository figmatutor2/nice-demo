/*
 * Dropdown — NHN 디자인시스템 ControlResource/Dropdown (트리거 전용).
 * 출처: Figma "NHN 실습 디자인시스템" node 130-4443 (state=default·hover·select·caution·disabled).
 *
 * 범위: Figma 심볼은 5종 모두 "닫힌 트리거"(h32)만 존재하고 열림 패널 디자인이 없어,
 *       이 컴포넌트는 트리거(닫힌 상태)만 구현한다. 옵션 목록 패널은 후속 작업으로 보류.
 *
 * 상태(state) → 구현:
 *  - hover    → 실제 `:hover` (border/default → border/strong)
 *  - disabled → 네이티브 `disabled` (레이블 opacity-40, 화살표는 유지)
 *  - caution  → `invalid` prop = 검증 오류. aria-invalid 연결 + border/caution
 *  - select   → "포커스·열림(활성)" 상태. `:focus-visible` 로 구동하며,
 *               패널 연결 시 `active` prop 으로 동일 시각(흰 배경 + border/strong)을 강제한다.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  배경   bg/surface       → bg-bg-surface   (default·hover·caution·disabled)
 *         fill/white       → bg-fill-white   (select·active)
 *  보더   border/default   → border-border-default
 *         border/strong    → border-border-strong  (hover·select·active)
 *         border/caution   → border-border-caution (caution)
 *  레이블 text/default     → text-text-default (disabled 시 opacity-40)
 *  아이콘 ic/arrowDown     → <Icon name="arrow-down">, text-icon-default
 *  라운드 radius/2         → rounded-2
 *  최소폭 min-width 117    → min-w-117 (--spacing-117)
 *  여백   pl 12 / pr 6 / py 6 → pl-12 pr-6 py-6
 *  간격   scale/4          → gap-4
 *  타이포 Body 13 R        → type-caption-base
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "../icons/Icon";

const BASE =
  "inline-flex items-center gap-4 min-w-117 pl-12 pr-6 py-6 rounded-2 border border-solid text-left text-icon-default cursor-pointer disabled:cursor-not-allowed";

export interface DropdownProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 트리거에 표시할 레이블. */
  label?: ReactNode;
  /** 검증 오류(caution) 상태 — aria-invalid 연결 + border/caution. */
  invalid?: boolean;
  /** 열림·활성(select) 상태 강제 — 포커스 시각(흰 배경 + border/strong)과 동일. 패널 연결 시 사용. */
  active?: boolean;
}

export function Dropdown({
  label = "label",
  invalid = false,
  active = false,
  disabled = false,
  type = "button",
  className,
  ...rest
}: DropdownProps) {
  // 배경·보더는 상태별로 완전 지정(같은 속성 유틸리티 충돌 방지 — Button 패턴과 동일).
  const state = invalid
    ? "bg-bg-surface border-border-caution"
    : disabled
      ? "bg-bg-surface border-border-default"
      : active
        ? "bg-fill-white border-border-strong"
        : "bg-bg-surface border-border-default enabled:hover:border-border-strong focus-visible:bg-fill-white focus-visible:border-border-strong";

  return (
    <button
      type={type}
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={active}
      aria-invalid={invalid || undefined}
      className={[BASE, state, className].filter(Boolean).join(" ")}
      data-node-id="130:4443"
      {...rest}
    >
      <span
        className={[
          "flex-1 min-w-0 type-caption-base text-text-default",
          disabled ? "opacity-40" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
      </span>
      <Icon name="arrow-down" />
    </button>
  );
}
