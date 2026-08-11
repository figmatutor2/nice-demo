import type { Meta, StoryObj } from "@storybook/react";
import { Navigation } from "./Navigation";
import { Button } from "../Button/Button";

/**
 * 콘텐츠 영역 상단 내비게이션 바 조립본 (Figma node 137-7130).
 * 좌측은 `Breadcrumb`, 우측 `actions` 슬롯은 기존 `Button`(tertiary·md)을 재사용해 채운다.
 *
 * 레이아웃: 루트는 `w-full`(Figma 1560은 프레임 폭일 뿐). 좌측 Breadcrumb 이 `flex-1`로
 * 신축하고 우측 버튼은 오른쪽 끝에 고정 → 폭이 바뀌어도 양끝 정렬 유지.
 *
 * 아이콘 주의: Figma 우측 버튼 중 "사용자 가이드"의 외부링크(↗) 아이콘은 DS Icon 세트(23종)에
 * 없어 텍스트만 둔다. "퀵 가이드"의 자물쇠는 Icon 세트 `lock` 을 재사용한다.
 */
const meta: Meta<typeof Navigation> = {
  title: "Components/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=137-7130",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Navigation>;

/** Figma 샘플 액션 버튼(기존 Button tertiary·md 재사용). */
const actions = (
  <>
    <Button variant="tertiary" size="md">
      URL&Appkey
    </Button>
    {/* 외부링크(↗) 아이콘은 DS Icon 세트에 없어 텍스트만 둔다. */}
    <Button variant="tertiary" size="md">
      사용자 가이드
    </Button>
    <Button variant="tertiary" size="md" leadingIcon="lock">
      퀵 가이드
    </Button>
  </>
);

/** 기본 — 좌 Breadcrumb / 우 액션 버튼(전체 폭). */
export const Default: Story = {
  args: { breadcrumb: ["Network Firewall", "객체"], actions },
  render: (args) => (
    <div className="p-30">
      <Navigation {...args} />
    </div>
  ),
};

/** 액션 없이 경로만. */
export const BreadcrumbOnly: Story = {
  args: { breadcrumb: ["Network Firewall", "객체"] },
  render: (args) => (
    <div className="p-30">
      <Navigation {...args} />
    </div>
  ),
};

/**
 * 반응형 검증 — 넓은 폭과 좁은 폭에서 좌우 양끝 정렬이 유지되는지 확인.
 * 가운데(Breadcrumb 영역)만 신축하고 우측 버튼은 끝에 고정된다.
 */
export const ResponsiveWidths: Story = {
  render: () => (
    <div className="flex flex-col gap-24 p-30">
      <div className="w-full">
        <Navigation breadcrumb={["Network Firewall", "객체"]} actions={actions} />
      </div>
      <div className="max-w-2xl">
        <Navigation breadcrumb={["Network Firewall", "객체"]} actions={actions} />
      </div>
    </div>
  ),
};
