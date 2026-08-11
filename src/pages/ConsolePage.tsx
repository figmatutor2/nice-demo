/*
 * ConsolePage — 콘솔 페이지 조립본.
 * 출처: Figma "NHN 실습 디자인시스템" node 137-9448 (page).
 *
 * 기존 구현 컴포넌트를 "조합만" 한다 — 신규 시각 값/스타일 없이 prop과 토큰 유틸리티만 사용.
 * 구조(Figma):
 *   Topbar (h-60, w-full)
 *   mainArea: LnbNavigation (w-260 고정, 세로 신축) + contentArea (flex-1)
 *     contentArea(px-50 pt-16):
 *       tobArea:  navAndTabs(Navigation + TabMenu) + TabBoxGroup
 *       tableArea: TableControls + (Table + Pagination)
 *   Footer (h-40, w-full)
 *
 * 레이아웃 규칙(layout-components.md): 수평 바(Topbar/Footer)는 w-full, LNB는 폭 고정+세로 신축.
 * 간격은 전부 spacing 토큰 유틸리티(px-50·pt-16·gap-16·gap-8·gap-2)만 사용. raw px/hex/arbitrary 미사용.
 */

import { useState } from "react";
import { Topbar } from "../components/Topbar/Topbar";
import { LnbNavigation } from "../components/LnbNavigation/LnbNavigation";
import { Navigation } from "../components/Navigation/Navigation";
import { TabMenu } from "../components/TabMenu/TabMenu";
import { TabBoxGroup } from "../components/TabBoxGroup/TabBoxGroup";
import { TableControls } from "../components/TableControls/TableControls";
import { Table, type TableColumn, type TableRow } from "../components/Table/Table";
import { Pagination } from "../components/Pagination/Pagination";
import { Footer } from "../components/Footer/Footer";
import { Button } from "../components/Button/Button";
import { AccountMenu } from "../components/AccountMenu/AccountMenu";

/* 테이블 열 정의 — 보기(info 톤), 수정(primary 톤)은 button 열. */
const COLUMNS: TableColumn[] = [
  { key: "name", header: "이름" },
  { key: "type", header: "타입" },
  { key: "protocol", header: "프로토콜" },
  { key: "port", header: "포트번호" },
  { key: "view", header: "보기", type: "button", tone: "info" },
  { key: "edit", header: "수정", type: "button", tone: "primary" },
];

/* 방화벽 객체 6행 — Figma 시안 데이터 그대로. */
const ROWS: TableRow[] = [
  { id: "all", cells: { name: "ALL", type: "포트", protocol: "ALL", port: "ALL", view: "보기" } },
  { id: "all-tcp", cells: { name: "ALL TCP", type: "포트", protocol: "TCP", port: "1-6535", view: "보기" } },
  { id: "all-udp", cells: { name: "ALL UDP", type: "포트", protocol: "UDP", port: "1-6535", view: "보기" } },
  { id: "all-lcmp", cells: { name: "ALL LCMP", type: "포트", protocol: "LCMP", port: "ALL", view: "보기", edit: "수정" } },
  { id: "port-test", cells: { name: "port-test", type: "포트", protocol: "TCP", port: "3389", view: "보기" } },
  { id: "randge-test", cells: { name: "randge-test", type: "범위", protocol: "TCP", port: "5000 - 6000", view: "보기" } },
];

export interface ConsolePageProps {
  /** 계정 드롭다운 항목 선택 콜백. AccountMenu.onItemClick 으로 전달된다(예: [회원 정보]). */
  onAccountMenuSelect?: (label: string) => void;
}

export function ConsolePage({ onAccountMenuSelect }: ConsolePageProps = {}) {
  // 상태 소유가 호출부인 파츠(TabMenu·TabBoxGroup)만 로컬 state 로 관리.
  const [tabIndex, setTabIndex] = useState(0);
  const [filterIndex, setFilterIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <div className="flex min-h-screen flex-col bg-bg-canvas">
      <Topbar
        tabs={[
          { type: "lg", label: "NHN", icon: "company" },
          { type: "lg", label: "핑크다이어리", icon: "service" },
          { type: "md", label: "서비스 선택", icon: "setting" },
          { type: "sm", label: "파트너 센터" },
        ]}
        region="한국 리전"
        language="한국어"
        account="nhncl***@nhncloud.com"
        accountMenu={<AccountMenu onItemClick={onAccountMenuSelect} />}
      />

      <div className="flex flex-1">
        <LnbNavigation
          projectItems={[
            {
              label: "Compute",
              defaultExpanded: true,
              items: [
                { label: "Instance", active: true },
                { label: "Image" },
                { label: "Auto Scale" },
              ],
            },
            { label: "Network" },
            { label: "Storage" },
          ]}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-16 px-50 pt-16">
          {/* tobArea — 내비게이션 + 탭 + 필터 박스 */}
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-2">
              <Navigation
                breadcrumb={["Network Firewall", "객체"]}
                actions={
                  <>
                    <Button variant="tertiary" size="md">URL&Appkey</Button>
                    <Button variant="tertiary" size="md">사용자 가이드</Button>
                    <Button variant="tertiary" size="md">퀵 가이드</Button>
                  </>
                }
              />
              <TabMenu
                items={[{ label: "label" }, { label: "label" }]}
                activeIndex={tabIndex}
                onChange={setTabIndex}
              />
            </div>
            <TabBoxGroup
              items={["IP", "포트"]}
              activeIndex={filterIndex}
              onChange={setFilterIndex}
              aria-label="객체 유형 필터"
            />
          </div>

          {/* tableArea — 컨트롤 + 테이블 + 페이지네이션 */}
          <div className="flex flex-col gap-8">
            <TableControls
              count={ROWS.length}
              deleteDisabled={selectedIds.length === 0}
              searchValue={search}
              onSearchChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex flex-col gap-16">
              <Table
                columns={COLUMNS}
                rows={ROWS}
                onSelectionChange={setSelectedIds}
                caption="방화벽 객체 목록"
              />
              <div className="flex justify-center">
                <Pagination defaultPage={1} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
