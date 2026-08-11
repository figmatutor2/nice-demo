import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";

/**
 * NHN 디자인시스템 Dropdown — ControlResource/Dropdown (Figma node 130-4443).
 * 트리거(닫힌 상태) 전용. 옵션 목록 패널은 후속 작업으로 보류.
 *
 * 상태: default · hover(:hover) · select(포커스·활성) · caution(invalid) · disabled.
 * hover 는 마우스오버로, select 는 키보드 포커스(또는 `active` prop)로 확인한다.
 * 모든 시각 값은 토큰 유틸리티(bg-bg-surface/bg-fill-white, border-*, text-*, rounded-2,
 * min-w-117, pl-12 pr-6 py-6, type-caption-base)로만 표현된다.
 */
const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=130-4443",
    },
  },
  args: {
    label: "label",
    invalid: false,
    active: false,
    disabled: false,
  },
  argTypes: {
    label: { control: "text", description: "트리거에 표시할 레이블" },
    active: {
      control: "boolean",
      description: "열림·활성(select) 상태 강제 — 포커스 시각과 동일",
    },
    invalid: {
      control: "boolean",
      description: "검증 오류(caution) — aria-invalid + border/caution",
    },
    disabled: { control: "boolean", description: "비활성 상태" },
    className: {
      control: "text",
      description: "기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

/** 기본(default) — surface 배경 + border/default. */
export const Default: Story = {};

/** select — 포커스·열림(활성) 상태(흰 배경 + border/strong). 실제로는 `:focus-visible`로도 나타난다. */
export const Select: Story = { args: { active: true } };

/** caution — 검증 오류. `invalid`가 aria-invalid로 연결되고 보더가 border/caution. */
export const Caution: Story = { args: { invalid: true } };

/** 비활성 — 레이블 opacity-40(화살표는 유지), 네이티브 disabled. */
export const Disabled: Story = { args: { disabled: true } };

/**
 * 상태 매트릭스 — Figma node 130-4443 의 5종 배치와 대조.
 * hover 는 정적으로 표현 불가하므로 마우스오버로 확인(default 행에 안내).
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Dropdown label="default" />
      <Dropdown label="hover (마우스오버로 확인)" />
      <Dropdown label="select (활성)" active />
      <Dropdown label="caution" invalid />
      <Dropdown label="disabled" disabled />
    </div>
  ),
};
