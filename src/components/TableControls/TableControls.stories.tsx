import type { Meta, StoryObj } from "@storybook/react";
import { TableControls } from "./TableControls";

/**
 * NHN 디자인시스템 TableControls — 조립본 (Figma node 137-7304).
 * Toolbar + Dropdown + Input + Button 을 조립한 콘텐츠 영역 레벨 컨트롤 바.
 *
 * 레이아웃: 루트 w-full(프레임 폭 1560 은 프레임 크기일 뿐), 2행 justify-between 으로
 * 좌측 검색 그룹과 우측 개수·페이지 크기 그룹이 양끝 정렬된다(폭이 바뀌어도 양끝 고정).
 */
const meta: Meta<typeof TableControls> = {
  title: "Components/TableControls",
  component: TableControls,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=137-7304",
    },
  },
  args: {
    count: 6,
    columnLabel: "이름",
    pageSizeLabel: "10개씩 보기",
    deleteDisabled: true,
  },
  argTypes: {
    count: { control: "number", description: '"총 N 개"로 표시할 항목 수' },
    columnLabel: { control: "text", description: "검색 기준 드롭다운 레이블" },
    pageSizeLabel: { control: "text", description: "페이지 크기 드롭다운 레이블" },
    deleteDisabled: {
      control: "boolean",
      description: "삭제 버튼 비활성(선택 항목이 있을 때 활성)",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-24">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TableControls>;

/** 기본 — 삭제 비활성(선택 없음), 총 6개. */
export const Default: Story = {};

/** 항목 선택됨 — 삭제 버튼 활성화. */
export const WithSelection: Story = { args: { deleteDisabled: false } };

/**
 * 좁은 폭 — 컨테이너 폭이 줄어도 좌/우 그룹의 양끝 정렬이 유지된다(가운데가 신축).
 */
export const NarrowContainer: Story = {
  decorators: [
    (Story) => (
      <div className="p-24" style={{ maxWidth: 900 }}>
        <Story />
      </div>
    ),
  ],
};
