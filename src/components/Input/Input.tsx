/*
 * Input — NHN 디자인시스템 ControlResource/Input.
 * 출처: Figma "NHN 실습 디자인시스템" node 134-4515 (state=default·hover·disabled·caution).
 *
 * 네이티브 <input> 로 구현한다(값 입력·키보드·폼 연동은 브라우저 기본 동작 사용).
 *
 * 상태(state) → 구현:
 *  - hover    → 실제 `:hover` (border/default → border/strong)
 *  - disabled → 네이티브 `disabled` (surface 배경 + opacity-40)
 *  - caution  → `invalid` prop = 검증 오류. aria-invalid 연결 + border/status-critical
 *  ※ Figma엔 Input focus 시각이 없으나, a11y상 포커스 가시성이 필요해
 *    `:focus-visible`에 hover와 동일한 border/strong 을 적용한다(새 토큰 없음).
 *  ※ Figma는 caution 시 (비어있는)텍스트도 opacity-40 처리하나, 실제 오류 상태에서
 *    입력값 가독성을 위해 텍스트는 흐리지 않는다(보더만 오류색).
 *
 * a11y: `label` 지정 시 htmlFor 로 연결된 시각적 숨김(sr-only) <label>을 렌더한다.
 *       label 이 없으면 consumer 가 `aria-label`/`aria-labelledby` 를 넘겨야 한다.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  배경   fill/white       → bg-fill-white (default·hover·caution)
 *         bg/surface       → bg-bg-surface (disabled)
 *  보더   border/default   → border-border-default
 *         border/strong    → border-border-strong  (hover·focus)
 *         status/critical  → border-status-critical (caution)
 *  텍스트 text/default     → text-text-default (입력값 색. Figma는 text/primary였으나 요청에 따라 text/default 적용)
 *  라운드 radius/2         → rounded-2
 *  높이   32               → h-32
 *  최소폭 min-width 180    → min-w-180 (--spacing-180)
 *  여백   px 12 / py 6     → px-12 py-6
 *  타이포 Body 13 R        → type-caption-base
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import { useId, type InputHTMLAttributes } from "react";

const BASE =
  "h-32 min-w-180 px-12 py-6 rounded-2 border border-solid type-caption-base text-text-default";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 접근성 레이블(시각적 숨김 <label> 로 연결). 미지정 시 aria-label 등을 직접 넘긴다. */
  label?: string;
  /** 검증 오류(caution) 상태 — aria-invalid 연결 + border/status-critical. */
  invalid?: boolean;
}

export function Input({
  label,
  invalid = false,
  disabled = false,
  id,
  className,
  ...rest
}: InputProps) {
  const reactId = useId();
  const inputId = id ?? reactId;

  // 배경·보더는 상태별로 완전 지정(같은 속성 유틸리티 충돌 방지).
  const state = invalid
    ? "bg-fill-white border-status-critical"
    : disabled
      ? "bg-bg-surface border-border-default opacity-40"
      : "bg-fill-white border-border-default enabled:hover:border-border-strong focus-visible:border-border-strong";

  return (
    <>
      {label ? (
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={[BASE, state, className].filter(Boolean).join(" ")}
        data-node-id="134:4515"
        {...rest}
      />
    </>
  );
}
