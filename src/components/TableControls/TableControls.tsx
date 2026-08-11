/*
 * TableControls — NHN 디자인시스템 TableControls 조립본.
 * 출처: Figma "NHN 실습 디자인시스템" node 137-7304.
 *
 * 콘텐츠 영역 레벨 컴포넌트. Figma 프레임 폭 1560 은 프레임 크기일 뿐이므로
 * 루트는 w-full 로 두고 내부는 토큰 간격 + justify-between 으로 신축한다(레이아웃 규칙).
 *
 * 구성(2행):
 *  1행: <Toolbar> (추가 / 삭제)
 *  2행: justify-between
 *    좌측 searchBar: <Dropdown 이름> + <Input 검색어> + <Button 검색(tertiary)>
 *    우측 filterArea: "총 N 개" 정보 + <Dropdown 10개씩 보기>
 *
 * 재사용: Toolbar·Dropdown·Input·Button 을 조립만 한다(신규 시각 컴포넌트 미생성).
 *  - 검색 버튼 = 기존 <Button variant="tertiary"> + leadingIcon color-default.
 *  - 키보드 검색: searchBar 를 <form> 으로 감싸 Enter 제출 → onSearch.
 *
 * 토큰 매핑(이 조립본이 지정하는 간격만): 행 간격 scale/8 → gap-8,
 *  searchBar scale/4 → gap-4, filterArea scale/15 → gap-15. 나머지 시각 값은 하위 컴포넌트 위임.
 *  ※ Figma의 "총 N 개" 숫자는 border/subtle(거의 안보임)이나, 개수 가독성을 위해 text/default 로 표시.
 *
 * raw hex/px/rgb/arbitrary 미사용.
 */

import type { ChangeEventHandler } from "react";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { Input } from "../Input/Input";
import { Toolbar } from "../Toolbar/Toolbar";

export interface TableControlsProps {
  /** "총 N 개" 로 표시할 항목 수. 기본 0. */
  count?: number;
  /** 검색 대상 컬럼 드롭다운 레이블. 기본 "이름". */
  columnLabel?: string;
  /** 페이지 크기 드롭다운 레이블. 기본 "10개씩 보기". */
  pageSizeLabel?: string;
  /** 검색어 입력값(제어 컴포넌트로 쓸 때). */
  searchValue?: string;
  /** 검색어 입력 변경 핸들러. */
  onSearchChange?: ChangeEventHandler<HTMLInputElement>;
  /** 검색 실행(버튼 클릭·Enter). */
  onSearch?: () => void;
  /** 추가 버튼 클릭. */
  onAdd?: () => void;
  /** 삭제 버튼 클릭. */
  onDelete?: () => void;
  /** 삭제 버튼 비활성. 기본 true(선택 항목이 있을 때 활성). */
  deleteDisabled?: boolean;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
}

export function TableControls({
  count = 0,
  columnLabel = "이름",
  pageSizeLabel = "10개씩 보기",
  searchValue,
  onSearchChange,
  onSearch,
  onAdd,
  onDelete,
  deleteDisabled = true,
  className,
}: TableControlsProps) {
  return (
    <div
      className={["flex w-full flex-col items-start gap-8 bg-bg-canvas", className]
        .filter(Boolean)
        .join(" ")}
      data-node-id="137:7304"
    >
      {/* 1행 — 추가/삭제 */}
      <Toolbar onAdd={onAdd} onDelete={onDelete} deleteDisabled={deleteDisabled} />

      {/* 2행 — 좌측 검색 / 우측 개수·페이지 크기 */}
      <div className="flex w-full items-center justify-between">
        <form
          className="flex items-center gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch?.();
          }}
        >
          <Dropdown label={columnLabel} aria-label={`검색 기준: ${columnLabel}`} />
          <Input label="검색어" value={searchValue} onChange={onSearchChange} />
          <Button type="submit" variant="tertiary" size="md" leadingIcon="color-default">
            검색
          </Button>
        </form>

        <div className="flex items-center gap-15">
          <p className="type-caption-base text-text-default">총 {count} 개</p>
          <Dropdown label={pageSizeLabel} />
        </div>
      </div>
    </div>
  );
}
