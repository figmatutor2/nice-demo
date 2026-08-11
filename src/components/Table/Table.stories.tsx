import type { Meta, StoryObj } from "@storybook/react";
import { Table, type TableColumn, type TableRow } from "./Table";

/**
 * NHN 디자인시스템 데이터 테이블 (Figma node 137-8059).
 * columns 배열 + rows 배열로 조립한다. 행 선택은 Table 이 소유(Uncontrolled + defaultSelected).
 * 선택된 행은 interactive/light 배경 + 파란 텍스트 + 체크박스 active 로 강조된다.
 * 헤더 체크박스는 전체 선택(모두 선택 시 checked). 모든 시각 값은 토큰 유틸리티만 사용한다.
 */
const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=137-8059",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Table>;

/** 시안 6행 데이터 (Figma 원본 재현). "수정" 은 ALL LCMP 행에만 존재. */
const columns: TableColumn[] = [
  { key: "name", header: "이름" },
  { key: "type", header: "타입" },
  { key: "protocol", header: "프로토콜" },
  { key: "port", header: "포트번호" },
  { key: "view", header: "보기", type: "button", tone: "info" },
  { key: "edit", header: "수정", type: "button" },
];

const rows: TableRow[] = [
  { id: "all", cells: { name: "ALL", type: "포트", protocol: "ALL", port: "ALL", view: "보기" } },
  { id: "all-tcp", cells: { name: "ALL TCP", type: "포트", protocol: "TCP", port: "1-6535", view: "보기" } },
  { id: "all-udp", cells: { name: "ALL UDP", type: "포트", protocol: "UDP", port: "1-6535", view: "보기" } },
  { id: "all-lcmp", cells: { name: "ALL LCMP", type: "포트", protocol: "LCMP", port: "ALL", view: "보기", edit: "수정" } },
  { id: "port-test", cells: { name: "port-test", type: "포트", protocol: "TCP", port: "3389", view: "보기" } },
  { id: "range-test", cells: { name: "randge-test", type: "범위", protocol: "TCP", port: "5000 - 6000", view: "보기" } },
];

/** 기본 — 시안 6행 재현. 체크박스로 행을 선택하면 해당 행이 강조된다. */
export const Default: Story = {
  args: { columns, rows, caption: "보안 규칙 목록" },
};

/** 초기 선택 — defaultSelected 로 특정 행을 미리 선택(선택 행 강조 확인). */
export const PreSelected: Story = {
  args: { columns, rows, defaultSelected: ["all-lcmp"], caption: "보안 규칙 목록" },
};

/** 선택 불가 열 — selectable=false 로 체크박스 열을 숨긴다. */
export const NotSelectable: Story = {
  args: { columns, rows, selectable: false, caption: "보안 규칙 목록" },
};
