/*
 * Breadcrumb — NHN 디자인시스템 경로 표시.
 * 출처: Figma "NHN 실습 디자인시스템" node 137-7074 (1~3 depth, depth 사이 chevron 구분).
 *
 * 구성: depth 라벨들을 chevron-right 아이콘으로 구분해 나열한다. 마지막 depth = 현재 페이지.
 *   Figma 의 show2Depth/show3Depth 변형 대신, 임의 depth 를 받는 `items` 배열로 일반화한다.
 *
 * 재사용: 구분자 아이콘은 Icon 세트의 `chevron-right` 를 그대로 재사용(중복 생성 금지).
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *   라벨   Title 15 M            → type-body-base (15 · Medium)
 *          text/default          → text-text-default
 *   구분자 chevron-right(size 20) → <Icon name="chevron-right">, 색 text-icon-default
 *   간격   scale 5               → gap-5 (depth 사이 · 아이콘↔라벨)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import { Icon } from "../icons/Icon";

export interface BreadcrumbProps {
  /** depth 라벨 목록. 첫 항목이 최상위, 마지막 항목이 현재 페이지. */
  items: string[];
  /** 추가 Tailwind 토큰 클래스. */
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={["flex items-center", className].filter(Boolean).join(" ")}
      data-node-id="137:7074"
    >
      <ol className="flex items-center gap-5">
        {items.map((label, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-5">
              {i > 0 && (
                <Icon name="chevron-right" className="text-icon-default" aria-hidden />
              )}
              <span
                className="type-body-base text-text-default whitespace-nowrap"
                aria-current={isLast ? "page" : undefined}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
