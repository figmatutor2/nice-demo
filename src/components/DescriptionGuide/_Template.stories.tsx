import type { Meta, StoryObj } from "@storybook/react";
import { DescriptionGuide } from "./DescriptionGuide";
import screenImg from "./password-confirm-screen.png";

/**
 * 화면 설계서 템플릿 — 새 설계서는 이 파일을 복제해 props만 교체한다.
 * 절차: `.claude/skills/description-guide/SKILL.md` · 양식: `docs/description-template.md`.
 *
 * 화면 슬롯에는 참고용 실제 화면이 들어가 있다(비밀번호 재확인).
 * 구조를 보여주기 위한 예시이므로, 복제 시 자기 화면 이미지로 교체한다.
 *
 * 복제 순서
 *  1. 이 파일을 `<화면-slug>.stories.tsx`로 복사.
 *  2. `meta.title`을 `Descriptions/<화면 이름>`으로 교체.
 *  3. `header` / `rows`를 `docs/descriptions/<화면-slug>.md`에서 확정한 값으로 교체.
 *  4. 화면 이미지를 `./<화면-slug>-screen.png`로 저장하고 import 경로를 교체.
 *  5. `markers`의 top/left(%)를 실제 지시 대상 위치에 맞춘다.
 *  6. Figma 링크가 있으면 `parameters.design`에 넣는다.
 */
const meta: Meta<typeof DescriptionGuide> = {
  title: "Descriptions/_Template",
  component: DescriptionGuide,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    // 복제 시 실제 Figma 링크로 교체(없으면 이 블록 삭제).
    design: {
      type: "figma",
      url: "https://www.figma.com/design/z79nmEHX2y2qYpRhfIHGiL/?node-id=175-72541",
    },
  },
};
export default meta;

type Story = StoryObj<typeof DescriptionGuide>;

/** 텍스트 값은 플레이스홀더, 화면 슬롯은 참고용 실제 화면 — 복제 후 실제 값으로 교체한다. */
export const 템플릿: Story = {
  args: {
    header: {
      screen: "(화면 이름)",
      screenId: "(화면 ID)",
      screenType: "React",
      location: "(도달 경로 > 단계 > 화면)",
      screenKind: "Page",
    },
    // 화면 슬롯 — 복제 시 자기 화면 이미지로 교체한다.
    //   import screenImg from "./<화면-slug>-screen.png";
    screen: (
      <img src={screenImg} alt="(화면 이름) 화면" className="block w-full" />
    ),
    // top/left 는 화면 슬롯 대비 백분율. Description 번호와 같은 요소를 가리켜야 한다.
    markers: [
      { number: "01", top: "42.7%", left: "42.4%" },
      { number: "02", top: "63.6%", left: "37%" },
    ],
    rows: [
      {
        number: "01",
        title: "[Page] (화면 이름)",
        sections: [
          { heading: "1. 노출 조건", items: ["(어떤 경로/조건에서 이 화면이 노출되는지)"] },
          { heading: "2. 검증", items: ["(입력 검증이 있으면 조건 → 결과로)"] },
        ],
      },
      {
        number: "02",
        title: "[(버튼명)] 버튼",
        sections: [
          {
            heading: "1. 클릭 시",
            items: ["성공: (결과)", "실패: (결과)"],
          },
        ],
      },
    ],
  },
};
