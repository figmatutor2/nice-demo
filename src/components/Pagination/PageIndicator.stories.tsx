import type { Meta, StoryObj } from "@storybook/react";
import { PageIndicator } from "./PageIndicator";

/**
 * NHN 디자인시스템 PageIndicator — 페이지네이션 숫자 셀 (Figma node 109-4777).
 * 각 셀 32×32. 상태: default · hover(:hover) · active(현재 페이지).
 * hover 는 마우스오버로 확인한다(Figma hover 심볼 = border/medium + radius/2).
 * 모든 시각 값은 토큰 유틸리티(size-32, bg-fill-tertiary-01/bg-interactive-primary,
 * border-border-default/medium, text-text-default/text-fill-white, rounded-2, type-caption-base)로만 표현된다.
 */
const meta: Meta<typeof PageIndicator> = {
  title: "Components/Pagination/PageIndicator",
  component: PageIndicator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=109-4777",
    },
  },
  args: {
    page: 1,
    active: false,
  },
  argTypes: {
    page: { control: "number", description: "셀에 표시할 페이지 번호" },
    active: {
      control: "boolean",
      description: "현재 페이지(active) — 파란 배경 + 흰 텍스트 + aria-current",
    },
    className: {
      control: "text",
      description: "기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof PageIndicator>;

/** 기본(default) — surface 배경 + border/default. */
export const Default: Story = {};

/** active — 현재 페이지(파란 배경 + 흰 텍스트, aria-current="page"). */
export const Active: Story = { args: { active: true } };

/**
 * 상태 매트릭스 — Figma node 109-4777 의 3종(active·default·hover) 배치와 대조.
 * hover 는 정적으로 표현 불가하므로 마우스오버로 확인(가운데 셀).
 */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <PageIndicator page={1} active />
      <PageIndicator page={2} />
      <PageIndicator page={3} />
    </div>
  ),
};
