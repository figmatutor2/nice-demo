import type { Meta, StoryObj } from "@storybook/react";
import { LogoButton } from "./LogoButton";

/**
 * Topbar 좌측 브랜드 버튼 (Figma node 134-5773).
 * 기존 `Logo` 아톰을 파란 배경(`bg-interactive-primary`) 위에 재사용하며,
 * hover 시 `bg-interactive-hover`로 어두워진다(CSS :hover). 높이는 `h-60` 토큰.
 */
const meta: Meta<typeof LogoButton> = {
  title: "Components/Topbar/LogoButton",
  component: LogoButton,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=134-5773",
    },
  },
  argTypes: {
    href: { control: "text", description: "로고 클릭 시 이동 경로" },
    className: { control: "text", description: "추가 Tailwind 토큰 클래스" },
  },
};
export default meta;

type Story = StoryObj<typeof LogoButton>;

/** 기본 상태. 실제로 마우스를 올리면 배경이 어두워진다(CSS :hover). */
export const Default: Story = {};

/*
 * 상태 미리보기 — CSS :hover 를 정적으로 재현한다.
 * `.states-demo .is-hover`(specificity 0,2,0)가 `.bg-interactive-primary`(0,1,0)를 이겨
 * hover 배경 토큰을 강제 적용한다. 컴포넌트 코드는 그대로 CSS :hover 를 유지한다.
 */
export const States: Story = {
  render: () => (
    <div className="states-demo flex flex-col gap-24">
      <style>{`.states-demo .is-hover{background:var(--color-interactive-hover)}`}</style>
      <div className="flex items-center gap-16">
        <span className="type-caption-base text-text-secondary">default</span>
        <LogoButton />
      </div>
      <div className="flex items-center gap-16">
        <span className="type-caption-base text-text-secondary">hover</span>
        <LogoButton className="is-hover" />
      </div>
    </div>
  ),
};
