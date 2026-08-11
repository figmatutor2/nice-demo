/*
 * Td — NHN 디자인시스템 테이블 본문 셀 (grid/Td).
 * 출처: Figma "NHN 실습 디자인시스템" node 100-5347 (grid/Td).
 *
 * 축(Figma): type(checkbox · text · button) × state(default · disabled · selected).
 *  - selected 는 "행 단위" 상태다. Table 이 소유하고 행의 모든 Td 에 동일 state 를 내려준다.
 *  - 렌더: 시맨틱 <td>. Table 의 <tbody><tr> 안에서 사용한다.
 *
 * Button 재사용(요청: 새 버튼 금지):
 *  type=button 셀은 기존 <Button size="sm" variant="tertiary"> 를 그대로 재사용한다.
 *  지오메트리(h-24·px-8·py-4·rounded-2·border/default·fill/tertiary-01)는 100% 일치하고,
 *  라벨/보더 "색"만 상태별로 다르므로 토큰 유틸리티를 important(`!`)로 덧씌워 override 한다
 *  (Tailwind 는 클래스 나열 순서가 아니라 소스 순서로 우선순위를 정하므로 `!` 가 필요).
 *    default  → 라벨 text/primary  (buttonTone="info" 시 status/info 옅은 파랑)
 *    selected → 라벨 text/primary + 보더 border/strong
 *    disabled → 라벨 status/info + 네이티브 disabled
 *  buttonTone: 선택되지 않은 기본 상태의 강조도. 시안의 "보기"(info, 옅은 파랑) vs
 *  "수정"(primary, 진한 파랑) 열별 색 구분을 위해 열 단위로 지정한다.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  배경   fill/white              → bg-fill-white (default·disabled)
 *         interactive/light       → bg-interactive-light (selected 행)
 *         bg/surface              → bg-bg-surface (disabled 체크박스 칸)
 *  텍스트 text/default·disabled·primary → text-text-default / -disabled / -primary
 *  격자선 bg/muted                → border-bg-muted
 *  여백   px 12 · py 10           → px-12 py-10
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import type { ReactNode, TdHTMLAttributes } from "react";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";

/** 셀 유형 (Figma 축 `type`). */
export type TdType = "text" | "checkbox" | "button";
/** 셀 상태 (Figma 축 `state`). selected 는 행 단위(Table 소유). */
export type TdState = "default" | "disabled" | "selected";
/** button 기본 상태의 강조 톤. primary=진한 파랑, info=옅은 파랑. */
export type TdButtonTone = "primary" | "info";

export interface TdProps
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "onClick"> {
  /** 셀 유형. 기본 text. */
  type?: TdType;
  /** 셀 상태. 기본 default. */
  state?: TdState;
  /** text 내용 또는 button 라벨. button 칸에서 비어 있으면 빈 셀로 렌더. */
  children?: ReactNode;
  /** checkbox 칸의 접근성 라벨(aria-label). */
  checkboxLabel?: string;
  /** checkbox 칸 토글 콜백. checked = (state === "selected"). */
  onCheckedChange?: (checked: boolean) => void;
  /** button 칸 클릭 콜백. */
  onButtonClick?: () => void;
  /** button 기본 상태 강조 톤. 기본 primary. (선택·비활성 상태에는 영향 없음) */
  buttonTone?: TdButtonTone;
}

/** state 별 셀 배경. selected 는 행 전체 강조, disabled 체크박스 칸만 surface. */
function cellBg(type: TdType, state: TdState): string {
  if (state === "selected") return "bg-interactive-light";
  if (type === "checkbox" && state === "disabled") return "bg-bg-surface";
  return "bg-fill-white";
}

/** state 별 텍스트 색(text 유형). */
const TEXT_COLOR: Record<TdState, string> = {
  default: "text-text-default",
  disabled: "text-text-disabled",
  selected: "text-text-primary",
};

/**
 * Button 색 override(button 유형). `!` = important(소스순서 우선순위 무력화).
 *  disabled → status/info · selected → primary + border/strong ·
 *  default  → tone(primary | info) 에 따라.
 */
function buttonOverride(state: TdState, tone: TdButtonTone): string {
  if (state === "disabled") return "text-status-info!";
  if (state === "selected") return "text-text-primary! border-border-strong!";
  return tone === "info" ? "text-status-info!" : "text-text-primary!";
}

const CELL_BASE = "border border-bg-muted px-12 py-10 align-middle text-center";

export function Td({
  type = "text",
  state = "default",
  children,
  checkboxLabel,
  onCheckedChange,
  onButtonClick,
  buttonTone = "primary",
  className,
  ...rest
}: TdProps) {
  const base = [CELL_BASE, cellBg(type, state), className].filter(Boolean).join(" ");

  if (type === "checkbox") {
    return (
      <td className={[base, "w-px"].join(" ")} {...rest}>
        <div className="flex justify-center">
          <Checkbox
            aria-label={checkboxLabel}
            checked={state === "selected"}
            disabled={state === "disabled"}
            onChange={(e) => onCheckedChange?.(e.currentTarget.checked)}
          />
        </div>
      </td>
    );
  }

  if (type === "button") {
    return (
      <td className={[base, "w-px"].join(" ")} {...rest}>
        {children != null && (
          <div className="flex justify-center">
            <Button
              size="sm"
              variant="tertiary"
              className={buttonOverride(state, buttonTone)}
              disabled={state === "disabled"}
              onClick={onButtonClick}
            >
              {children}
            </Button>
          </div>
        )}
      </td>
    );
  }

  return (
    <td className={[base, "type-caption-base", TEXT_COLOR[state]].join(" ")} {...rest}>
      {children}
    </td>
  );
}
