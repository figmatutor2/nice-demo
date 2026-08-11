import type { Meta, StoryObj } from "@storybook/react";
import { TabMenuList } from "./TabMenuList";

/**
 * 언더라인형 페이지 탭의 아이템 1개 (Figma node 135-7059, 4상태 · 높이 42).
 *
 * 상태 구동:
 * - `active` prop → 선택된 탭. 하단 언더라인이 interactive/primary 로 표시(aria-selected).
 * - hover → CSS `:hover`. 마우스를 올리면 하단 언더라인이 border/strong 으로 나타남(직접 올려 확인).
 * - `disabled` → 네이티브 disabled. 텍스트 text/disabled, hover 비활성.
 *
 * 이 아이템을 여러 개 담아 하단 border 를 두른 바는 `TabMenu` 컴포넌트가 조립한다.
 */
const meta: Meta<typeof TabMenuList> = {
  title: "Components/TabMenuList",
  component: TabMenuList,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=135-7059",
    },
  },
  argTypes: {
    active: {
      control: "boolean",
      description: "선택 상태. 하단 언더라인 interactive/primary 표시",
    },
    disabled: {
      control: "boolean",
      description: "비활성. 텍스트 text/disabled, hover 비활성(네이티브 disabled)",
    },
    children: { control: "text", description: "탭 라벨" },
  },
  args: { children: "label" },
};
export default meta;

type Story = StoryObj<typeof TabMenuList>;

/** 기본 — 언더라인 없음. */
export const Default: Story = {};

/** 선택 — 하단 언더라인 interactive/primary. */
export const Active: Story = { args: { active: true } };

/** 비활성 — text/disabled, hover 없음. */
export const Disabled: Story = { args: { disabled: true } };

/** 4상태 한눈에(hover 는 마우스를 올려 확인). */
export const AllStates: Story = {
  render: () => (
    <div role="tablist" className="flex items-start gap-26">
      <TabMenuList>label</TabMenuList>
      <TabMenuList active>label</TabMenuList>
      <TabMenuList disabled>label</TabMenuList>
    </div>
  ),
};
