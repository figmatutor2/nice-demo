import type { Meta, StoryObj } from "@storybook/react";
import { AccountMenuItem } from "./AccountMenuItem";

/**
 * NHN 디자인시스템 AccountMenuItem — 계정 드롭다운 항목 한 줄 (Figma node 253-2555).
 * 상태: default · hover(:hover). hover 는 마우스오버로 확인한다(Figma hover 심볼 = text/primary 파랑).
 * 모든 시각 값은 토큰 유틸리티(type-caption-small, text-text-default,
 * hover:text-text-primary, bg-bg-canvas, px-20, py-6)로만 표현된다.
 * 폭은 부모를 따르므로(w-full) 스토리에서 패널 폭 래퍼로 감싸 보여준다.
 */
const meta: Meta<typeof AccountMenuItem> = {
  title: "Components/AccountMenu/AccountMenuItem",
  component: AccountMenuItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=253-2555",
    },
  },
  args: {
    label: "회원 정보",
  },
  argTypes: {
    label: { control: "text", description: "항목에 표시할 라벨" },
    className: {
      control: "text",
      description: "기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
  decorators: [
    (Story) => (
      <div className="border border-border-subtle bg-bg-canvas">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof AccountMenuItem>;

/** 기본(default) — text/default 색. 마우스오버 시 파랑(text/primary). */
export const Default: Story = {};

/**
 * 상태 대조 — Figma node 253-2555 의 default·hover 를 세로로 배치.
 * hover 는 정적으로 표현 불가하므로 마우스오버로 확인한다.
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col">
      <AccountMenuItem label="회원 정보" />
      <AccountMenuItem label="로그인 보안 설정" />
      <AccountMenuItem label="개인정보 이용 내역" />
    </div>
  ),
};
