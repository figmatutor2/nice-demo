import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

/**
 * 범용 구분선 (Figma node 134-5140).
 * `orientation`으로 선 방향을 고르며(vertical=세로선, horizontal=가로선),
 * 색은 `bg-bg-muted`, 굵기는 `w-1`/`h-1` 토큰으로만 표현된다.
 * 길이는 부모 컨테이너를 따르므로 스토리에서 고정 크기 래퍼로 감싸 보여준다.
 */
const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=134-5140",
    },
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
      description: "선 방향. vertical=세로선(가로 배치 구분), horizontal=가로선(세로 배치 구분)",
    },
    className: {
      control: "text",
      description: "길이 등 부모가 제어하는 추가 Tailwind 토큰 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Divider>;

/** 세로선 — Topbar 등 가로 배치 요소 사이 구분(Figma type=horizental). */
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-40 items-center">
      <Divider {...args} />
    </div>
  ),
};

/** 가로선 — 세로 배치 요소 사이 구분(Figma type=vertical). */
export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="w-40">
      <Divider {...args} />
    </div>
  ),
};

/** 두 방향을 나란히 비교. */
export const BothOrientations: Story = {
  render: () => (
    <div className="flex items-center gap-24">
      <div className="flex h-40 items-center">
        <Divider orientation="vertical" />
      </div>
      <div className="w-40">
        <Divider orientation="horizontal" />
      </div>
    </div>
  ),
};
