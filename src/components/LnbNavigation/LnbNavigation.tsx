import { NaviMenuOrgTitle } from "./NaviMenuOrgTitle";
import { NaviMenuOrgList } from "./NaviMenuOrgList";
import { NaviMenuPrj1depth } from "./NaviMenuPrj1depth";
import { NaviMenuPrj2depth } from "./NaviMenuPrj2depth";
import { Divider } from "../Divider/Divider";
import type { IconName } from "../icons/Icon";

/*
 * LnbNavigation — 좌측 네비게이션(페이지 레벨 조립본).
 * 출처: Figma "NHN 실습 디자인시스템" node 109:4672 (LnbNavigation).
 *
 * 파츠 조립: [Org Title + Org 목록](topArea) — Divider — [Prj Title + 1depth들 + 하단 Analytics](bottomArea).
 * Org 영역(NaviMenuOrgList)과 Prj 영역(NaviMenuPrj1depth/2depth)은 역할이 달라 분리해 조립한다.
 * 구분선은 범용 Divider(horizontal) 재사용(LNB 전용 divider 없음).
 *
 * 레이아웃 규칙(layout-components.md의 사이드 네비 변형 — Topbar와 반대):
 *  - 가로: 폭 260 고정(컴포넌트 속성) → w-260(승격 토큰 --spacing-260). Figma 프레임 높이 1088은 무시.
 *  - 세로: h-full + overflow-y-auto(내용이 넘치면 스크롤).
 *  - projectArea를 flex-1로 채워 하단 항목(Analytics)을 바닥에 고정.
 *  - 우측 경계선 border/default → border-r border-border-default, 배경 fill/white → bg-fill-white
 * raw px/hex/arbitrary 미사용.
 */

/** Org 서비스 항목. */
export type LnbOrgItem = { icon: IconName; label: string; href?: string };
/** 2depth 트리 항목. */
export type LnbTwoDepthItem = { label: string; active?: boolean };
/** 1depth 프로젝트 항목(펼치면 2depth 노출). */
export type LnbProjectItem = { label: string; defaultExpanded?: boolean; items?: LnbTwoDepthItem[] };

type LnbNavigationProps = {
  /** Org 섹션 제목. */
  orgTitle?: string;
  /** Org 서비스 목록. */
  orgItems?: LnbOrgItem[];
  /** Prj 섹션 제목. */
  projectTitle?: string;
  /** Prj 1depth 목록(각 항목은 펼치면 2depth 노출). */
  projectItems?: LnbProjectItem[];
  /** 하단 고정 항목 라벨. */
  footerLabel?: string;
  /** 하단 고정 항목의 2depth 목록. */
  footerItems?: LnbTwoDepthItem[];
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
};

const DEFAULT_ORG_ITEMS: LnbOrgItem[] = [
  { icon: "dooray", label: "Dooray", href: "#" },
  { icon: "online-contact", label: "DooOnline Contactray", href: "#" },
  { icon: "workplace-erp", label: "ERP", href: "#" },
  { icon: "cloudtrail", label: "Cloud Trail", href: "#" },
];

const DEFAULT_TWO_DEPTH: LnbTwoDepthItem[] = [
  { label: "Auto Scale", active: true },
  { label: "Auto Scale" },
  { label: "Auto Scale" },
];

const DEFAULT_PROJECT_ITEMS: LnbProjectItem[] = [
  { label: "label", items: DEFAULT_TWO_DEPTH },
  { label: "label", items: DEFAULT_TWO_DEPTH },
  { label: "label", items: DEFAULT_TWO_DEPTH },
];

function projectChildren(items?: LnbTwoDepthItem[]) {
  if (!items) return null;
  return items.map((t, j) => <NaviMenuPrj2depth key={`${t.label}-${j}`} label={t.label} active={t.active} />);
}

export function LnbNavigation({
  orgTitle = "NHN",
  orgItems = DEFAULT_ORG_ITEMS,
  projectTitle = "Project",
  projectItems = DEFAULT_PROJECT_ITEMS,
  footerLabel = "Analytics",
  footerItems = DEFAULT_TWO_DEPTH,
  className,
}: LnbNavigationProps) {
  return (
    <nav
      aria-label="사이드 내비게이션"
      className={[
        "flex h-full w-260 flex-col overflow-y-auto border-r border-border-default bg-fill-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-node-id="109:4672"
    >
      {/* topArea — Org 영역 */}
      <div className="flex w-full flex-col pb-20">
        <NaviMenuOrgTitle>{orgTitle}</NaviMenuOrgTitle>
        {orgItems.map((item, i) => (
          <NaviMenuOrgList key={`${item.label}-${i}`} icon={item.icon} label={item.label} href={item.href} />
        ))}
      </div>

      <Divider orientation="horizontal" />

      {/* bottomArea — Prj 영역 (projectArea flex-1 → 하단 Analytics 바닥 고정) */}
      <div className="flex w-full flex-1 flex-col">
        <div className="flex w-full flex-1 flex-col">
          <NaviMenuOrgTitle>{projectTitle}</NaviMenuOrgTitle>
          {projectItems.map((p, i) => (
            <NaviMenuPrj1depth key={`${p.label}-${i}`} label={p.label} defaultExpanded={p.defaultExpanded}>
              {projectChildren(p.items)}
            </NaviMenuPrj1depth>
          ))}
        </div>
        <NaviMenuPrj1depth label={footerLabel}>{projectChildren(footerItems)}</NaviMenuPrj1depth>
      </div>
    </nav>
  );
}
