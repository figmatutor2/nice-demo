---
name: sync-tokens
description: Figma 변수를 디자인 토큰으로 동기화하거나 하드코딩 값을 토큰으로 승격한다. 새 토큰이 필요할 때 사용. token-guardian 에이전트를 호출한다.
---

# /sync-tokens

Figma 변수 → 토큰 동기화, 또는 하드코딩 값의 토큰 승격 절차. 이 스킬은 **token-guardian
에이전트를 결정적으로 호출**한다. 토큰 파일만 편집된다.

## 언제
- 컴포넌트 작업 중 매핑되는 토큰이 없어 새 토큰이 필요할 때.
- Figma 변수를 토큰과 맞출 때. 하드코딩 값을 토큰으로 올릴 때.

## 절차 (Clarify → Reuse → Implement → Evaluate)

1. **Clarify** — 어떤 값을 어느 카테고리(색/간격/라디우스/타이포/그림자/브레이크포인트)로 토큰화할지 확정.
2. **위임** — `token-guardian` 에이전트(Agent 도구, subagent_type: "token-guardian")를 호출한다.
   전달: 대상 값/Figma 변수, 카테고리, 의도한 의미(role).
   - 에이전트는 `get_variable_defs`로 Figma 원천을 직접 확인한다.
   - `src/tokens/*.tokens.css`만 편집한다(컴포넌트 미변경).
3. **Reuse/Implement** — 기존 토큰 재사용 우선, 진짜 새 의미일 때만 의미 기반 이름으로 추가.
4. **Evaluate** — 유틸리티 정상 생성 + Figma 값 일치 확인. 매핑 표 반환.

## 완료 기준
- 토큰 파일에 의미 기반 토큰 추가/수정 완료. Figma 변수↔토큰 매핑 표 존재. 컴포넌트 코드 무변경.
