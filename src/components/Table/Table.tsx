/*
 * Table — NHN 디자인시스템 데이터 테이블 (조립).
 * 출처: Figma "NHN 실습 디자인시스템" node 137-8059 (Table).
 *
 * 조립 API 는 단순하게 유지한다(요청): columns 배열 + rows 배열.
 *  - 제네릭/정렬/페이지네이션 등 요청하지 않은 기능은 넣지 않는다.
 *  - 행 선택은 Table 이 소유한다: Uncontrolled(내부 state) + defaultSelected.
 *    선택된 행은 모든 셀에 state="selected" 를 내려 강조(bg interactive/light, 파란 텍스트,
 *    체크박스 active)한다. 헤더 체크박스는 전체 선택(모두 선택 시 checked).
 *
 * 렌더: 시맨틱 <table><thead>/<tbody>. 셀은 Th / Td 컴포넌트로 조립한다.
 *  격자선은 border-collapse + 각 셀 border-bg-muted 로 형성한다.
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 * 접근성: th scope(Th), 각 행 체크박스에 aria-label 연결, 선택적 <caption>.
 */

import { useState, type ReactNode } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { Th } from "./Th";
import { Td } from "./Td";

/** 열 정의. type=button 이면 셀 내용을 Button 라벨로 렌더한다. */
export interface TableColumn {
  /** 행 cells 를 조회할 키. */
  key: string;
  /** 헤더 라벨. */
  header: ReactNode;
  /** 셀 유형. 기본 text. */
  type?: "text" | "button";
  /** button 열 기본 강조 톤. primary=진한 파랑, info=옅은 파랑. 기본 primary. */
  tone?: "primary" | "info";
  /** button 열의 셀 클릭 콜백. */
  onCellClick?: (row: TableRow) => void;
}

/** 행 정의. cells 는 column.key → 내용(버튼 열은 라벨, 비우면 빈 셀). */
export interface TableRow {
  /** 행 고유 id(선택 상태 키). */
  id: string;
  /** 비활성 행(선택 불가, disabled 스타일). */
  disabled?: boolean;
  /** column.key 별 셀 내용. */
  cells: Record<string, ReactNode>;
}

export interface TableProps {
  columns: TableColumn[];
  rows: TableRow[];
  /** 행 선택 체크박스 열 표시. 기본 true. */
  selectable?: boolean;
  /** Uncontrolled 초기 선택 행 id 목록. */
  defaultSelected?: string[];
  /** 선택 변경 콜백(선택된 id 배열). */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** 접근성 캡션(시각적으로 숨김). */
  caption?: ReactNode;
}

export function Table({
  columns,
  rows,
  selectable = true,
  defaultSelected,
  onSelectionChange,
  caption,
}: TableProps) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(defaultSelected));

  const selectableRows = rows.filter((r) => !r.disabled);
  const allSelected =
    selectableRows.length > 0 && selectableRows.every((r) => selected.has(r.id));

  const commit = (next: Set<string>) => {
    setSelected(next);
    onSelectionChange?.([...next]);
  };

  const toggleRow = (id: string, checked: boolean) => {
    const next = new Set(selected);
    if (checked) next.add(id);
    else next.delete(id);
    commit(next);
  };

  const toggleAll = (checked: boolean) => {
    const next = new Set(selected);
    for (const r of selectableRows) {
      if (checked) next.add(r.id);
      else next.delete(r.id);
    }
    commit(next);
  };

  const rowName = (row: TableRow) => String(row.cells[columns[0]?.key] ?? row.id);

  return (
    <table className="w-full border-collapse" data-node-id="137:8059">
      {caption != null && <caption className="sr-only">{caption}</caption>}
      <thead>
        <tr>
          {selectable && (
            <Th type="checkbox">
              <Checkbox
                aria-label="전체 선택"
                checked={allSelected}
                onChange={(e) => toggleAll(e.currentTarget.checked)}
              />
            </Th>
          )}
          {columns.map((col) => (
            <Th key={col.key}>{col.header}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const state = row.disabled
            ? "disabled"
            : selected.has(row.id)
              ? "selected"
              : "default";
          return (
            <tr key={row.id}>
              {selectable && (
                <Td
                  type="checkbox"
                  state={state}
                  checkboxLabel={`행 선택: ${rowName(row)}`}
                  onCheckedChange={(checked) =>
                    !row.disabled && toggleRow(row.id, checked)
                  }
                />
              )}
              {columns.map((col) => {
                const content = row.cells[col.key];
                return col.type === "button" ? (
                  <Td
                    key={col.key}
                    type="button"
                    state={state}
                    buttonTone={col.tone}
                    onButtonClick={() => col.onCellClick?.(row)}
                  >
                    {content}
                  </Td>
                ) : (
                  <Td key={col.key} type="text" state={state}>
                    {content}
                  </Td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
