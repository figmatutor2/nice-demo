/*
 * Pagination — NHN 디자인시스템 페이지네이션 조립본.
 * 출처: Figma "NHN 실습 디자인시스템" node 130-4356 (178×32, « ‹ [1] › »).
 *
 * 구성: arrowLeftArea(« ‹) + num(숫자 셀들) + arrowRightArea(› »).
 *  - 화살표는 PageArrow, 숫자 셀은 PageIndicator 로 조립한다.
 *  - 숫자 셀은 정확히 5칸(1~5) 고정 렌더 — 생략기호(…)·페이지 점프 입력·페이지 크기 선택 없음(Simplicity First).
 *  - 경계 처리: 1페이지에서 « ‹ disabled, 마지막(5)페이지에서 › » disabled.
 *
 * 상태 소유: Uncontrolled(내부 useState) — Table/LNB 관례와 동일.
 *  - defaultPage 로 초기 페이지 seed, onPageChange 로 변경 통지. commit(next) 헬퍼로 clamp+통지.
 *  - controlled value override 는 두지 않는다(관례상 uncontrolled-only).
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  그룹 간격 scale/10 → gap-10 (--spacing-10)
 *  (배경·보더·아이콘·타이포 등 세부 토큰은 PageArrow / PageIndicator 참조.)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 * 접근성: 루트 <nav aria-label="페이지네이션">. 현재 페이지 셀 aria-current="page"(PageIndicator).
 */

import { useState } from "react";
import { PageArrow } from "./PageArrow";
import { PageIndicator } from "./PageIndicator";

/** 숫자 셀 개수 — Figma 기준 정확히 5칸 고정(생략기호·윈도잉 없음). */
const TOTAL_PAGES = 5;
const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

const clamp = (n: number) => Math.min(TOTAL_PAGES, Math.max(1, n));

export interface PaginationProps {
  /** Uncontrolled 초기 페이지(1~5). 기본 1. */
  defaultPage?: number;
  /** 페이지 변경 콜백(이동한 페이지 번호). */
  onPageChange?: (page: number) => void;
  /** 루트에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
}

export function Pagination({
  defaultPage = 1,
  onPageChange,
  className,
}: PaginationProps) {
  const [page, setPage] = useState(() => clamp(defaultPage));

  const commit = (next: number) => {
    const target = clamp(next);
    if (target === page) return;
    setPage(target);
    onPageChange?.(target);
  };

  const atFirst = page === 1;
  const atLast = page === TOTAL_PAGES;

  return (
    <nav
      aria-label="페이지네이션"
      className={["inline-flex items-center gap-10", className]
        .filter(Boolean)
        .join(" ")}
      data-node-id="130:4356"
    >
      <div className="inline-flex items-center">
        <PageArrow
          direction="first"
          disabled={atFirst}
          onClick={() => commit(1)}
        />
        <PageArrow
          direction="prev"
          disabled={atFirst}
          onClick={() => commit(page - 1)}
        />
      </div>
      <div className="inline-flex items-center">
        {PAGES.map((p) => (
          <PageIndicator
            key={p}
            page={p}
            active={p === page}
            onClick={() => commit(p)}
          />
        ))}
      </div>
      <div className="inline-flex items-center">
        <PageArrow
          direction="next"
          disabled={atLast}
          onClick={() => commit(page + 1)}
        />
        <PageArrow
          direction="last"
          disabled={atLast}
          onClick={() => commit(TOTAL_PAGES)}
        />
      </div>
    </nav>
  );
}
