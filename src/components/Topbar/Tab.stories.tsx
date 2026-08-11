import type { Meta, StoryObj } from "@storybook/react";
import { Tab } from "./Tab";

/**
 * Topbar 서비스 탭 (Figma node 134-5074).
 * `type`(lg/md/sm)는 variant prop, hover 상태는 CSS `:hover`(텍스트·아이콘 → `text-text-primary`).
 * 색·간격·라운드·타이포 모두 토큰 유틸리티만 사용하며 폭은 내용 크기(hug)를 따른다.
 */
const meta: Meta<typeof Tab> = {
  title: "Components/Topbar/Tab",
  component: Tab,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=134-5074",
    },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["lg", "md", "sm"],
      description: "탭 크기·구조 변형",
    },
    label: { control: "text", description: "탭 라벨" },
    icon: { control: "text", description: "선두 아이콘 이름(lg·md). 미지정 시 type 기본값" },
    className: { control: "text", description: "추가 Tailwind 토큰 클래스" },
  },
  args: { label: "label" },
};
export default meta;

type Story = StoryObj<typeof Tab>;

/** type=lg — 선두 아이콘 + 라벨 + [설정·펼침] (드롭다운형). */
export const Large: Story = { args: { type: "lg" } };

/** type=md — 선두 아이콘 + 라벨. */
export const Medium: Story = { args: { type: "md" } };

/** type=sm — 알약 칩(라벨 + 잠금). */
export const Small: Story = { args: { type: "sm" } };

/** 세 type을 한 줄에 비교. */
export const AllTypes: Story = {
  render: () => (
    <div className="flex items-center gap-16">
      <Tab type="lg" label="label" />
      <Tab type="md" label="label" />
      <Tab type="sm" label="label" />
    </div>
  ),
};

/*
 * 상태 미리보기 — 각 type의 default / hover 를 나란히.
 * CSS :hover 를 정적으로 재현하기 위해 `.states-demo .is-hover`(specificity 0,2,0)로
 * `text/primary` 토큰을 강제 적용한다(currentColor 라 아이콘까지 함께 파랑으로).
 * 컴포넌트는 그대로 CSS :hover 를 유지한다.
 */
export const States: Story = {
  render: () => (
    <div className="states-demo flex flex-col gap-16">
      <style>{`.states-demo .is-hover{color:var(--color-text-primary)}`}</style>
      {(["lg", "md", "sm"] as const).map((t) => (
        <div key={t} className="flex items-center gap-16">
          <span className="type-caption-base w-24 text-text-secondary">{t}</span>
          <Tab type={t} label="label" />
          <Tab type={t} label="label" className="is-hover" />
        </div>
      ))}
    </div>
  ),
};
