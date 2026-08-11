import type { Meta, StoryObj } from "@storybook/react";
import { AccountMenu } from "./AccountMenu";
import { Topbar } from "../Topbar/Topbar";

/**
 * NHN 디자인시스템 AccountMenu — 계정 드롭다운 패널 (Figma node 256-2691).
 * AccountMenuItem 항목을 5개 그룹으로 묶고 그룹 사이에 Divider(재사용)를 넣는다.
 * API: groups(문자열 배열의 배열) + onItemClick 콜백 하나. 라우팅은 구현하지 않는다.
 * 모든 시각 값은 토큰 유틸리티(w-156, bg-bg-canvas, border-border-subtle, py-9, pt-5/pb-5, px-20)로만 표현된다.
 */
const meta: Meta<typeof AccountMenu> = {
  title: "Components/AccountMenu/AccountMenu",
  component: AccountMenu,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=256-2691",
    },
  },
  argTypes: {
    onItemClick: { action: "itemClick", description: "항목 클릭 시 라벨 전달" },
    className: {
      control: "text",
      description: "기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof AccountMenu>;

/** 단독 — 기본 5그룹. 항목 마우스오버 시 텍스트가 파랑(text/primary)으로 바뀐다. */
export const Default: Story = {
  parameters: { layout: "centered" },
  render: (args) => (
    <div className="bg-bg-muted p-24">
      <AccountMenu {...args} />
    </div>
  ),
};

/**
 * Topbar 조립 — 우측 계정 영역 아래에 드롭다운이 열린 상태.
 * 패널은 계정 영역(우측)을 기준으로 우측 정렬되어 Topbar 바로 아래에 뜬다.
 */
export const InTopbar: Story = {
  parameters: { layout: "fullscreen" },
  render: (args) => (
    <div className="relative min-h-screen bg-bg-muted">
      <Topbar region="한국(pangyo)" language="한국어" account="NHN" />
      {/* 계정 영역 우측 정렬: Topbar 우측 패딩(pr-30)에 맞춰 right-30, 높이(h-60) 아래 top-60 */}
      <div className="absolute right-30 top-60">
        <AccountMenu {...args} />
      </div>
    </div>
  ),
};
