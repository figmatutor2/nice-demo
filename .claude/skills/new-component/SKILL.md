---
name: new-component
description: Figma 없이 기존 토큰만으로 새 컴포넌트나 변형을 생성한다. Figma 링크가 없는 컴포넌트 작업에 사용. component-builder 에이전트를 호출한다.
---

# /new-component

Figma 참조 없이 기존 토큰으로 컴포넌트를 만드는 표준 절차. 이 스킬은 **component-builder
에이전트를 결정적으로 호출**한다.

## 언제
- Figma 링크 없이 코드/토큰만으로 만드는 신규 컴포넌트 또는 variant 추가.
- Figma 링크가 있으면 `/figma-to-code`를 쓴다.

## 절차 (Clarify → Reuse → Implement → Evaluate)

1. **Clarify** — 컴포넌트 목적/props/variant를 확정. 모호하면 질문하고 멈춘다.
2. **위임** — `component-builder` 에이전트(Agent 도구, subagent_type: "component-builder")를 호출한다.
   전달: 컴포넌트 명세(목적·props·variant), 산출 경로.
   - 에이전트는 Figma를 호출하지 않는다. 기존 토큰/컴포넌트만 사용.
   - 필요한 토큰이 없으면 에이전트가 `/sync-tokens`로 위임한다.
3. **Reuse/Implement** — 기존 컴포넌트/토큰 재사용 우선, surgical 구현 + 각 variant 스토리.
4. **Evaluate** — 완료 선언 전 `/review-design`으로 검증 게이트 통과.

## 완료 기준
- 컴포넌트 + `*.stories.tsx`(autodocs, variant 포함) 존재. 하드코딩 0건. `/review-design` PASS.
