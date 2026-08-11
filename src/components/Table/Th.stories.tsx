import type { Meta, StoryObj } from "@storybook/react";
import { Th } from "./Th";
import { Checkbox } from "../Checkbox/Checkbox";

/**
 * NHN 디자인시스템 테이블 헤더 셀 (Figma node 100-5344, Grid/Th).
 * 시맨틱 <th scope="col">. type 축: checkbox(전체 선택 칸) · text(라벨 헤더).
 * 헤더는 항상 bg-bg-subtle, 격자선은 border-bg-muted.
 * <th> 는 표 안에서만 유효하므로 스토리는 최소 <table><thead><tr> 로 감싼다.
 */
const meta: Meta<typeof Th> = {
  title: "Components/Table/Th",
  component: Th,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=100-5344",
    },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["text", "checkbox"],
      description: "셀 유형 (Figma 축 `type`)",
    },
  },
  render: (args) => (
    <table className="border-collapse">
      <thead>
        <tr>
          <Th {...args} />
        </tr>
      </thead>
    </table>
  ),
};
export default meta;

type Story = StoryObj<typeof Th>;

/** text — 라벨 헤더. */
export const Text: Story = { args: { type: "text", children: "이름" } };

/** checkbox — 전체 선택 칸. */
export const CheckboxHeader: Story = {
  args: {
    type: "checkbox",
    children: <Checkbox aria-label="전체 선택" />,
  },
};

/** 헤더 한 줄 — checkbox + text 헤더가 나란히. */
export const HeaderRow: Story = {
  render: () => (
    <table className="border-collapse">
      <thead>
        <tr>
          <Th type="checkbox">
            <Checkbox aria-label="전체 선택" />
          </Th>
          <Th>이름</Th>
          <Th>타입</Th>
          <Th>프로토콜</Th>
          <Th>포트번호</Th>
          <Th>보기</Th>
          <Th>수정</Th>
        </tr>
      </thead>
    </table>
  ),
};
