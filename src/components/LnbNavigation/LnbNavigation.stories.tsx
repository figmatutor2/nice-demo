import type { Meta, StoryObj } from "@storybook/react";
import { LnbNavigation } from "./LnbNavigation";

/**
 * 좌측 네비게이션 조립본 (Figma node 109-4672).
 * 파츠 조립: Org Title/List — Divider — Prj Title/1depth들 + 하단 Analytics.
 *
 * 페이지 레벨 규칙(사이드 네비 변형 — Topbar와 반대):
 *  - 가로 폭 260 고정(`w-260`, 컴포넌트 속성), 세로는 신축(`h-full` + `overflow-y-auto`).
 *  - 프리뷰는 `h-screen` 컨테이너로 감싸 세로 신축과 하단 Analytics 고정을 확인한다.
 *
 * 인터랙션: 각 Prj 1depth 헤더를 클릭하면 하위 2depth 리스트가 펼쳐지고/접힌다(uncontrolled 토글).
 */
const meta: Meta<typeof LnbNavigation> = {
  title: "Components/LnbNavigation/LnbNavigation",
  component: LnbNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=109-4672",
    },
  },
  argTypes: {
    orgTitle: { control: "text", description: "Org 섹션 제목" },
    orgItems: { control: "object", description: "Org 서비스 목록" },
    projectTitle: { control: "text", description: "Prj 섹션 제목" },
    projectItems: { control: "object", description: "Prj 1depth 목록(펼치면 2depth 노출)" },
    footerLabel: { control: "text", description: "하단 고정 항목 라벨" },
    footerItems: { control: "object", description: "하단 항목의 2depth 목록" },
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof LnbNavigation>;

/**
 * 기본 — Figma 원본 구성(모든 1depth 접힘). 헤더 클릭으로 펼쳐 2depth를 확인한다.
 * 하단 Analytics는 projectArea flex-1에 밀려 바닥에 고정된다.
 */
export const Default: Story = {};

/**
 * 펼침 예시 — 첫 프로젝트가 펼쳐진 상태(선택된 2depth 파랑 강조 포함).
 * Figma의 1depth active(펼침) 심볼에 대응.
 */
export const Expanded: Story = {
  args: {
    projectItems: [
      {
        label: "label",
        defaultExpanded: true,
        items: [{ label: "Auto Scale", active: true }, { label: "Auto Scale" }, { label: "Auto Scale" }],
      },
      { label: "label", items: [{ label: "Auto Scale" }, { label: "Auto Scale" }] },
      { label: "label", items: [{ label: "Auto Scale" }, { label: "Auto Scale" }] },
    ],
  },
};
