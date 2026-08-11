import type { Meta, StoryObj } from "@storybook/react";
import { TabBox } from "./TabBox";

/**
 * 박스형 토글 아이템 1개 (Figma node 137-7401, 3상태 · 높이 36).
 *
 * 상태 구동:
 * - `active` prop → 선택. 배경 fill/white + 상·좌·우 border(primary), 하단 열림(aria-pressed).
 * - hover → CSS `:hover`. 배경이 interactive/light 로 바뀜(직접 올려 확인).
 * - default → 배경 bg/subtle.
 *
 * 여러 개를 묶는 그룹은 `TabBoxGroup` 컴포넌트가 조립한다.
 * (언더라인형 페이지 탭 `TabMenuList`(높이 42)와는 다른 계열임에 주의.)
 */
const meta: Meta<typeof TabBox> = {
  title: "Components/TabBox",
  component: TabBox,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=137-7401",
    },
  },
  argTypes: {
    active: { control: "boolean", description: "선택 상태(aria-pressed). white 배경 + primary 테두리" },
    children: { control: "text", description: "토글 라벨" },
  },
  args: { children: "포트" },
};
export default meta;

type Story = StoryObj<typeof TabBox>;

/** 기본 — 배경 bg/subtle. */
export const Default: Story = {};

/** 선택 — white 배경 + primary 테두리(하단 열림). */
export const Active: Story = { args: { active: true } };

/** 3상태 한눈에(hover 는 마우스를 올려 확인). */
export const AllStates: Story = {
  render: () => (
    <div className="flex items-start gap-2">
      <TabBox>IP</TabBox>
      <TabBox>포트</TabBox>
      <TabBox active>포트</TabBox>
    </div>
  ),
};
