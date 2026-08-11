import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";

/**
 * NHN 디자인시스템 Modal — "Server Security Check" 다이얼로그 (Figma node 329-1587).
 * 헤더(타이틀 + 닫기) · 바디(스텝 인디케이터 + 안내 목록 + 결제수단 추가) · 푸터(취소/다음)를 조립한다.
 * 스텝 연결선은 Divider, 푸터 버튼은 Button(lg), 추가 버튼의 +는 Icon("plus")를 재사용한다.
 * 모든 시각 값은 토큰 유틸리티(w-700, bg-bg-canvas, shadow-modal, rounded-2, size-46, w-98/w-90,
 * type-heading-3/4·type-body-base·type-caption-base, bg-interactive-primary, text-status-critical 등)로만 표현된다.
 */
const meta: Meta<typeof Modal> = {
  title: "Components/Modal/Server Security Check",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=329-1587",
    },
  },
  argTypes: {
    title: { control: "text", description: "다이얼로그 타이틀" },
    steps: { control: "object", description: "스텝 라벨 목록" },
    activeStep: {
      control: { type: "number", min: 0 },
      description: "현재 활성 스텝(0-based)",
    },
    sectionTitle: { control: "text", description: "본문 섹션 타이틀" },
    notices: { control: "object", description: "안내 문구 목록" },
    cancelLabel: { control: "text", description: "취소 버튼 라벨" },
    confirmLabel: { control: "text", description: "확인(다음) 버튼 라벨" },
    onClose: { action: "close", description: "닫기(X) 클릭" },
    onCancel: { action: "cancel", description: "취소 클릭" },
    onConfirm: { action: "confirm", description: "확인(다음) 클릭" },
    onAddCard: { action: "addCard", description: "결제 수단 추가(+) 클릭" },
    className: {
      control: "text",
      description: "기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

/** 기본 — 시안 그대로(스텝 1 활성). */
export const Default: Story = {};

/** 두 번째 스텝 활성 — 뱃지 색이 2번으로 이동한다. */
export const SecondStep: Story = {
  args: { activeStep: 1 },
};

/**
 * 오버레이 위 표시 — 실제 사용 맥락(딤 배경 위 중앙 정렬).
 * 배경 딤은 토큰색 bg-static-black 에 불투명도 모디파이어(/60)를 적용한다.
 */
export const OnOverlay: Story = {
  parameters: { layout: "fullscreen" },
  render: (args) => (
    <div className="flex min-h-screen items-center justify-center bg-static-black/60 p-40">
      <Modal {...args} />
    </div>
  ),
};

/** 내용 오버라이드 — title·steps·notices·버튼 라벨을 다른 값으로 교체. */
export const CustomContent: Story = {
  args: {
    title: "결제 수단 등록",
    steps: ["약관 동의", "결제 수단 등록", "완료"],
    activeStep: 1,
    sectionTitle: "안내",
    notices: [
      "등록 가능한 결제 수단은 신용카드와 계좌이체입니다.",
      "결제 수단은 계정당 최대 3개까지 등록할 수 있습니다.",
    ],
    cancelLabel: "이전",
    confirmLabel: "등록",
  },
};
