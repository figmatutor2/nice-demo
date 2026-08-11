import type { Meta, StoryObj } from "@storybook/react";
import { Td } from "./Td";

/**
 * NHN 디자인시스템 테이블 본문 셀 (Figma node 100-5347, grid/Td).
 * 축: type(text·checkbox·button) × state(default·disabled·selected).
 * selected 는 행 단위 상태이지만(Table 소유), 셀 자체 스타일 확인을 위해 여기서 직접 노출한다.
 * type=button 셀은 기존 Button(size=sm·tertiary)을 재사용하고 색만 override 한다.
 * <td> 는 표 안에서만 유효하므로 스토리는 최소 <table><tbody><tr> 로 감싼다.
 */
const meta: Meta<typeof Td> = {
  title: "Components/Table/Td",
  component: Td,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Ugj4ksEhbVHGAJNlaZkNUq/-NHN-%EC%8B%A4%EC%8A%B5-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=100-5347",
    },
  },
  args: { type: "text", state: "default", children: "label" },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["text", "checkbox", "button"],
      description: "셀 유형 (Figma 축 `type`)",
    },
    state: {
      control: "inline-radio",
      options: ["default", "disabled", "selected"],
      description: "셀 상태 (Figma 축 `state`). selected 는 행 단위(Table 소유).",
    },
  },
  render: (args) => (
    <table className="border-collapse">
      <tbody>
        <tr>
          <Td {...args} />
        </tr>
      </tbody>
    </table>
  ),
};
export default meta;

type Story = StoryObj<typeof Td>;

/** text · default. */
export const Text: Story = { args: { type: "text", children: "ALL" } };

/** checkbox · default(미체크). */
export const CheckboxCell: Story = { args: { type: "checkbox", checkboxLabel: "행 선택" } };

/** button · default — Button 재사용, 라벨 text/primary. */
export const ButtonCell: Story = { args: { type: "button", children: "보기" } };

/** type × state 매트릭스 — 행=type, 열=state. Figma 심볼 배치와 대조. */
export const Matrix: Story = {
  render: () => {
    const types = ["text", "checkbox", "button"] as const;
    const states = ["default", "disabled", "selected"] as const;
    const label = (t: (typeof types)[number]) =>
      t === "button" ? "수정" : t === "checkbox" ? undefined : "label";
    return (
      <table className="border-collapse">
        <tbody>
          {types.map((t) => (
            <tr key={t}>
              {states.map((s) => (
                <Td key={s} type={t} state={s} checkboxLabel={`${t} ${s}`}>
                  {label(t)}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};
