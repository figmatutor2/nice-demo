import type { Meta, StoryObj } from "@storybook/react";
import { TopbarMenu } from "./TopbarMenu";

/**
 * Topbar 우측 유틸 메뉴 (Figma node 135-5843).
 * 리전 · 언어 · 계정을 범용 `Divider`(vertical)로 구분한다.
 * 텍스트는 `type-caption-base`, 색은 `text-text-default`, 배경은 `bg-bg-subtle` 토큰.
 */
const meta: Meta<typeof TopbarMenu> = {
  title: "Components/Topbar/TopbarMenu",
  component: TopbarMenu,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=135-5843",
    },
  },
  argTypes: {
    region: { control: "text", description: "리전 표시" },
    language: { control: "text", description: "언어 표시" },
    account: { control: "text", description: "계정" },
    className: { control: "text", description: "추가 Tailwind 토큰 클래스" },
  },
};
export default meta;

type Story = StoryObj<typeof TopbarMenu>;

/** 기본: Figma 원본(한국 리전 · 한국어 · 마스킹 이메일). */
export const Default: Story = {};

/** 내용 커스터마이즈 예시. */
export const CustomContent: Story = {
  args: {
    region: "일본 리전",
    language: "English",
    account: "admin***@nhncloud.com",
  },
};
