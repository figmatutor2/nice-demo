import type { Meta, StoryObj } from "@storybook/react";
import { RoundButton } from "./RoundButton";

/**
 * NHN Cloud 퍼블릭 존 pill 버튼 (Figma node 256-2852).
 * 축: size(lg·sm) × state(default·hover). hover 는 실제 `:hover` 상호작용으로 확인한다.
 * 콘솔 존 `Button`과 별개의 신규 컴포넌트이며, 토큰(bg-fill-*, text-static-white,
 * border-border-primary, rounded-30, h-*, px-*, type-body-*)만 공용 재사용한다.
 * 스토리 title 은 콘솔 존과 구분하기 위해 `Nhncloud/` 프리픽스로 그룹핑한다.
 */
const meta: Meta<typeof RoundButton> = {
  title: "Nhncloud/RoundButton",
  component: RoundButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=256-2852",
    },
  },
  args: {
    children: "확인",
    size: "lg",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["lg", "sm"],
      description: "크기 (프레임 높이 48·40)",
    },
    children: { control: "text", description: "버튼 레이블" },
    className: {
      control: "text",
      description: "기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof RoundButton>;

/** 기본: lg. */
export const Default: Story = {};

/** lg — 높이 48, 좌우 패딩 28, Body Large. */
export const Large: Story = { args: { size: "lg", children: "확인" } };

/** sm — 높이 40, 좌우 패딩 20, Body Base. */
export const Small: Story = { args: { size: "sm", children: "Console" } };

/** 크기 2종 나란히 비교 (lg · sm). hover 는 마우스오버로 확인. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-16">
      <RoundButton {...args} size="lg">
        확인
      </RoundButton>
      <RoundButton {...args} size="sm">
        Console
      </RoundButton>
    </div>
  ),
};
