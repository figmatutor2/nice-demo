import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import type { TypeMetrics } from "./tokenViz";

// type-* @utility 클래스 이름만 나열(값 아님). 실제 메트릭은 렌더된 샘플에서 읽는다.
const TYPES: { cls: string; sample: string; usage: string }[] = [
  { cls: "type-display", sample: "NHN Cloud Console", usage: "서비스·페이지 메인 타이틀" },
  { cls: "type-heading-1", sample: "새로운 기능이 추가되었습니다", usage: "섹션 대표 설명 / 서브타이틀" },
  { cls: "type-heading-2", sample: "새 소식", usage: "섹션 헤딩" },
  { cls: "type-heading-3", sample: "Server Security Check", usage: "모달·다이얼로그 타이틀" },
  { cls: "type-heading-4", sample: "단계 표시 / 강조", usage: "스텝 인디케이터·특수 강조" },
  { cls: "type-body-large", sample: "알림 · 프로젝트", usage: "두드러진 레이블" },
  { cls: "type-body-base", sample: "결제 수단 · 취소 · 다음", usage: "내비게이션·버튼·폼 레이블" },
  { cls: "type-body-small", sample: "조직을 생성해 주세요.", usage: "본문·목록 아이템" },
  { cls: "type-caption-base", sample: "Cloud Trail · 서비스 이용", usage: "기본 UI 텍스트 (최다 사용)" },
  { cls: "type-caption-small", sample: "ⓒ NHN Cloud Corp.", usage: "푸터·저작권·메타 정보" },
];

function TypeRow({ cls, sample, usage }: { cls: string; sample: string; usage: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [m, setM] = useState<TypeMetrics | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const cs = getComputedStyle(ref.current);
    setM({
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      fontWeight: cs.fontWeight,
      fontFamily: cs.fontFamily,
    });
  }, []);
  return (
    <div className="flex flex-col gap-8 border-b border-border-subtle pb-16">
      <p ref={ref} className={`text-text-default ${cls}`}>
        {sample}
      </p>
      <div className="flex flex-wrap gap-8">
        <code className="type-caption-base text-text-primary">{cls}</code>
        <span className="type-caption-base text-text-secondary">
          {m ? `${m.fontSize} · ${m.fontWeight} · LH ${m.lineHeight}` : ""}
        </span>
        <span className="type-caption-base text-text-secondary">— {usage}</span>
      </div>
    </div>
  );
}

function TypographyView() {
  return (
    <div className="bg-bg-canvas p-24">
      <h2 className="type-heading-2 mb-16 text-text-default">Typography scale · Pretendard</h2>
      <div className="flex flex-col gap-16">
        {TYPES.map((t) => (
          <TypeRow key={t.cls} cls={t.cls} sample={t.sample} usage={t.usage} />
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Design Tokens/Typography",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

export const Typography: Story = { render: () => <TypographyView /> };
