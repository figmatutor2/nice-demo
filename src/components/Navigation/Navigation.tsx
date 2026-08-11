/*
 * Navigation — NHN 디자인시스템 콘텐츠 영역 상단 내비게이션 바(조립본).
 * 출처: Figma "NHN 실습 디자인시스템" node 137-7130 (좌: Breadcrumb / 우: 액션 버튼들).
 *
 * 레이아웃(레이아웃 규칙 적용 — 콘텐츠 영역 레벨):
 *   - Figma 프레임 폭 1560 은 프레임 크기일 뿐 → 루트는 `w-full`(고정/arbitrary 폭 금지).
 *   - 좌 leftArea(Breadcrumb)는 `flex-1`로 신축, 우 actions 는 오른쪽에 고정(양끝 배치).
 *   - 요소 간 간격은 spacing 토큰(gap-10 / gap-8)만 사용.
 *
 * 조립:
 *   - 좌측: Breadcrumb 컴포넌트 재사용(경로 items).
 *   - 우측: actions 슬롯 — 액션 버튼은 기존 Button(tertiary·md) 을 재사용해 채운다(스토리 참조).
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *   배경 bg/canvas → bg-bg-canvas
 *   간격 scale 10  → gap-10 (좌우 영역 사이)
 *        scale 8   → gap-8  (액션 버튼 사이)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import type { ReactNode } from "react";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";

export interface NavigationProps {
  /** 좌측 경로(Breadcrumb items). 첫=최상위, 끝=현재 페이지. */
  breadcrumb: string[];
  /** 우측 액션 영역. 기존 Button 등을 배치한다. */
  actions?: ReactNode;
  /** 추가 Tailwind 토큰 클래스. */
  className?: string;
}

export function Navigation({ breadcrumb, actions, className }: NavigationProps) {
  return (
    <div
      className={["flex w-full items-center gap-10 bg-bg-canvas", className]
        .filter(Boolean)
        .join(" ")}
      data-node-id="137:7130"
    >
      <div className="flex min-w-0 flex-1 items-center">
        <Breadcrumb items={breadcrumb} />
      </div>
      {actions != null && (
        <div className="flex shrink-0 items-center gap-8">{actions}</div>
      )}
    </div>
  );
}
