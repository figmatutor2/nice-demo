import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";

// 토큰 이름 + 렌더용 리터럴 유틸 클래스(값 아님). 실제 반경은 렌더된 스와치에서 읽는다.
const RADIUS: { token: string; roundedClass: string; usage: string }[] = [
  { token: "--radius-1", roundedClass: "rounded-1", usage: "최소 라운드 · 미세한 모서리" },
  { token: "--radius-2", roundedClass: "rounded-2", usage: "기본 라운드 · 카드, 태그" },
  { token: "--radius-18", roundedClass: "rounded-18", usage: "큰 라운드 · 버튼, 뱃지" },
];

function RadiusCard({
  token,
  roundedClass,
  usage,
}: {
  token: string;
  roundedClass: string;
  usage: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).borderTopLeftRadius);
  }, []);
  return (
    <div className="flex items-center gap-16">
      <div
        ref={ref}
        className={`size-50 shrink-0 border border-border-strong bg-bg-surface ${roundedClass}`}
      />
      <div className="min-w-0">
        <div className="type-body-base text-text-default">
          {token.replace("--radius-", "radius/")}
          <span className="type-caption-base ml-8 text-text-primary">{value}</span>
        </div>
        <div className="type-caption-base text-text-secondary">{usage}</div>
      </div>
    </div>
  );
}

function RadiusView() {
  return (
    <div className="bg-bg-canvas p-24">
      <h2 className="type-heading-2 mb-16 text-text-default">Radius scale</h2>
      <div className="flex flex-col gap-16">
        {RADIUS.map((r) => (
          <RadiusCard key={r.token} token={r.token} roundedClass={r.roundedClass} usage={r.usage} />
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Design Tokens/Radius",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

export const Radius: Story = { render: () => <RadiusView /> };
