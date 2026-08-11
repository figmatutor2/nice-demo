import type { Meta, StoryObj } from "@storybook/react";
import { NaviMenuPrj2depth } from "./NaviMenuPrj2depth";

/**
 * LNB Prj 영역 2depth 트리 항목 (Figma node 101-5271/5270/5272).
 * `active`는 prop(선택 상태 → 파랑), hover는 CSS `:hover`(bg interactive/light + 파랑).
 * 아이콘(compute-instance)은 Icon 세트 재사용. 폭은 부모(260)를 따르므로 w-260로 감싼다.
 */
const meta: Meta<typeof NaviMenuPrj2depth> = {
  title: "Components/LnbNavigation/NaviMenuPrj2depth",
  component: NaviMenuPrj2depth,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=101-5273",
    },
  },
  argTypes: {
    label: { control: "text", description: "항목 라벨" },
    active: { control: "boolean", description: "선택(active) 상태 — 파란색 강조" },
    className: { control: "text", description: "추가 Tailwind 토큰 클래스" },
  },
  args: { label: "Auto Scale" },
  decorators: [
    (Story) => (
      <div className="w-260 border border-border-subtle">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof NaviMenuPrj2depth>;

/** default — 검정 아이콘·텍스트. */
export const Default: Story = {};

/** active — 선택 상태(파랑). bg는 default와 동일(fill/subtle) 유지. */
export const Active: Story = { args: { active: true } };

/*
 * 상태 미리보기 — default / active / hover 를 세로로.
 * CSS :hover 를 정적으로 재현하려고 `.states-demo .is-hover`(specificity 0,2,0)로
 * interactive/light 배경 + text/primary 를 강제한다(컴포넌트는 그대로 :hover 유지).
 */
export const States: Story = {
  render: () => (
    <div className="states-demo flex w-full flex-col gap-8">
      <style>{`.states-demo .is-hover{background:var(--color-interactive-light);color:var(--color-text-primary)}`}</style>
      <NaviMenuPrj2depth label="Auto Scale" />
      <NaviMenuPrj2depth label="Auto Scale" active />
      <NaviMenuPrj2depth label="Auto Scale" className="is-hover" />
    </div>
  ),
};
