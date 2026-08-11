import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

/**
 * NHN 디자인시스템 Input — ControlResource/Input (Figma node 134-4515).
 * 네이티브 <input> 기반. 상태: default · hover(:hover) · disabled · caution(invalid).
 * a11y: `label` 지정 시 sr-only <label>이 htmlFor로 연결된다.
 * 모든 시각 값은 토큰 유틸리티(bg-fill-white/bg-bg-surface, border-*, text-text-default,
 * rounded-2, h-32, min-w-180, px-12 py-6, type-caption-base)로만 표현된다.
 */
const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=134-4515",
    },
  },
  args: {
    label: "검색어",
    invalid: false,
    disabled: false,
  },
  argTypes: {
    label: {
      control: "text",
      description: "접근성 레이블(sr-only <label>로 연결)",
    },
    invalid: {
      control: "boolean",
      description: "검증 오류(caution) — aria-invalid + border/status-critical",
    },
    disabled: { control: "boolean", description: "비활성 상태" },
    className: {
      control: "text",
      description: "기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

/** 기본(default) — 흰 배경 + border/default. */
export const Default: Story = {};

/** 값 입력 — 입력값 텍스트 색은 text/default. */
export const WithValue: Story = { args: { defaultValue: "인스턴스-01" } };

/** caution — 검증 오류. `invalid`가 aria-invalid로 연결되고 보더가 border/status-critical. */
export const Caution: Story = { args: { invalid: true, defaultValue: "잘못된 값" } };

/** 비활성 — surface 배경 + opacity-40, 네이티브 disabled. */
export const Disabled: Story = { args: { disabled: true, defaultValue: "수정 불가" } };

/**
 * 상태 매트릭스 — Figma node 134-4515 의 4종 배치와 대조(입력값 없는 빈 상태).
 * default·hover 는 빈 필드로 동일하게 보이며 hover 는 마우스오버로 확인,
 * disabled 는 회색·opacity, caution 은 적색 보더로 구분된다.
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Input label="default" />
      <Input label="hover (마우스오버로 확인)" />
      <Input label="disabled" disabled />
      <Input label="caution" invalid />
    </div>
  ),
};
