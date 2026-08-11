---
name: review-design
description: 완료 전 검증 게이트를 실행한다. 하드코딩0/토큰사용/범위일치/빌드/a11y/스크린샷을 점검하고 PASS/FAIL을 반환. 모든 컴포넌트 작업의 마지막 단계. design-reviewer 에이전트를 호출한다.
---

# /review-design

작업 완료를 선언하기 전 반드시 통과해야 하는 검증 게이트. 이 스킬은 **design-reviewer
에이전트를 결정적으로 호출**한다. 코드는 수정하지 않고 PASS/FAIL만 판정한다.

## 언제
- figma-implementer / component-builder / token-guardian 작업 직후, "완료" 선언 전 항상.
- 이 게이트를 통과하지 못하면 작업은 미완이다(Goal-Driven Execution).

## 절차 (Clarify → Reuse → Implement → Evaluate)

1. **Clarify** — 검증 대상(파일/컴포넌트/원 요청 범위)을 확정한다.
2. **위임** — `design-reviewer` 에이전트(Agent 도구, subagent_type: "design-reviewer")를 호출한다.
   전달: 변경된 파일, 원 요청, (있으면) Figma 링크.
   - 에이전트는 6개 게이트를 점검하고 코드를 고치지 않는다.
3. **Evaluate** — 반환된 PASS/FAIL을 확인한다.
   - **PASS** → 작업 완료 선언 가능.
   - **FAIL** → 사유별 수정 지시를 원 담당 에이전트(figma-implementer/component-builder/token-guardian)에게
     되돌려 고친 뒤, 이 스킬을 다시 실행한다.

## 6개 게이트
하드코딩 0 · 토큰 사용 · 범위 일치 · 빌드 · a11y · 스크린샷. 전부 PASS여야 RESULT=PASS.
