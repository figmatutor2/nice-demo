import { Logo } from "../Logo/Logo";

/*
 * LogoButton — Topbar 좌측 최상단 브랜드 버튼 (파란 배경 + 워드마크).
 * 출처: Figma "NHN 실습 디자인시스템" node 134-5773 (ResourceTopbar/logo).
 *
 * 기존 `Logo` 아톰(58:3058)을 그대로 재사용하고, 배경/상호작용만 이 버튼이 담당한다.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  - 배경 interactive/primary → `bg-interactive-primary`
 *  - hover 배경 interactive/hover → `hover:bg-interactive-hover` (prop 아님, CSS :hover)
 *  - 높이 → `h-60` (승격 토큰 --spacing-60)
 *  - 좌우 여백 → `px-30` (Figma 원본 여백에 가장 근접한 spacing 토큰; 폭은 고정 대신 hug)
 *  - 로고 색 fill/white → `Logo` 기본값 `text-fill-white`
 *
 * state=hover 는 prop이 아니라 CSS :hover 로 표현한다(스토리에서 상태별 미리보기 제공).
 */
type LogoButtonProps = {
  /** 로고 클릭 시 이동 경로(홈). */
  href?: string;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
};

export function LogoButton({ href = "#", className }: LogoButtonProps) {
  return (
    <a
      href={href}
      aria-label="NHN Cloud Console 홈"
      className={[
        "flex h-60 items-center justify-center bg-interactive-primary px-30 transition-colors hover:bg-interactive-hover",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-node-id="134:5773"
    >
      <Logo />
    </a>
  );
}
