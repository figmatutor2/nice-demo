#!/usr/bin/env node
/*
 * check-hardcode.mjs — Enforcement contract, layer 3 (auto-block).
 *
 * PreToolUse hook for Edit|Write|MultiEdit. Reads the tool call as JSON on stdin,
 * scans the content being written for raw visual values (hex / rgb / hsl / raw px /
 * arbitrary Tailwind). If any are found, exits 2 to BLOCK the tool call and prints
 * guidance ("value -> token") to stderr.
 *
 * Zero dependencies (Node built-ins only). Design tokens are the ONLY place raw
 * values may live, so token files are exempt. A per-line escape hatch exists via a
 * `token-exempt: <reason>` trailing comment.
 */

const EXEMPT_FILE = /(?:^|[\\/])(?:design-tokens\.css|[^\\/]*\.tokens\.css)$/;
const SCANNED_EXT = /\.(tsx|jsx|ts|js|css)$/;

/* A line is skipped when it carries a justified exemption: `token-exempt: <reason>`. */
const LINE_EXEMPT = /token-exempt:\s*\S+/;

/* Violation patterns. Each: { id, re, hint }. `re` runs per-line (global). */
const RULES = [
  {
    id: "hex-color",
    re: /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g,
    hint: "raw hex → color 토큰 (예: text-fg-base / bg-bg-base / var(--color-*))",
  },
  {
    id: "rgb-color",
    re: /\brgba?\(\s*\d/gi,
    hint: "rgb()/rgba() → color 토큰 (var(--color-*))",
  },
  {
    id: "hsl-color",
    re: /\bhsla?\(\s*\d/gi,
    hint: "hsl()/hsla() → color 토큰 (var(--color-*))",
  },
  {
    id: "raw-px",
    re: /\b\d+(?:\.\d+)?px\b/g,
    hint: "raw px → spacing/radius/text 토큰 (p-md / rounded-md / text-base)",
  },
  {
    id: "arbitrary-tailwind",
    re: /\b(?:[a-z-]+)-\[[^\]]+\]/g,
    hint: "arbitrary Tailwind (bg-[#..], p-[13px]) → 토큰 유틸리티",
  },
];

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (c) => (data += c));
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", () => resolve(data));
  });
}

/* Pull the target path + written content out of a PreToolUse payload. */
function extract(payload) {
  const input = payload?.tool_input ?? {};
  const path = input.file_path ?? input.path ?? "";
  const chunks = [];
  if (typeof input.content === "string") chunks.push(input.content);
  if (typeof input.new_string === "string") chunks.push(input.new_string);
  if (Array.isArray(input.edits)) {
    for (const e of input.edits) {
      if (typeof e?.new_string === "string") chunks.push(e.new_string);
    }
  }
  return { path, content: chunks.join("\n") };
}

function scan(content) {
  const violations = [];
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (LINE_EXEMPT.test(line)) continue;
    for (const rule of RULES) {
      rule.re.lastIndex = 0;
      let m;
      while ((m = rule.re.exec(line)) !== null) {
        violations.push({ line: i + 1, match: m[0], rule });
        if (m.index === rule.re.lastIndex) rule.re.lastIndex++;
      }
    }
  }
  return violations;
}

async function main() {
  const raw = await readStdin();
  let payload;
  try {
    payload = JSON.parse(raw || "{}");
  } catch {
    process.exit(0); // Not our concern; don't block on malformed payloads.
  }

  const { path, content } = extract(payload);
  if (!path || !SCANNED_EXT.test(path)) process.exit(0);
  if (EXEMPT_FILE.test(path)) process.exit(0); // token files are the SSOT
  if (!content) process.exit(0);

  const violations = scan(content);
  if (violations.length === 0) process.exit(0);

  const header = `\n⛔ 하드코딩 차단 (강제 계약 레이어 3) — ${path}\n` +
    `토큰 외 시각 값 ${violations.length}건. 모든 시각 값은 src/tokens 토큰만 사용해야 합니다.\n`;
  const body = violations
    .map((v) => `  L${v.line}  [${v.rule.id}] "${v.match}"  →  ${v.rule.hint}`)
    .join("\n");
  const footer =
    `\n\n해결: 값을 src/tokens/*.tokens.css 토큰으로 매핑하거나(/sync-tokens),\n` +
    `기존 토큰 유틸리티로 교체하세요. 불가피한 예외는 줄 끝에 \`token-exempt: <사유>\`.\n`;

  process.stderr.write(header + body + footer);
  process.exit(2); // exit 2 = block the tool call
}

main();
