import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

/**
 * NHN 디자인시스템 체크박스 (Figma node 100-5273).
 * Figma 의 단일 state 축을 직교 props 로 재해석: active→checked, danger→danger,
 * disabled→네이티브 disabled. hover 상태는 디자인에 없다.
 * 모든 시각 값은 토큰 유틸리티(size-15, rounded-1, bg-fill-*, border-border-*,
 * text-static-white, type-caption-base)로만 표현된다.
 */
const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=100-5273",
    },
  },
  args: {
    label: "label",
    danger: false,
    disabled: false,
    defaultChecked: false,
  },
  argTypes: {
    danger: { control: "boolean", description: "위험(검증 실패) 스타일 (Figma state=danger)" },
    disabled: { control: "boolean", description: "비활성 (네이티브 disabled)" },
    defaultChecked: { control: "boolean", description: "초기 체크 여부 (Figma state=active)" },
    label: { control: "text", description: "체크박스 라벨(선택)" },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

/** 기본: 미체크 · 라벨 있음. */
export const Default: Story = {};

/** active — 체크됨(파란 배경 + 흰 체크). */
export const Checked: Story = { args: { defaultChecked: true } };

/** danger — 위험 스타일(caution 보더). */
export const Danger: Story = { args: { danger: true } };

/** disabled — 네이티브 비활성(회색). */
export const Disabled: Story = { args: { disabled: true } };

/** 라벨 없이 박스만 — Table 행 선택처럼 aria-label 로 접근성 제공. */
export const NoLabel: Story = {
  args: { label: undefined, "aria-label": "항목 선택" },
};

/** 4개 상태 나란히 — Figma 원본 배치(default·active·disabled·danger)와 대조. */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-24">
      <Checkbox label="default" />
      <Checkbox label="active" defaultChecked />
      <Checkbox label="disabled" disabled />
      <Checkbox label="danger" danger />
    </div>
  ),
};
