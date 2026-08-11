import type { Meta, StoryObj } from "@storybook/react";
import { Toolbar } from "./Toolbar";

/**
 * NHN 디자인시스템 Toolbar — ControlResource/Toolbar (Figma node 137-7370).
 * [추가(primary) │ Divider │ 삭제(tertiary)] 버튼 그룹. 기존 Button·Divider 를 조립한다.
 * 삭제는 Figma 기본 상태가 disabled(선택 항목이 있을 때 활성화)이다.
 * 간격 값(gap-10 / py-10)만 이 컴포넌트가 토큰으로 지정하고, 나머지 시각 값은 Button·Divider 에 위임.
 */
const meta: Meta<typeof Toolbar> = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=137-7370",
    },
  },
  args: {
    addLabel: "추가",
    deleteLabel: "삭제",
    addDisabled: false,
    deleteDisabled: true,
  },
  argTypes: {
    addLabel: { control: "text", description: "추가 버튼 레이블" },
    deleteLabel: { control: "text", description: "삭제 버튼 레이블" },
    addDisabled: { control: "boolean", description: "추가 버튼 비활성" },
    deleteDisabled: {
      control: "boolean",
      description: "삭제 버튼 비활성(기본 true)",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Toolbar>;

/** 기본 — 삭제는 disabled(선택 없음). */
export const Default: Story = {};

/** 항목 선택됨 — 삭제 버튼 활성화. */
export const DeleteEnabled: Story = { args: { deleteDisabled: false } };
