/*
 * TextInput — NHN Cloud 퍼블릭 존 텍스트 입력.
 * 출처: Figma "NHN 실습 디자인시스템" node 256-2888 (Nhncloud/TextInput).
 *   ⚠️ 콘솔 존 Input과 별개의 신규 컴포넌트다(콘솔 Input 미수정). 토큰만 공용 재사용.
 *
 * 상태:
 *  - default / hover : hover 는 별도 prop 이 아니라 실제 `hover:` 유틸리티로 구현.
 *  - caution         : 에러 상태를 `caution` prop 으로 구동. `message` prop 의 에러 문구를
 *                      입력 아래에 표시하고, `aria-invalid` + `aria-describedby` 로 연결.
 *
 * 폭: Figma 프레임 폭(440)은 프레임 값이므로 컴포넌트는 w-full — 컨테이너가 폭을 결정한다.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  배경   sds background default(white) → bg-fill-white
 *  보더   border/default                → border-border-default
 *         border/strong                 → hover:border-border-strong
 *         status/critical (caution)     → border-status-critical
 *  텍스트 입력값 text/default           → text-text-default
 *         플레이스홀더 (raw 승격)       → placeholder:text-text-placeholder
 *         에러문구 status/critical      → text-status-critical
 *  라운드 Figma 입력 라운드             → rounded-8
 *  높이   프레임 48                     → h-48
 *  좌우   패딩 scale/16                 → px-16
 *  간격   입력↔에러문구 scale/5         → gap-5
 *  타이포 Body Large 16/20 Medium       → type-body-large (입력)
 *         Caption Small 12/18 Regular   → type-caption-small (에러문구)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import { useId, type InputHTMLAttributes } from "react";

const BASE =
  "w-full h-48 rounded-8 border bg-fill-white px-16 " +
  "type-body-large text-text-default placeholder:text-text-placeholder";

/** caution 여부에 따른 보더 유틸리티 (caution 은 hover 전환 없이 critical 고정). */
const BORDER = {
  default: "border-border-default hover:border-border-strong",
  caution: "border-status-critical",
} as const;

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 에러(주의) 상태. true 면 critical 보더 + aria-invalid 연결. 기본 false. */
  caution?: boolean;
  /** 에러 문구. caution 일 때 입력 아래에 표시되고 aria-describedby 로 연결된다. */
  message?: string;
}

export function TextInput({
  caution = false,
  message,
  id,
  className,
  ...rest
}: TextInputProps) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const messageId = `${inputId}-message`;
  const showMessage = caution && message != null && message !== "";

  return (
    <div className="flex w-full flex-col gap-5">
      <input
        id={inputId}
        aria-invalid={caution || undefined}
        aria-describedby={showMessage ? messageId : undefined}
        className={[BASE, caution ? BORDER.caution : BORDER.default, className]
          .filter(Boolean)
          .join(" ")}
        data-node-id="256:2888"
        {...rest}
      />
      {showMessage ? (
        <p id={messageId} className="type-caption-small text-status-critical">
          {message}
        </p>
      ) : null}
    </div>
  );
}
