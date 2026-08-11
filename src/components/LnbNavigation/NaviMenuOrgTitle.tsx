import type { ReactNode } from "react";

/*
 * NaviMenuOrgTitle — LNB 섹션 헤더 라벨 ("NHN" / "Project").
 * 출처: Figma "NHN 실습 디자인시스템" node 100:6054 (NaviMenu/Org/Title).
 *
 * Org 영역과 Prj 영역의 섹션 제목에 공용으로 쓰인다(Figma도 동일 심볼을 양쪽에서 재사용).
 * 자신은 목록/트리 항목이 아니라 "구획 제목"일 뿐이라 클릭·상태가 없다.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  - 텍스트 text/default → text-text-default
 *  - 배경 fill/white     → bg-fill-white
 *  - 좌우 여백 scale/30  → px-30
 *  - 타이포 Title 15 M(size15 · lh18 · w500) → type-body-base(15/22/500) 근사(가장 가까운 15 Medium 유틸)
 *  - 세로 높이 Figma 59 → py-20 (합 58, 토큰 합성; raw px 금지)
 * 폭은 고정하지 않고 부모(260 폭 LNB)를 따른다(w-full). raw px/hex/arbitrary 미사용.
 */
type NaviMenuOrgTitleProps = {
  /** 섹션 제목 텍스트. */
  children: ReactNode;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
};

export function NaviMenuOrgTitle({ children, className }: NaviMenuOrgTitleProps) {
  return (
    <div
      className={["type-body-base w-full bg-fill-white px-30 py-20 text-text-default", className]
        .filter(Boolean)
        .join(" ")}
      data-node-id="100:6054"
    >
      {children}
    </div>
  );
}
