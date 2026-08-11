import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

/**
 * 경로 표시 (Figma node 137-7074).
 * `items` 배열의 각 depth 를 chevron-right 아이콘(Icon 세트 재사용)으로 구분한다.
 * 마지막 항목이 현재 페이지(aria-current="page").
 */
const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=137-7074",
    },
  },
  argTypes: {
    items: { control: "object", description: "depth 라벨 목록(첫=최상위, 끝=현재 페이지)" },
  },
};
export default meta;

type Story = StoryObj<typeof Breadcrumb>;

/** 2 depth — Figma 기본. */
export const TwoDepth: Story = {
  args: { items: ["Network Firewall", "객체"] },
};

/** 1 depth. */
export const OneDepth: Story = {
  args: { items: ["Network Firewall"] },
};

/** 3 depth. */
export const ThreeDepth: Story = {
  args: { items: ["Network Firewall", "객체", "3 depth"] },
};
