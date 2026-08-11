import { Fragment, type ReactNode } from "react";
import { LogoButton } from "./LogoButton";
import { Tab, type TabType } from "./Tab";
import { TopbarMenu } from "./TopbarMenu";
import { Divider } from "../Divider/Divider";
import type { IconName } from "../icons/Icon";

/*
 * Topbar — 전역 상단 바(페이지 레벨 조립본).
 * 출처: Figma "NHN 실습 디자인시스템" node 135-5923 (Topbar).
 *
 * 파츠 조립: LogoButton + [Tab …](사이 Divider) 를 좌측 그룹으로, TopbarMenu 를 우측 그룹으로.
 *
 * 레이아웃 규칙(layout-components.md):
 *  - 가로: 루트 `w-full`(Figma 프레임폭 1920은 컴포넌트 속성 아님 → 고정/arbitrary 폭 금지)
 *  - 배치: `justify-between`으로 좌/우 그룹 양끝 정렬(폭이 바뀌어도 가운데만 신축)
 *  - 세로: 높이만 `h-60` 고정(승격 토큰 --spacing-60)
 *  - 간격: 우측 여백 scale/30 → `pr-30` (좌측 로고는 가장자리에 붙어 좌측 패딩 없음)
 *
 * 토큰 매핑: 배경 bg/subtle → `bg-bg-subtle`, 좌측 그룹 배경 fill/muted → `bg-fill-muted`.
 * 좌측 그룹의 탭 사이 Divider(범용, vertical)는 leftArea 세로 패딩이 없어 행 전체 높이로 렌더된다.
 */
export type TopbarTab = {
  /** 탭 크기·구조 변형. */
  type: TabType;
  /** 탭 라벨. */
  label: string;
  /** 선두 아이콘(lg·md). 미지정 시 type 기본값. */
  icon?: IconName;
};

type TopbarProps = {
  /** 좌측 서비스 탭 목록. 탭 사이에는 Divider가 자동 삽입된다. */
  tabs?: TopbarTab[];
  /** 로고 클릭 시 이동 경로. */
  logoHref?: string;
  /** 우측 메뉴 — 리전. */
  region?: string;
  /** 우측 메뉴 — 언어. */
  language?: string;
  /** 우측 메뉴 — 계정. */
  account?: string;
  /** 계정 텍스트 hover 시 아래로 펼칠 드롭다운(예: `<AccountMenu />`). TopbarMenu로 전달. */
  accountMenu?: ReactNode;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
};

const DEFAULT_TABS: TopbarTab[] = [
  { type: "lg", label: "NHN", icon: "company" },
  { type: "lg", label: "핑크다이어리", icon: "service" },
  { type: "md", label: "서비스 선택", icon: "setting" },
  { type: "sm", label: "label" },
];

export function Topbar({
  tabs = DEFAULT_TABS,
  logoHref = "#",
  region,
  language,
  account,
  accountMenu,
  className,
}: TopbarProps) {
  return (
    <header
      className={[
        "flex h-60 w-full items-center justify-between bg-bg-subtle pr-30",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-node-id="135:5923"
    >
      <div className="flex h-60 items-center bg-fill-muted">
        <LogoButton href={logoHref} />
        {tabs.map((tab, i) => (
          <Fragment key={`${tab.type}-${tab.label}-${i}`}>
            {i > 0 && <Divider orientation="vertical" />}
            <Tab type={tab.type} label={tab.label} icon={tab.icon} />
          </Fragment>
        ))}
      </div>
      <TopbarMenu
        region={region}
        language={language}
        account={account}
        accountMenu={accountMenu}
      />
    </header>
  );
}
