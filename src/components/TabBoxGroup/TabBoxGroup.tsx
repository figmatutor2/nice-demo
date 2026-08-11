/*
 * TabBoxGroup — NHN 디자인시스템 박스형 토글 "그룹"(조립본).
 * 출처: Figma "NHN 실습 디자인시스템" node 137-7411 (TabBox 아이템들을 gap 으로 묶음).
 *
 * 조립: 아이템 컴포넌트 TabBox 를 나열한다(단일 선택). 선택된 항목은 activeIndex 로 지정.
 *   (언더라인 페이지 탭 TabMenu 와는 다른 계열: 이쪽은 박스형 토글.)
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *   간격 scale 2 → gap-2 (토글 사이)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import type { ReactNode } from "react";
import { TabBox } from "../TabBox/TabBox";

export interface TabBoxGroupProps {
  /** 토글 라벨 목록. */
  items: ReactNode[];
  /** 선택된 토글 인덱스. */
  activeIndex?: number;
  /** 선택 콜백. */
  onChange?: (index: number) => void;
  /** 그룹 접근성 레이블. */
  "aria-label"?: string;
  /** 추가 Tailwind 토큰 클래스. */
  className?: string;
}

export function TabBoxGroup({
  items,
  activeIndex = 0,
  onChange,
  className,
  "aria-label": ariaLabel,
}: TabBoxGroupProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={["flex items-start gap-2", className].filter(Boolean).join(" ")}
      data-node-id="137:7411"
    >
      {items.map((label, i) => (
        <TabBox key={i} active={i === activeIndex} onClick={() => onChange?.(i)}>
          {label}
        </TabBox>
      ))}
    </div>
  );
}
