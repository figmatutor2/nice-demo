import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import { discoverVars } from "./tokenViz";

// 그림자 토큰(--shadow-*)을 스타일시트에서 동적으로 발견한다. 이름/값 모두 하드코딩하지 않는다.
function ShadowCard({ token }: { token: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).boxShadow);
  }, []);
  return (
    <div className="flex items-center gap-16">
      <div
        ref={ref}
        className="size-50 shrink-0 rounded-2 bg-bg-canvas"
        style={{ boxShadow: `var(${token})` }}
      />
      <div className="min-w-0">
        <div className="type-body-base text-text-default">{token.replace("--shadow-", "shadow/")}</div>
        <div className="type-caption-small text-text-secondary">{value}</div>
      </div>
    </div>
  );
}

function ElevationView() {
  const [tokens, setTokens] = useState<string[] | null>(null);
  useEffect(() => {
    setTokens(discoverVars("--shadow-"));
  }, []);

  return (
    <div className="bg-bg-canvas p-24">
      <h2 className="type-heading-2 mb-16 text-text-default">Elevation · shadow</h2>
      {tokens === null ? null : tokens.length === 0 ? (
        <div className="rounded-2 border border-border-default bg-bg-surface p-24">
          <p className="type-body-base text-text-default">정의된 그림자 토큰이 없습니다.</p>
          <p className="type-body-small mt-8 text-text-secondary">
            Figma “Tokens” 노드에는 Shadow/Elevation 가이드가 없어 추출할 원천이 없습니다.
            <code className="type-caption-base mx-4 text-text-primary">shadows.tokens.css</code>
            에 <code className="type-caption-base text-text-primary">--shadow-*</code> 토큰이 추가되면 이
            화면에 자동으로 표시됩니다.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-24">
          {tokens.map((t) => (
            <ShadowCard key={t} token={t} />
          ))}
        </div>
      )}
    </div>
  );
}

const meta: Meta = {
  title: "Design Tokens/Elevation",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

export const Elevation: Story = { render: () => <ElevationView /> };
