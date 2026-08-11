/*
 * Divider — 범용 구분선. 색·굵기 토큰만 참조하는 재사용 원자 컴포넌트.
 * 출처: Figma "NHN 실습 디자인시스템" node 134-5140 (Divider).
 *
 * Topbar·LNB 등 여러 레이아웃에서 공용으로 쓰이므로 특정 화면에 종속되지 않는다.
 *
 * 방향(orientation)은 "선 자체의 방향"으로 명명한다(관용적 의미):
 *  - vertical   = 세로선 (얇은 세로 막대). 가로 배치 요소 사이 구분(예: Topbar).  Figma `type=horizental`(1×60)에 대응.
 *  - horizontal = 가로선 (얇은 가로 막대). 세로 배치 요소 사이 구분.                Figma `type=vertical`(60×1)에 대응.
 *  ※ Figma 변형 이름(`horizental`/`vertical`)은 오타 + 축이 반대라, 관용 의미로 재명명하고 매핑만 기록한다.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  - 선 색 bg/muted → `bg-bg-muted` (Figma는 stroke가 아닌 채움 사각형)
 *  - 굵기          → `w-1` / `h-1` (= `--spacing-1`)
 *
 * 길이는 고정하지 않고 부모 컨테이너를 따른다(vertical=`h-full`, horizontal=`w-full`).
 * Topbar 안에 넣으면 세로선이 자동으로 그 행 높이를 따른다. raw px/hex/arbitrary 미사용.
 */
type DividerProps = {
  /** 선의 방향. vertical=세로선(기본), horizontal=가로선. */
  orientation?: "vertical" | "horizontal";
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스(길이 등 부모 제어용). */
  className?: string;
};

export function Divider({ orientation = "vertical", className }: DividerProps) {
  const shape = orientation === "vertical" ? "h-full w-1" : "w-full h-1";
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={["shrink-0 bg-bg-muted", shape, className]
        .filter(Boolean)
        .join(" ")}
      data-node-id="134:5140"
    />
  );
}
