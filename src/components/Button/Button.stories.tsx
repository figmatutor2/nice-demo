import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

/**
 * NHN 디자인시스템 버튼 (Figma node 106-4623).
 * 축: size(sm·md·lg) × variant(primary·secondary·tertiary) × state(default·hover·disabled).
 * hover 는 실제 `:hover` 상호작용으로 확인, disabled 는 네이티브 속성으로 구동한다.
 * 모든 시각 값은 토큰 유틸리티(bg-fill-*, text-*, border-*, rounded-2, h-*, px-* py-*,
 * type-caption-base / type-body-base)로만 표현된다.
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=106-4623",
    },
  },
  args: {
    children: "추가",
    variant: "primary",
    size: "md",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "tertiary"],
      description: "시각 유형 (Figma 축 `type`)",
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "크기 (프레임 높이 24·32·40)",
    },
    disabled: { control: "boolean", description: "비활성 상태" },
    leadingIcon: {
      control: "select",
      options: [undefined, "plus", "chevron-double-left", "search"],
      description: "레이블 앞 아이콘(선택)",
    },
    trailingIcon: {
      control: "select",
      options: [undefined, "chevron-double-left", "chevron-double-right", "plus"],
      description: "레이블 뒤 아이콘(선택)",
    },
    children: { control: "text", description: "버튼 레이블" },
    className: {
      control: "text",
      description: "기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

/** 기본: primary · md · default. */
export const Default: Story = {};

/** primary — 주요 액션 (파란색 채움). */
export const Primary: Story = { args: { variant: "primary" } };

/** secondary — 보조 액션 (회색 채움). */
export const Secondary: Story = { args: { variant: "secondary" } };

/** tertiary — 낮은 강조 (연회색 채움 + 보더, 어두운 텍스트). */
export const Tertiary: Story = { args: { variant: "tertiary" } };

/** 비활성 — primary·secondary 는 opacity-40, tertiary 는 text-disabled 로 표현. */
export const Disabled: Story = { args: { disabled: true } };

/** 아이콘 슬롯 — 레이블 앞/뒤 아이콘(currentColor 로 텍스트 색 상속). */
export const WithIcons: Story = {
  args: { leadingIcon: "plus", trailingIcon: "chevron-double-right" },
};

/** 크기 3종 나란히 비교 (sm · md · lg). */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-8">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

/** 전체 매트릭스 — variant × (default / disabled). hover 는 마우스오버로 확인. */
export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["primary", "secondary", "tertiary"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-8">
          <Button variant={variant}>기본</Button>
          <Button variant={variant} disabled>
            비활성
          </Button>
        </div>
      ))}
    </div>
  ),
};

const VARIANTS = ["primary", "secondary", "tertiary"] as const;
const SIZES = ["sm", "md", "lg"] as const;

/**
 * size(sm·md·lg) × variant(primary·secondary·tertiary) 전체 그리드.
 * 열=size, 행=variant. Figma 원본 node 106-4623 배치와 한눈에 대조 가능.
 */
export const SizeVariantGrid: Story = {
  render: () => (
    <div className="inline-grid grid-cols-3 items-center gap-16">
      {VARIANTS.flatMap((variant) =>
        SIZES.map((size) => (
          <Button key={`${variant}-${size}`} variant={variant} size={size}>
            버튼
          </Button>
        )),
      )}
    </div>
  ),
};

/**
 * min-width 작동 확인 — 2글자 짧은 레이블("다음")이어도
 * md(min-w-47)·lg(min-w-86)는 최소 너비를 유지한다. sm은 min-width 없이 콘텐츠에 hug.
 */
export const MinWidthShortLabel: Story = {
  render: () => (
    <div className="flex items-center gap-16">
      {SIZES.map((size) => (
        <Button key={size} variant="primary" size={size}>
          다음
        </Button>
      ))}
    </div>
  ),
};
