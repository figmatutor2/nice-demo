import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";

/**
 * NHN Cloud 퍼블릭 존 텍스트 입력 (Figma node 256-2888).
 * 상태: default · hover · caution. hover 는 실제 `:hover` 상호작용으로 확인한다.
 * caution 은 `caution` prop 으로 구동하며 `message` 문구를 aria-invalid/aria-describedby 로 연결한다.
 * 폭은 w-full — 컨테이너가 폭을 결정한다(프레임 440은 프레임 값). 스토리는 폭 확인을 위해
 * 440 데모 컨테이너로 감싼다. 콘솔 존 `Input`과 별개의 신규 컴포넌트이며 토큰만 공용 재사용한다.
 */
const meta: Meta<typeof TextInput> = {
  title: "Nhncloud/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=256-2888",
    },
  },
  args: {
    placeholder: "비밀번호",
    caution: false,
    message: "비밀번호가 일치하지 않습니다.",
  },
  argTypes: {
    caution: { control: "boolean", description: "에러(주의) 상태 — critical 보더 + aria-invalid" },
    message: { control: "text", description: "에러 문구 (caution 일 때 표시)" },
    placeholder: { control: "text", description: "플레이스홀더" },
    className: {
      control: "text",
      description: "기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
  // 폭은 컨테이너가 결정 — Figma 프레임 폭(440)을 재현하는 데모 래퍼(컴포넌트 자체는 w-full).
  decorators: [
    (Story) => (
      <div style={{ inlineSize: "440px" }}>{/* token-exempt: Storybook 데모 프레임 폭 440(컴포넌트는 w-full) */}
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TextInput>;

/** 기본: default (플레이스홀더만). */
export const Default: Story = { args: { caution: false } };

/** hover — 마우스오버 시 보더가 strong 으로 강조된다(실제 :hover 로 확인). */
export const Hover: Story = { args: { caution: false } };

/** caution — critical 보더 + 에러 문구(aria-invalid/aria-describedby 연결). */
export const Caution: Story = { args: { caution: true } };

/** 3상태 세로 비교 (default · hover · caution). */
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-24">
      <TextInput {...args} caution={false} placeholder="비밀번호" />
      <TextInput {...args} caution={false} placeholder="비밀번호 (hover 확인)" />
      <TextInput {...args} caution message="비밀번호가 일치하지 않습니다." placeholder="비밀번호" />
    </div>
  ),
};
