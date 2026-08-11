import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import { toHex } from "./tokenViz";

// 토큰 "이름"만 나열(값 아님). 실제 색상 값은 렌더된 스와치에서 런타임에 읽는다.
const SEMANTIC: { label: string; tokens: string[] }[] = [
  { label: "static", tokens: ["--color-static-white", "--color-static-black"] },
  {
    label: "text",
    tokens: [
      "--color-text-default",
      "--color-text-primary",
      "--color-text-secondary",
      "--color-text-disabled",
    ],
  },
  {
    label: "bg",
    tokens: [
      "--color-bg-canvas",
      "--color-bg-surface",
      "--color-bg-subtle",
      "--color-bg-muted",
      "--color-bg-inverse",
    ],
  },
  {
    label: "border",
    tokens: [
      "--color-border-subtle",
      "--color-border-default",
      "--color-border-medium",
      "--color-border-strong",
      "--color-border-primary",
      "--color-border-caution",
      "--color-border-inverse",
    ],
  },
  {
    label: "icon",
    tokens: [
      "--color-icon-default",
      "--color-icon-subtle",
      "--color-icon-accent",
      "--color-icon-on-white",
      "--color-icon-tertiary",
    ],
  },
  {
    label: "interactive",
    tokens: [
      "--color-interactive-primary",
      "--color-interactive-hover",
      "--color-interactive-light",
    ],
  },
  {
    label: "status",
    tokens: [
      "--color-status-critical",
      "--color-status-critical-surface",
      "--color-status-success",
      "--color-status-success-surface",
      "--color-status-urgent",
      "--color-status-urgent-surface",
      "--color-status-info",
      "--color-status-info-surface",
    ],
  },
  {
    label: "fill",
    tokens: [
      "--color-fill-default",
      "--color-fill-primary-01",
      "--color-fill-primary-02",
      "--color-fill-secondary-01",
      "--color-fill-secondary-02",
      "--color-fill-tertiary-01",
      "--color-fill-subtle",
      "--color-fill-muted",
      "--color-fill-white",
    ],
  },
];

const PALETTE: { label: string; tokens: string[] }[] = [
  {
    label: "blue",
    tokens: [
      "--palette-blue-100",
      "--palette-blue-200",
      "--palette-blue-300",
      "--palette-blue-400",
      "--palette-blue-500",
      "--palette-blue-600",
      "--palette-blue-700",
      "--palette-blue-800",
      "--palette-blue-900",
    ],
  },
  {
    label: "neutral",
    tokens: [
      "--palette-neutral-100",
      "--palette-neutral-200",
      "--palette-neutral-300",
      "--palette-neutral-400",
      "--palette-neutral-500",
      "--palette-neutral-600",
      "--palette-neutral-700",
      "--palette-neutral-800",
      "--palette-neutral-850",
      "--palette-neutral-900",
    ],
  },
  {
    label: "red",
    tokens: [
      "--palette-red-100",
      "--palette-red-200",
      "--palette-red-300",
      "--palette-red-500",
      "--palette-red-700",
    ],
  },
  {
    label: "green",
    tokens: [
      "--palette-green-100",
      "--palette-green-200",
      "--palette-green-300",
      "--palette-green-500",
      "--palette-green-700",
    ],
  },
  {
    label: "purple",
    tokens: [
      "--palette-purple-100",
      "--palette-purple-200",
      "--palette-purple-300",
      "--palette-purple-500",
      "--palette-purple-700",
    ],
  },
];

function Swatch({ token, prefix }: { token: string; prefix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState("");
  useEffect(() => {
    if (ref.current) setHex(toHex(getComputedStyle(ref.current).backgroundColor));
  }, []);
  return (
    <div className="flex items-center gap-8">
      <div
        ref={ref}
        className="size-24 shrink-0 rounded-2 border border-border-subtle"
        style={{ backgroundColor: `var(${token})` }}
      />
      <div className="min-w-0">
        <div className="type-caption-base text-text-default">{token.replace(prefix, "")}</div>
        <div className="type-caption-small text-text-secondary">{hex}</div>
      </div>
    </div>
  );
}

function Group({ label, tokens, prefix }: { label: string; tokens: string[]; prefix: string }) {
  return (
    <section className="mb-24">
      <h3 className="type-body-base mb-8 text-text-primary">{label}</h3>
      <div className="grid grid-cols-2 gap-12">
        {tokens.map((t) => (
          <Swatch key={t} token={t} prefix={prefix} />
        ))}
      </div>
    </section>
  );
}

function ColorsView() {
  return (
    <div className="bg-bg-canvas p-24">
      <h2 className="type-heading-2 mb-16 text-text-default">Semantic</h2>
      {SEMANTIC.map((g) => (
        <Group key={g.label} label={g.label} tokens={g.tokens} prefix="--color-" />
      ))}
      <h2 className="type-heading-2 mt-24 mb-16 text-text-default">Primitives · palette</h2>
      {PALETTE.map((g) => (
        <Group key={g.label} label={g.label} tokens={g.tokens} prefix="--palette-" />
      ))}
    </div>
  );
}

const meta: Meta = {
  title: "Design Tokens/Colors",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

export const Colors: Story = { render: () => <ColorsView /> };
