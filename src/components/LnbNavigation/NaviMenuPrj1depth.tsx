import { useState, type ReactNode } from "react";
import { Icon } from "../icons/Icon";

/*
 * NaviMenuPrj1depth — LNB Prj 영역 1depth 프로젝트 항목(펼침/접힘 토글).
 * 출처: Figma node 101:5321(default/접힘) / 101:5320(active/펼침).
 *
 * 역할: 프로젝트 노드. 펼치면 하위 2depth(NaviMenuPrj2depth) 리스트를 품는다.
 * Figma의 active 심볼 높이 168 = 헤더 42 + 2depth 3행(각 42)인데, 이는 "펼쳐져서 2depth를 포함"하기
 * 때문 → 별도 active 심볼이 아니라 "펼침" 상태로 구현한다(지시).
 *
 * 상태 처리(지시): active = "선택+펼침" → expanded 상태.
 *  Uncontrolled — defaultExpanded로 초기값, 헤더(button) 클릭으로 토글.
 *   - 접힘: 라벨 default 색 + arrow-down(icon/subtle)
 *   - 펼침: 라벨 primary(파랑) + arrow-up(icon/accent) + 하위 2depth 리스트 노출
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  - 배경 fill/white → bg-fill-white
 *  - 라벨 text/default → text-text-default, 펼침 interactive/primary → text-text-primary
 *  - 화살표 접힘 icon/subtle → text-icon-subtle, 펼침 icon/accent → text-icon-accent
 *  - 좌우 여백 scale/30·20 → pl-30 pr-20, 라벨-화살표 간격 gap-10
 *  - 타이포 Body 13 R → type-caption-base(13/20), 행 높이 42 = py-11 + line-height 20
 * raw px/hex/arbitrary 미사용.
 */
type NaviMenuPrj1depthProps = {
  /** 항목 라벨. */
  label: string;
  /** 초기 펼침 상태(uncontrolled). */
  defaultExpanded?: boolean;
  /** 펼쳤을 때 노출할 하위 2depth 항목들(NaviMenuPrj2depth). */
  children?: ReactNode;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
};

export function NaviMenuPrj1depth({
  label,
  defaultExpanded = false,
  children,
  className,
}: NaviMenuPrj1depthProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const hasChildren = Boolean(children);
  return (
    <div
      className={["flex w-full flex-col", className].filter(Boolean).join(" ")}
      data-node-id="101:5321"
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={hasChildren ? expanded : undefined}
        className={[
          "flex w-full items-center justify-between gap-10 bg-fill-white py-11 pl-30 pr-20 text-left",
          expanded ? "text-text-primary" : "text-text-default",
        ].join(" ")}
      >
        <span className="type-caption-base flex-1 truncate">{label}</span>
        <span className={expanded ? "text-icon-accent" : "text-icon-subtle"}>
          <Icon name={expanded ? "arrow-up" : "arrow-down"} />
        </span>
      </button>
      {expanded && hasChildren ? <div className="flex w-full flex-col">{children}</div> : null}
    </div>
  );
}
