import type { Meta, StoryObj } from "@storybook/react";
import { Icon, ICON_NAMES, type IconName } from "./Icon";

const FIGMA_URL =
  "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=60-3260";

// 코드 name ↔ Figma 컴포넌트명 매핑 (node 60:3260, get_metadata 기준).
const FIGMA_NAMES: Record<IconName, string> = {
  service: "ic/service",
  search: "ic/search",
  folder: "ic/folder",
  "state-left": "ic/stateLeft",
  hamburger: "ic/hamburger",
  plus: "ic/plus",
  dooray: "ic/doorayS",
  "compute-instance": "ic/ComputeInstanceSBlue",
  "color-default": "ic/colorDefault",
  "compute-image": "ic/computeImageS",
  "compute-auto-scale": "ic/computeAutoScaleS",
  cloudtrail: "ic/cloudtrailS",
  "online-contact": "ic/onlineContactS",
  setting: "ic/setting",
  "workplace-erp": "ic/workplaceErpS",
  company: "ic/company",
  lock: "ic/lock",
  "chevron-right": "ic/chevronRight",
  "chevron-left": "ic/chevronLeft",
  "chevron-double-left": "ic/chevronDoubleLeft",
  "chevron-double-right": "ic/chevronDoubleRight",
  "arrow-down": "ic/arrowDown",
  "arrow-up": "ic/arrowUp",
  notice: "ic/noticeIcon",
};

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
  },
  args: {
    name: "search",
    title: "",
  },
  argTypes: {
    name: {
      control: "select",
      options: ICON_NAMES,
      description: "렌더할 아이콘 이름.",
    },
    title: {
      control: "text",
      description: "접근성 레이블. 비우면 장식용(aria-hidden).",
    },
    size: {
      control: "number",
      description: "아이콘 한 변 크기(px). 기본 20(= --spacing-20).",
    },
    className: {
      control: "text",
      description:
        "색은 text-icon-* 토큰 유틸리티(currentColor), 크기는 size prop 또는 size-* 토큰 유틸리티로 지정.",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

// 대표 스토리 — 전체 아이콘 세트(23종) + Figma↔코드 이름 매핑 그리드.
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="bg-bg-canvas p-24 text-icon-default">
      <div className="grid grid-cols-4 gap-16">
        {ICON_NAMES.map((n: IconName) => (
          <div
            key={n}
            className="flex flex-col items-center gap-8 rounded-2 border border-border-subtle p-16"
          >
            <Icon name={n} />
            <span className="type-caption-base text-text-default">{n}</span>
            <span className="type-caption-small text-text-secondary">{FIGMA_NAMES[n]}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// 단일 아이콘 — Controls 로 name/색/크기 조합 확인. 기본 색은 icon-default 토큰.
export const Playground: Story = {
  args: { name: "search", className: "text-icon-default" },
};

// icon 색상 토큰 매핑 시연 (currentColor ← text-icon-*).
export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-24 bg-bg-canvas p-24">
      <div className="flex flex-col items-center gap-8">
        <Icon name="setting" className="text-icon-default" />
        <span className="type-caption-small text-text-secondary">default</span>
      </div>
      <div className="flex flex-col items-center gap-8">
        <Icon name="setting" className="text-icon-accent" />
        <span className="type-caption-small text-text-secondary">accent</span>
      </div>
      <div className="flex flex-col items-center gap-8">
        <Icon name="setting" className="text-icon-subtle" />
        <span className="type-caption-small text-text-secondary">subtle</span>
      </div>
      <div className="flex flex-col items-center gap-8">
        <Icon name="setting" className="text-icon-tertiary" />
        <span className="type-caption-small text-text-secondary">tertiary</span>
      </div>
    </div>
  ),
};

// 크기 — size prop(px) 로 스케일. 아이콘은 20×20 viewBox 로 벡터 스케일.
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-end gap-24 bg-bg-canvas p-24 text-icon-default">
      <div className="flex flex-col items-center gap-8">
        <Icon name="dooray" size={16} />
        <span className="type-caption-small text-text-secondary">size 16</span>
      </div>
      <div className="flex flex-col items-center gap-8">
        <Icon name="dooray" size={20} />
        <span className="type-caption-small text-text-secondary">size 20</span>
      </div>
      <div className="flex flex-col items-center gap-8">
        <Icon name="dooray" size={24} />
        <span className="type-caption-small text-text-secondary">size 24</span>
      </div>
    </div>
  ),
};
