import type { Meta, StoryObj } from "@storybook/react";
import { PageArrow } from "./PageArrow";

/**
 * NHN 디자인시스템 PageArrow — 페이지네이션 화살표 버튼 (Figma node 109-4837/109-4838).
 * 방향 4종: first(«) · prev(‹) · next(›) · last(»). 셰브런은 프로젝트 Icon 세트를 재사용한다.
 * 상태: enabled(icon/subtle) · disabled(경계에서 dimmed = icon/tertiary + 네이티브 disabled).
 * 모든 시각 값은 토큰 유틸리티(size-32, bg-fill-white, border-border-default, rounded-2,
 * text-icon-subtle/text-icon-tertiary)로만 표현된다.
 */
const meta: Meta<typeof PageArrow> = {
  title: "Components/Pagination/PageArrow",
  component: PageArrow,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=109-4837",
    },
  },
  args: {
    direction: "prev",
    disabled: false,
  },
  argTypes: {
    direction: {
      control: "inline-radio",
      options: ["first", "prev", "next", "last"],
      description: "화살표 방향 — 아이콘과 접근성 레이블을 결정",
    },
    disabled: {
      control: "boolean",
      description: "경계(첫/마지막 페이지)에서 dimmed + 네이티브 disabled",
    },
    className: {
      control: "text",
      description: "기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof PageArrow>;

/** 첫 페이지(«) — chevron-double-left. */
export const First: Story = { args: { direction: "first" } };

/** 이전 페이지(‹) — chevron-left. */
export const Prev: Story = { args: { direction: "prev" } };

/** 다음 페이지(›) — chevron-right. */
export const Next: Story = { args: { direction: "next" } };

/** 마지막 페이지(») — chevron-double-right. */
export const Last: Story = { args: { direction: "last" } };

/** 비활성(경계) — dimmed(icon/tertiary) + 네이티브 disabled. */
export const Disabled: Story = { args: { direction: "prev", disabled: true } };

/**
 * 방향 × 상태 매트릭스 — Figma arrowLeftArea(« ‹) + arrowRightArea(› »).
 * 위 행 enabled, 아래 행 disabled(dimmed).
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-8">
        <PageArrow direction="first" />
        <PageArrow direction="prev" />
        <PageArrow direction="next" />
        <PageArrow direction="last" />
      </div>
      <div className="flex items-center gap-8">
        <PageArrow direction="first" disabled />
        <PageArrow direction="prev" disabled />
        <PageArrow direction="next" disabled />
        <PageArrow direction="last" disabled />
      </div>
    </div>
  ),
};
