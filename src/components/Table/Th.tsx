/*
 * Th — NHN 디자인시스템 테이블 헤더 셀 (Grid/Th).
 * 출처: Figma "NHN 실습 디자인시스템" node 100-5344 (Grid/Th).
 *
 * 렌더: 시맨틱 <th scope="col">. Table 의 <thead><tr> 안에서 사용한다.
 * type 축(Figma): checkbox(전체 선택 칸) · text(라벨 헤더). 헤더는 항상 bg/subtle.
 *  (Figma 의 type3/type4=disabled 헤더 변형은 조립 테이블에서 쓰이지 않아 미구현.)
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  배경   bg/subtle      → bg-bg-subtle
 *  텍스트 text/default   → text-text-default
 *  타이포 Body 13 R      → type-caption-base
 *  격자선 bg/muted       → border-bg-muted (Table border-collapse 와 합쳐져 그리드 형성)
 *  여백   px 12 · py 10  → px-12 py-10
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 * 접근성: scope="col" 로 열 헤더임을 명시. checkbox 칸의 Checkbox 는 호출부가 aria-label 제공.
 */

import type { ReactNode, ThHTMLAttributes } from "react";

/** 헤더 셀 유형 (Figma 축 `type`). */
export type ThType = "checkbox" | "text";

export interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** 셀 유형. 기본 text. checkbox 는 전체 선택 칸(콘텐츠 폭으로 hug). */
  type?: ThType;
  children?: ReactNode;
}

const BASE =
  "bg-bg-subtle text-text-default type-caption-base text-center align-middle border border-bg-muted px-12 py-10";

export function Th({ type = "text", scope = "col", className, children, ...rest }: ThProps) {
  return (
    <th
      scope={scope}
      className={[BASE, type === "checkbox" ? "w-px" : "", className]
        .filter(Boolean)
        .join(" ")}
      data-node-id="100:5344"
      {...rest}
    >
      {children}
    </th>
  );
}
