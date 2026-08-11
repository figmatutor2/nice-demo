import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TabMenu } from "./TabMenu";

/**
 * 언더라인형 페이지 탭 바 조립본 (Figma node 137-7175).
 * 아이템 컴포넌트 `TabMenuList` 를 여러 개 조립하고 하단 구분선을 둔다.
 * `activeIndex` 로 선택 탭을 지정하고, `onChange` 로 전환한다.
 */
const meta: Meta<typeof TabMenu> = {
  title: "Components/TabMenu",
  component: TabMenu,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=137-7175",
    },
  },
};
export default meta;

type Story = StoryObj<typeof TabMenu>;

/** 기본 조립 — 첫 탭 선택. */
export const Default: Story = {
  args: {
    items: [{ label: "기본 정보" }, { label: "고급 설정" }, { label: "로그" }],
    activeIndex: 0,
  },
};

/** disabled 아이템 포함(4번째 탭 비활성). */
export const WithDisabled: Story = {
  args: {
    items: [
      { label: "기본 정보" },
      { label: "고급 설정" },
      { label: "로그" },
      { label: "준비중", disabled: true },
    ],
    activeIndex: 1,
  },
};

/** 상호작용 — 클릭으로 선택 탭 전환(hover 는 마우스를 올려 확인). */
export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <TabMenu
        items={[{ label: "기본 정보" }, { label: "고급 설정" }, { label: "로그" }]}
        activeIndex={active}
        onChange={setActive}
      />
    );
  },
};
