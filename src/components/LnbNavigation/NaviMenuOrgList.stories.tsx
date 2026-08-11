import type { Meta, StoryObj } from "@storybook/react";
import { NaviMenuOrgList } from "./NaviMenuOrgList";

/**
 * LNB Org 영역 서비스 항목 (Figma node 100-6072).
 * 선두 서비스 아이콘 + 라벨 + 후행 외부링크 아이콘. 외부 서비스로 이동하는 링크(<a>).
 * 아이콘은 Icon 세트 재사용(신규 아이콘 없음). 폭은 부모(260)를 따르므로 w-260로 감싼다.
 */
const meta: Meta<typeof NaviMenuOrgList> = {
  title: "Components/LnbNavigation/NaviMenuOrgList",
  component: NaviMenuOrgList,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=100-6072",
    },
  },
  argTypes: {
    icon: { control: "text", description: "선두 서비스 아이콘 이름" },
    label: { control: "text", description: "항목 라벨" },
    href: { control: "text", description: "외부 서비스 이동 경로" },
    className: { control: "text", description: "추가 Tailwind 토큰 클래스" },
  },
  args: { icon: "dooray", label: "Dooray", href: "#" },
  decorators: [
    (Story) => (
      <div className="w-260 border border-border-subtle">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof NaviMenuOrgList>;

/** 기본 항목. */
export const Default: Story = {};

/** Figma 원본의 4개 서비스 항목을 세로로 나열. */
export const OrgList: Story = {
  render: () => (
    <div className="flex w-full flex-col">
      <NaviMenuOrgList icon="dooray" label="Dooray" href="#" />
      <NaviMenuOrgList icon="online-contact" label="DooOnline Contactray" href="#" />
      <NaviMenuOrgList icon="workplace-erp" label="ERP" href="#" />
      <NaviMenuOrgList icon="cloudtrail" label="Cloud Trail" href="#" />
    </div>
  ),
};
