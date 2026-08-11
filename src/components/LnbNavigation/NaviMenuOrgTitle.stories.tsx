import type { Meta, StoryObj } from "@storybook/react";
import { NaviMenuOrgTitle } from "./NaviMenuOrgTitle";

/**
 * LNB Org/Prj 영역의 섹션 헤더 라벨 (Figma node 100-6054).
 * 클릭·상태 없는 순수 제목. "NHN"(Org)·"Project"(Prj) 양쪽에서 재사용된다.
 * 폭은 부모(260 폭 LNB)를 따르므로 미리보기는 w-260 컨테이너로 감싼다.
 */
const meta: Meta<typeof NaviMenuOrgTitle> = {
  title: "Components/LnbNavigation/NaviMenuOrgTitle",
  component: NaviMenuOrgTitle,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=100-6054",
    },
  },
  argTypes: {
    children: { control: "text", description: "섹션 제목 텍스트" },
    className: { control: "text", description: "추가 Tailwind 토큰 클래스" },
  },
  args: { children: "NHN" },
  decorators: [
    (Story) => (
      <div className="w-260 border border-border-subtle">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof NaviMenuOrgTitle>;

/** Org 섹션 제목. */
export const Org: Story = { args: { children: "NHN" } };

/** Prj 섹션 제목(동일 컴포넌트 재사용). */
export const Project: Story = { args: { children: "Project" } };
