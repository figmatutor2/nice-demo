import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

/**
 * 전역 푸터 바 (Figma node 137-7303).
 * 좌측 정책 링크 그룹 + 우측 저작권 문구. 링크 중 `current` 항목은 강조색(text/primary).
 * 모든 시각 값은 토큰 유틸리티(`bg-bg-subtle`, `text-text-*`, `px-30`, `gap-24`,
 * `type-caption-small`)로만 표현되며 행 높이는 `py-11` + line-height 18로 합성된다.
 */
/*
 * 대표 뷰포트 정의 (layout-components.md 규칙4: 1920 / 1440 / 1024 양끝 정렬 검증용).
 * 폭은 컴포넌트 시각 토큰이 아니라 "브라우저 뷰포트 테스트 크기"이므로 token-exempt.
 */
const VIEWPORTS = {
  w1920: { name: "1920 · FHD", styles: { width: "1920px", height: "160px" } }, // token-exempt: 뷰포트 테스트 폭(브라우저 크기)
  w1440: { name: "1440 · Laptop", styles: { width: "1440px", height: "160px" } }, // token-exempt: 뷰포트 테스트 폭(브라우저 크기)
  w1024: { name: "1024 · Tablet", styles: { width: "1024px", height: "160px" } }, // token-exempt: 뷰포트 테스트 폭(브라우저 크기)
};

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: { viewports: VIEWPORTS },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=137-7303",
    },
  },
  argTypes: {
    links: {
      control: "object",
      description: "좌측 링크 목록. `current: true`인 항목은 강조색으로 표시",
    },
    copyright: { control: "text", description: "우측 저작권 문구" },
    className: {
      control: "text",
      description: "기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Footer>;

/** 기본: Figma 원본 스펙 그대로 (세 번째 링크가 current 강조). */
export const Default: Story = {};

/** 강조 링크 없음 — 모든 링크가 기본색(text/default). */
export const NoCurrentLink: Story = {
  args: {
    links: [
      { label: "이용 약관", href: "#" },
      { label: "서비스 수준 약정(SLA)", href: "#" },
      { label: "개인 정보 처리 방침", href: "#" },
    ],
  },
};

/** 링크·저작권 문구 커스터마이즈 예시. */
export const CustomContent: Story = {
  args: {
    links: [
      { label: "About", href: "#", current: true },
      { label: "Docs", href: "#" },
      { label: "Support", href: "#" },
    ],
    copyright: "ⓒ2026 Example Corp.",
  },
};

/*
 * 뷰포트 고정 스토리 — 폭이 바뀌어도 좌측 링크 그룹은 왼쪽 끝, 우측 저작권은
 * 오른쪽 끝에 양끝 정렬(justify-between)로 고정됨을 확인한다(layout-components.md 규칙4).
 * `tags: ["!dev"]`로 사이드바 목차에서는 숨기고 Docs 페이지에만 노출한다.
 */

/** 1920 폭 뷰포트 — 양끝 정렬 유지 확인. */
export const Viewport1920: Story = {
  tags: ["!dev"],
  parameters: { viewport: { defaultViewport: "w1920" } },
};

/** 1440 폭 뷰포트 — 양끝 정렬 유지 확인. */
export const Viewport1440: Story = {
  tags: ["!dev"],
  parameters: { viewport: { defaultViewport: "w1440" } },
};

/** 1024 폭 뷰포트 — 양끝 정렬 유지 확인. */
export const Viewport1024: Story = {
  tags: ["!dev"],
  parameters: { viewport: { defaultViewport: "w1024" } },
};
