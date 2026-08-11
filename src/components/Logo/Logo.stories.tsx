import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

/**
 * "NHN CLOUD | Console" 워드마크 (Figma node 58-3058).
 * 단색 벡터이며 색은 text 토큰으로 결정된다. 기본값은 `fill/white`(어두운 배경용).
 */
const meta: Meta<typeof Logo> = {
  title: "Components/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=58-3058",
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "기본 크기·색상 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Logo>;

/** 기본: 어두운 배경 위 흰색 로고 (Figma 원본 스펙, 210×16). */
export const Default: Story = {
  render: (args) => (
    <div className="bg-bg-inverse p-8">
      <Logo {...args} />
    </div>
  ),
};

/** 색상 토큰 교체 예시 — text 토큰으로 로고 색을 제어한다. */
export const PrimaryColor: Story = {
  render: () => (
    <div className="bg-bg-canvas p-8">
      <Logo className="h-16 w-auto text-text-primary" />
    </div>
  ),
};
