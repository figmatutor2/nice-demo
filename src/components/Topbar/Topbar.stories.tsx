import type { Meta, StoryObj } from "@storybook/react";
import { Topbar } from "./Topbar";

/**
 * 전역 상단 바 조립본 (Figma node 135-5923).
 * 좌측: LogoButton + 서비스 Tab들(사이 Divider) / 우측: TopbarMenu.
 * 페이지 레벨 규칙 적용 — `w-full`(고정 1920 금지), `justify-between`(양끝 정렬), 높이만 `h-60` 고정.
 */
/*
 * 대표 뷰포트 (layout-components.md 규칙4: 1920 / 1440 / 1024 양끝 정렬 검증용).
 * 폭은 컴포넌트 시각 토큰이 아니라 "브라우저 뷰포트 테스트 크기"이므로 token-exempt.
 */
const VIEWPORTS = {
  w1920: { name: "1920 · FHD", styles: { width: "1920px", height: "120px" } }, // token-exempt: 뷰포트 테스트 폭
  w1440: { name: "1440 · Laptop", styles: { width: "1440px", height: "120px" } }, // token-exempt: 뷰포트 테스트 폭
  w1024: { name: "1024 · Tablet", styles: { width: "1024px", height: "120px" } }, // token-exempt: 뷰포트 테스트 폭
};

const meta: Meta<typeof Topbar> = {
  title: "Components/Topbar/Topbar",
  component: Topbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: { viewports: VIEWPORTS },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=135-5923",
    },
  },
  argTypes: {
    tabs: { control: "object", description: "좌측 서비스 탭 목록(사이 Divider 자동 삽입)" },
    logoHref: { control: "text", description: "로고 이동 경로" },
    region: { control: "text", description: "우측 메뉴 리전" },
    language: { control: "text", description: "우측 메뉴 언어" },
    account: { control: "text", description: "우측 메뉴 계정" },
  },
};
export default meta;

type Story = StoryObj<typeof Topbar>;

/** 기본: Figma 원본 구성(로고 + NHN·핑크다이어리·서비스 선택·칩 + 우측 유틸 메뉴). */
export const Default: Story = {};

/** 탭 구성 커스터마이즈 예시. */
export const CustomTabs: Story = {
  args: {
    tabs: [
      { type: "lg", label: "콘솔", icon: "service" },
      { type: "md", label: "설정", icon: "setting" },
      { type: "sm", label: "베타" },
    ],
    region: "일본 리전",
    language: "English",
    account: "admin***@nhncloud.com",
  },
};

/*
 * 뷰포트 고정 스토리 — 폭이 바뀌어도 좌측 그룹은 왼쪽 끝, 우측 메뉴는 오른쪽 끝에
 * justify-between으로 고정되고 가운데(bg-subtle)만 신축됨을 확인한다(layout-components.md 규칙4).
 * `tags: ["!dev"]`로 사이드바 목록에서는 제외하고 Docs 페이지에만 노출한다.
 */

/** 1920 폭 — 양끝 정렬 유지 확인. */
export const Viewport1920: Story = {
  tags: ["!dev"],
  parameters: { viewport: { defaultViewport: "w1920" } },
};

/** 1440 폭 — 양끝 정렬 유지 확인. */
export const Viewport1440: Story = {
  tags: ["!dev"],
  parameters: { viewport: { defaultViewport: "w1440" } },
};

/** 1024 폭 — 양끝 정렬 유지 확인. */
export const Viewport1024: Story = {
  tags: ["!dev"],
  parameters: { viewport: { defaultViewport: "w1024" } },
};
