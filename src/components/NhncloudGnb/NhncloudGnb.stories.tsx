import type { Meta, StoryObj } from "@storybook/react";
import { NhncloudGnb } from "./NhncloudGnb";

/**
 * NHN Cloud 퍼블릭 존 GNB (Figma node 256-2900) — 페이지 레벨 가로형 바.
 * w-full(프레임 폭 1920은 프레임 값), 높이만 h-72 고정, 내부는 justify-between 으로
 * 좌(로고+메뉴)/우(유틸+Console) 양끝 배치. Console 버튼은 RoundButton size="sm" 재사용.
 * 폭이 바뀌어도 가운데가 신축될 뿐 양끝 정렬은 유지된다(대표 뷰포트 1920/1440/1024 확인).
 */
const meta: Meta<typeof NhncloudGnb> = {
  title: "Nhncloud/NhncloudGnb",
  component: NhncloudGnb,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=256-2900",
    },
  },
};
export default meta;

type Story = StoryObj<typeof NhncloudGnb>;

/** 기본 — 컨테이너 폭을 그대로 채운다(w-full). */
export const Default: Story = {};

/** 1920 뷰포트 — 좌/우 그룹 양끝 정렬 확인. */
export const Viewport1920: Story = {
  render: () => (
    <div className="w-full">
      <NhncloudGnb />
    </div>
  ),
  parameters: { viewport: { defaultViewport: "responsive" } },
};

/**
 * 폭 신축 검증 — 컨테이너 폭을 좁혀도(1440 → 1024) 양끝 그룹은 고정되고
 * 가운데(로고↔메뉴 사이)가 신축한다. justify-between 이 양끝 정렬을 유지.
 */
export const WidthResponsive: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <div style={{ inlineSize: "1440px" }}>{/* token-exempt: 대표 뷰포트 폭 1440 데모(컴포넌트는 w-full) */}
        <NhncloudGnb />
      </div>
      <div style={{ inlineSize: "1024px" }}>{/* token-exempt: 대표 뷰포트 폭 1024 데모(컴포넌트는 w-full) */}
        <NhncloudGnb />
      </div>
    </div>
  ),
};
