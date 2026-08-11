import type { Meta, StoryObj } from "@storybook/react";
import { LogoNhncloud } from "./LogoNhncloud";

/**
 * "NHN CLOUD" 워드마크 (Figma node 253-2481, 퍼블릭 존).
 * 콘솔 존 `Logo`("NHN Cloud | Console")와 별개의 마크. 단색 벡터라 색은 text 토큰이 결정한다
 * (기본 text-text-default). 높이는 h-20, 너비는 w-auto 로 비율 유지. NhncloudGnb 로고 슬롯에 사용.
 */
const meta: Meta<typeof LogoNhncloud> = {
  title: "Nhncloud/LogoNhncloud",
  component: LogoNhncloud,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=253-2481",
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

type Story = StoryObj<typeof LogoNhncloud>;

/** 기본: text-text-default (흰 배경 기준). */
export const Default: Story = {};

/** 색 오버라이드 예시 — text 토큰으로 색만 바꾼다(primary). */
export const Primary: Story = {
  render: () => <LogoNhncloud className="text-text-primary" />,
};
