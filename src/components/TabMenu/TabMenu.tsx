/*
 * TabMenu — NHN 디자인시스템 언더라인형 페이지 탭 "바"(조립본).
 * 출처: Figma "NHN 실습 디자인시스템" node 137-7175 (TabMenuList 아이템들을 담는 바).
 *
 * 조립: 아이템 컴포넌트 TabMenuList 를 여러 개 나열하고, 바 하단에 구분선(border-default)을 둔다.
 *   선택된 탭은 activeIndex 로 지정 — 해당 TabMenuList 가 active(언더라인 primary)로 렌더된다.
 *   (박스형 토글 TabBoxGroup 과는 다른 계열: 이쪽은 언더라인 페이지 탭.)
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *   배경   fill/white       → bg-fill-white
 *   하단선 border/default    → border-b border-border-default
 *   간격   scale 26         → gap-26 (탭 사이)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import type { ReactNode } from "react";
import { TabMenuList } from "../TabMenuList/TabMenuList";

export interface TabMenuItem {
  /** 탭 라벨. */
  label: ReactNode;
  /** 비활성 여부. */
  disabled?: boolean;
}

export interface TabMenuProps {
  /** 탭 아이템 목록. */
  items: TabMenuItem[];
  /** 선택된 탭 인덱스. */
  activeIndex?: number;
  /** 탭 선택 콜백. */
  onChange?: (index: number) => void;
  /** 추가 Tailwind 토큰 클래스. */
  className?: string;
}

export function TabMenu({ items, activeIndex = 0, onChange, className }: TabMenuProps) {
  return (
    <div
      role="tablist"
      className={[
        "flex items-start gap-26 bg-fill-white border-b border-border-default",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-node-id="137:7175"
    >
      {items.map((item, i) => (
        <TabMenuList
          key={i}
          active={i === activeIndex}
          disabled={item.disabled}
          onClick={() => onChange?.(i)}
        >
          {item.label}
        </TabMenuList>
      ))}
    </div>
  );
}
