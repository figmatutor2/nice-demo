import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

/**
 * NHN 디자인시스템 Pagination — 조립본 (Figma node 130-4356, « ‹ [1][2][3][4][5] › »).
 * 숫자 셀 5칸 고정 + 4개 화살표(첫/이전/다음/마지막). 생략기호·페이지 입력·크기 선택 없음.
 * Uncontrolled: defaultPage 로 초기 페이지 seed, onPageChange 로 변경 통지.
 * 경계 처리: 1페이지에서 « ‹ disabled, 5페이지에서 › » disabled.
 */
const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=130-4356",
    },
  },
  args: {
    defaultPage: 1,
  },
  argTypes: {
    defaultPage: {
      control: { type: "number", min: 1, max: 5 },
      description: "Uncontrolled 초기 페이지(1~5)",
    },
    onPageChange: {
      action: "pageChange",
      description: "페이지 변경 콜백(이동한 페이지 번호)",
    },
    className: {
      control: "text",
      description: "루트에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

/** 기본 — 1페이지. « ‹ 는 경계라 disabled. 셀·화살표를 클릭해 이동(uncontrolled). */
export const Default: Story = {};

/** 가운데 페이지(3) — 4개 화살표 모두 활성. */
export const MiddlePage: Story = { args: { defaultPage: 3 } };

/** 마지막 페이지(5) — › » 가 경계라 disabled. */
export const LastPage: Story = { args: { defaultPage: 5 } };
