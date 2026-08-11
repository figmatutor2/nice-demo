import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";

// 토큰 이름 + 렌더용 리터럴 유틸 클래스(값 아님). 실제 px 값은 렌더된 막대에서 읽는다.
const SPACING: { token: string; widthClass: string }[] = [
  { token: "--spacing-1", widthClass: "w-1" },
  { token: "--spacing-2", widthClass: "w-2" },
  { token: "--spacing-4", widthClass: "w-4" },
  { token: "--spacing-5", widthClass: "w-5" },
  { token: "--spacing-6", widthClass: "w-6" },
  { token: "--spacing-8", widthClass: "w-8" },
  { token: "--spacing-10", widthClass: "w-10" },
  { token: "--spacing-11", widthClass: "w-11" },
  { token: "--spacing-12", widthClass: "w-12" },
  { token: "--spacing-13", widthClass: "w-13" },
  { token: "--spacing-15", widthClass: "w-15" },
  { token: "--spacing-16", widthClass: "w-16" },
  { token: "--spacing-20", widthClass: "w-20" },
  { token: "--spacing-24", widthClass: "w-24" },
  { token: "--spacing-25", widthClass: "w-25" },
  { token: "--spacing-26", widthClass: "w-26" },
  { token: "--spacing-30", widthClass: "w-30" },
  { token: "--spacing-50", widthClass: "w-50" },
];

function SpacingRow({ token, widthClass }: { token: string; widthClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).width);
  }, []);
  return (
    <div className="flex items-center gap-16">
      <code className="type-caption-base w-30 shrink-0 text-text-secondary">
        {token.replace("--spacing-", "")}
      </code>
      <div ref={ref} className={`h-16 shrink-0 rounded-2 bg-interactive-primary ${widthClass}`} />
      <span className="type-caption-base text-text-default">{value}</span>
    </div>
  );
}

function SpacingView() {
  return (
    <div className="bg-bg-canvas p-24">
      <h2 className="type-heading-2 mb-16 text-text-default">Spacing scale</h2>
      <div className="flex flex-col gap-12">
        {SPACING.map((s) => (
          <SpacingRow key={s.token} token={s.token} widthClass={s.widthClass} />
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Design Tokens/Spacing",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

export const Spacing: Story = { render: () => <SpacingView /> };
