---
name: figma-to-code
description: Figma 링크/노드를 토큰 기반 React 컴포넌트로 구현한다. Figma URL이나 노드 ID가 주어진 디자인→코드 작업에 사용. figma-implementer 에이전트를 호출한다.
---

# /figma-to-code

Figma 디자인을 토큰 기반 컴포넌트로 구현하는 표준 절차. 이 스킬은 **figma-implementer
에이전트를 결정적으로 호출**한다 — 직접 구현하지 말고 반드시 위임한다.

## 언제
- Figma 링크(figma.com URL) 또는 노드 ID가 주어진 컴포넌트/화면 구현 요청.
- Figma 참조가 없으면 이 스킬이 아니라 `/new-component`를 쓴다.

## 절차 (Clarify → Reuse → Implement → Evaluate)

1. **Clarify** — Figma 링크/노드가 있는지 확인. 없으면 사용자에게 요청하고 멈춘다.
2. **위임** — `figma-implementer` 에이전트(Agent 도구, subagent_type: "figma-implementer")를 호출한다.
   전달: Figma 링크/노드 ID, 구현 대상 범위, 산출 경로.
   - 에이전트는 Figma MCP(get_metadata/get_screenshot/get_design_context/get_variable_defs)를 직접 호출한다.
   - 토큰이 없으면 에이전트가 `/sync-tokens`로 위임한다(직접 raw 값 입력 금지).
3. **Reuse/Implement** — 에이전트가 기존 토큰/컴포넌트 재사용 후 surgical하게 구현 + 스토리 생성.
4. **Evaluate** — 완료 선언 전 반드시 `/review-design`으로 검증 게이트를 통과시킨다.

## 완료 기준
- 컴포넌트 + `*.stories.tsx`(autodocs + addon-designs Figma 링크) 존재.
- 하드코딩 0건(hook 통과). `/review-design` 결과 PASS.
