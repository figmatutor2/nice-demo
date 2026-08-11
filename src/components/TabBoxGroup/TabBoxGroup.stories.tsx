import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TabBoxGroup } from "./TabBoxGroup";

/**
 * 박스형 토글 그룹 조립본 (Figma node 137-7411).
 * 아이템 컴포넌트 `TabBox` 를 gap-2 로 묶는 단일 선택 그룹.
 * `activeIndex` 로 선택 항목을 지정하고 `onChange` 로 전환한다.
 */
const meta: Meta<typeof TabBoxGroup> = {
  title: "Components/TabBoxGroup",
  component: TabBoxGroup,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=137-7411",
    },
  },
};
export default meta;

type Story = StoryObj<typeof TabBoxGroup>;

/** 기본 조립 — 첫 토글 선택. */
export const Default: Story = {
  args: { items: ["IP", "포트"], activeIndex: 0, "aria-label": "필터 유형" },
};

/** 상호작용 — 클릭으로 선택 전환(hover 는 마우스를 올려 확인). */
export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <TabBoxGroup
        items={["IP", "포트", "URL"]}
        activeIndex={active}
        onChange={setActive}
        aria-label="필터 유형"
      />
    );
  },
};
