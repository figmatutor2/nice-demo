import type { Meta, StoryObj } from "@storybook/react";
import { NaviMenuPrj1depth } from "./NaviMenuPrj1depth";
import { NaviMenuPrj2depth } from "./NaviMenuPrj2depth";

/**
 * LNB Prj 영역 1depth 프로젝트 항목 (Figma node 101-5321/5320).
 * "active"(선택+펼침)는 `defaultExpanded` prop + 헤더 클릭 토글로 구현(uncontrolled).
 * 펼치면 하위 2depth(NaviMenuPrj2depth) 리스트가 노출된다. 폭은 부모(260)를 따르므로 w-260로 감싼다.
 */
const meta: Meta<typeof NaviMenuPrj1depth> = {
  title: "Components/LnbNavigation/NaviMenuPrj1depth",
  component: NaviMenuPrj1depth,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=101-5322",
    },
  },
  argTypes: {
    label: { control: "text", description: "항목 라벨" },
    defaultExpanded: { control: "boolean", description: "초기 펼침 상태" },
    className: { control: "text", description: "추가 Tailwind 토큰 클래스" },
  },
  args: { label: "label" },
  decorators: [
    (Story) => (
      <div className="w-260 border border-border-subtle">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof NaviMenuPrj1depth>;

const twoDepth = (
  <>
    <NaviMenuPrj2depth label="Auto Scale" active />
    <NaviMenuPrj2depth label="Auto Scale" />
    <NaviMenuPrj2depth label="Auto Scale" />
  </>
);

/** 접힘(default) — 헤더를 클릭하면 펼쳐진다. */
export const Collapsed: Story = { render: (args) => <NaviMenuPrj1depth {...args}>{twoDepth}</NaviMenuPrj1depth> };

/** 펼침(active) — 라벨 파랑 + arrow-up + 2depth 리스트. */
export const Expanded: Story = {
  args: { defaultExpanded: true },
  render: (args) => <NaviMenuPrj1depth {...args}>{twoDepth}</NaviMenuPrj1depth>,
};
