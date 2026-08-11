/*
 * Checkbox — NHN 디자인시스템 체크박스 (범용 폼 원자).
 * 출처: Figma "NHN 실습 디자인시스템" node 100-5273 (Checkbox, state 4종).
 *
 * Figma 의 단일 `state` 축(default·active·danger·disabled)을 직교 props 로 재해석:
 *  - active   → `checked` (네이티브 checked/defaultChecked)
 *  - danger   → `danger` prop (검증 실패 스타일)
 *  - disabled → 네이티브 `disabled` 속성
 *  - hover 상태는 디자인에 없음 → hover 스타일 미구현.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  박스   size 15                    → size-15
 *  라운드 radius/1                   → rounded-1
 *  배경   fill/white                 → bg-fill-white
 *         fill/primary-01 (checked)  → peer-checked:bg-fill-primary-01
 *         bg/subtle (disabled)       → peer-disabled:bg-bg-subtle
 *  보더   border/default             → border-border-default
 *         Functional/Red 3 (danger)  → border-border-caution (승인된 근사 토큰)
 *  체크   fill/white                 → text-static-white (currentColor)
 *  라벨   Body 13 R                  → type-caption-base
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 * 접근성: 네이티브 <input type="checkbox"> 를 <label> 로 감싸 라벨을 연결한다.
 * label 미지정 시 호출부가 aria-label 을 제공해야 한다(Table 행 선택 등).
 */

import type { InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** 위험(검증 실패) 스타일 — 보더를 caution 색으로. (Figma state=danger) */
  danger?: boolean;
  /** 체크박스 우측 라벨(선택). 지정 시 클릭 영역에 포함되어 label 이 연결된다. */
  label?: ReactNode;
}

/** 체크 표시 — 흰색 체크(currentColor). 장식용(aria-hidden). 표시 여부는 래퍼가 제어. */
function CheckMark() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden className="size-11 text-static-white">
      <path
        d="M2.5 6.2 5 8.7 9.5 3.5"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Checkbox({ danger = false, label, className, disabled, ...rest }: CheckboxProps) {
  // 박스: 기본은 흰 배경 + border/default, danger 시 border/caution.
  // checked/disabled 는 peer 변형으로 네이티브 상태를 반영(소스 순서상 checked 가 우선).
  const box = [
    "grid place-items-center size-15 rounded-1 border shrink-0",
    danger ? "border-border-caution" : "border-border-default",
    "bg-fill-white",
    "peer-checked:bg-fill-primary-01 peer-checked:border-fill-primary-01",
    "peer-disabled:bg-bg-subtle peer-disabled:border-border-default",
    "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-fill-primary-01",
  ].join(" ");

  return (
    <label
      className={[
        "relative inline-flex items-center gap-8 select-none",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input type="checkbox" disabled={disabled} className="peer sr-only" {...rest} />
      {/* 박스와 체크는 input 의 형제여야 peer-checked 가 도달한다(중첩 시 미적용). */}
      <span className={box} aria-hidden />
      <span className="pointer-events-none absolute left-0 top-1/2 grid size-15 -translate-y-1/2 place-items-center opacity-0 peer-checked:opacity-100">
        <CheckMark />
      </span>
      {label != null && (
        <span className="type-caption-base text-text-default peer-disabled:text-text-disabled">
          {label}
        </span>
      )}
    </label>
  );
}
