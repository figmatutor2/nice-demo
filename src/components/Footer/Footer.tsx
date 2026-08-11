/*
 * Footer — 전역 푸터 바 ("이용 약관 · SLA · 개인 정보 처리 방침" + 저작권).
 * 출처: Figma "NHN 실습 디자인시스템" node 137-7303 (Footer, 원본 폭 1920 · 높이 40).
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  - 배경 bg/subtle     → `bg-bg-subtle`
 *  - 링크 text/default   → `text-text-default`
 *  - 강조 링크 text/primary → `text-text-primary` (current 링크)
 *  - 좌우 여백 scale/30  → `px-30`
 *  - 링크 간격 scale/24  → `gap-24`
 *  - 타이포 Caption Small → `type-caption-small`
 *  - 행 높이            → `py-11` + line-height 18 = 11+18+11 (기존 토큰 합성, 신규 토큰 불필요)
 *
 * 너비는 원본 고정폭 대신 컨테이너 폭을 따르도록 `w-full`(반응형). raw px/hex/arbitrary 미사용.
 */

/** 푸터 링크 한 개. `current`이면 강조색(text/primary)으로 표시한다. */
export type FooterLink = {
  /** 링크 텍스트. */
  label: string;
  /** 이동 경로. */
  href: string;
  /** 현재 항목 강조 여부(파란색). */
  current?: boolean;
};

type FooterProps = {
  /** 좌측 링크 목록. 기본값은 Figma 원본(이용 약관 · SLA · 개인 정보 처리 방침). */
  links?: FooterLink[];
  /** 우측 저작권 문구. */
  copyright?: string;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
};

const DEFAULT_LINKS: FooterLink[] = [
  { label: "이용 약관", href: "#" },
  { label: "서비스 수준 약정(SLA)", href: "#" },
  { label: "개인 정보 처리 방침", href: "#", current: true },
];

const DEFAULT_COPYRIGHT = "ⓒNHN Cloud Corp. All rights reserved.";

export function Footer({
  links = DEFAULT_LINKS,
  copyright = DEFAULT_COPYRIGHT,
  className,
}: FooterProps) {
  return (
    <footer
      className={[
        "flex w-full items-center justify-between bg-bg-subtle px-30 py-11",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-node-id="137:7303"
    >
      <nav aria-label="푸터">
        <ul className="flex list-none items-center gap-24">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                aria-current={link.current ? "page" : undefined}
                className={[
                  "type-caption-small whitespace-nowrap",
                  link.current ? "text-text-primary" : "text-text-default",
                ].join(" ")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="type-caption-small whitespace-nowrap text-text-default">
        {copyright}
      </p>
    </footer>
  );
}
