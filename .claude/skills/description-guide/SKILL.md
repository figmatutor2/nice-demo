---
name: description-guide
description: 화면 설계서(디스크립션)를 작성해 DescriptionGuide 스토리로 만든다. "디스크립션", "화면설계서", "기획문서", "설계서 만들어줘", "디스크립션 가이드", "우리 템플릿으로", "이 디자인 기획문서 만들어줘" 같은 요청에 발동. 디자인 이미지/링크가 첨부된 화면 기획 산출물 작업에 사용.
---

# /description-guide

화면 설계서(디스크립션)를 만드는 표준 절차. **최종 산출물은 md가 아니라 Storybook
스토리다** — md만 쓰고 끝내면 미완이다.

## 언제
- "디스크립션", "화면설계서", "기획문서", "설계서/디스크립션 가이드 만들어줘",
  "우리 템플릿으로 (기획문서) 만들어줘" 등의 요청.
- 보통 화면 디자인(이미지 첨부 또는 Figma 링크) + 동작 요구사항 텍스트가 함께 온다.
- 컴포넌트 구현 요청이면 이 스킬이 아니라 `/figma-to-code` 또는 `/new-component`를 쓴다.

## 절차 (Clarify → Reuse → Implement → Evaluate)

### ① Clarify — 양식은 `docs/description-template.md`를 따른다
내용 양식(헤더 표 5항목 + Description 번호 표)은 그 문서가 SSOT다. 먼저 읽고 시작한다.
헤더 표 항목(화면 / 화면 ID / 화면타입 / LOCATION / 화면구분) 중 값을 알 수 없는 것은
비우되 임의 값으로 채우지 않는다.

### ② Reuse — 정적 구성은 첨부 디자인에서 읽는다
- 화면에 보이는 정적 구성(제목·문구·필드 라벨·버튼 명칭·배치)은 **첨부된 디자인
  (이미지 또는 Figma 링크)에서 직접 읽어** 기입한다. 추측하지 않는다.
- **요구사항에 없는 항목(출력 정보·저장 정보·API 등)은 지어내지 말고 생략한다.**
  빈 칸을 채우기 위해 존재하지 않는 동작·데이터를 창작하지 않는다. 불확실하면
  불확실하다고 남긴다.
- 동작은 **조건 → 결과**로 적고, 성공/실패 분기가 있으면 각각 명시한다.

### ③ Implement — md는 중간 정리용
확정한 헤더/Description 내용을 `docs/descriptions/<화면-slug>.md`에 먼저 정리한다.
값의 출처(디자인 링크·노드 ID)와 판독 근거를 여기 남긴다. **여기서 멈추지 않는다.**

### ④ Implement — 최종 산출물은 DescriptionGuide 새 스토리
`src/components/DescriptionGuide/_Template.stories.tsx`(Storybook `Descriptions/_Template`)를
**복제해 props만 교체한다.** 컴포넌트(`DescriptionGuide.tsx`)는 수정하지 않는다.

1. `_Template.stories.tsx` → `src/components/DescriptionGuide/<화면-slug>.stories.tsx`로 복사.
2. `meta.title`을 `Descriptions/<화면 이름>`으로 바꾼다.
3. `header` / `rows`를 ③에서 확정한 값으로 교체한다.
4. **화면 슬롯엔 첨부 이미지를 쓴다** — 이미지를 `src/components/DescriptionGuide/`에
   `<화면-slug>-screen.png`로 저장하고 `import`해서 `screen: <img src={…} className="block w-full" />`로 넣는다.
   Figma 링크만 있으면 `get_screenshot`으로 받아 같은 방식으로 저장한다.
5. `markers`의 `top`/`left`(화면 슬롯 대비 %)를 실제 지시 대상 위치에 맞춘다 —
   Description 번호와 화면 위 마커가 같은 요소를 가리켜야 한다.
6. Figma 링크가 있으면 `parameters.design`에 넣는다.

### ⑤ Evaluate
- `npx tsc --noEmit` 통과(exit 0).
- Storybook에 `Descriptions/<화면 이름>` 스토리가 뜨고, 헤더 표 + 화면 + 마커 + Description
  표가 모두 렌더되는지 확인한다.
- 하드코딩 0건 — 스토리에서 raw hex/px/arbitrary를 쓰지 않는다(마커 `top`/`left` %만 인라인 허용).

## 완료 기준
- `docs/descriptions/<화면-slug>.md` 존재(중간 산출물).
- `src/components/DescriptionGuide/<화면-slug>.stories.tsx` + 화면 이미지 존재(최종 산출물).
- Description 항목 수 = 화면 위 마커 수, 번호 일치.
- `tsc --noEmit` exit 0.
