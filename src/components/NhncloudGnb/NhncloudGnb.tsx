/*
 * NhncloudGnb — NHN Cloud 퍼블릭 존 상단 글로벌 네비게이션 바(페이지 레벨 가로형).
 * 출처: Figma "NHN 실습 디자인시스템" node 256-2900 (Nhncloud/Gnb).
 *
 * 레이아웃 계약(.claude/rules/layout-components.md 수평 바):
 *  - 가로: 항상 w-full (Figma 프레임 폭 1920은 프레임 값 — 고정/arbitrary 폭 금지).
 *  - 세로: 높이만 Figma 스펙 고정 → h-72.
 *  - 내부: justify-between 으로 좌(로고+메뉴) / 우(유틸+Console) 양끝 배치, 간격은 토큰만.
 *
 * 토큰 매핑 (Figma → 프로젝트 토큰):
 *  배경   white              → bg-fill-white
 *  높이   프레임 72          → h-72
 *  좌우   패딩 60            → px-60
 *  로고↔메뉴                → gap-60
 *  메뉴 항목 좌우 패딩 18    → px-18
 *  유틸↔Console 간격 80      → gap-80
 *  유틸 링크 간격 28         → gap-28
 *  텍스트 (Figma raw 니어블랙 → 승격) → text-text-default
 *  타이포 Body Large 16/20/500        → type-body-large  (Figma GNB 메뉴 텍스트 공유 스타일 = Typography/Body Large. 2026-07-15 정합 감사에서 기존 type-nav 17/26/500이 Figma 근거 없는 code-only 값임이 확인되어 실측값 type-body-large로 이관)
 *  로고               → <LogoNhncloud/> (퍼블릭 존 신규 컴포넌트)
 *  Console 버튼       → <RoundButton size="sm"/> (퍼블릭 존 신규 컴포넌트 재사용)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import { LogoNhncloud } from "../LogoNhncloud/LogoNhncloud";
import { RoundButton } from "../RoundButton/RoundButton";

/** 주요 메뉴 항목(Figma 순서). */
const MENU = ["소개", "솔루션", "서비스", "요금", "마켓플레이스", "파트너", "고객지원", "리소스"];

/** 우측 유틸 링크(Figma 순서). */
const UTILS = ["마이페이지", "문의하기"];

/** 네비 링크 공통 유틸리티 — 풀하이트 클릭 영역 + 토큰 타이포/색. hover 는 CSS. */
const NAV_LINK =
  "flex h-72 items-center type-body-large text-text-default whitespace-nowrap " +
  "cursor-pointer transition-colors hover:text-text-primary";

export function NhncloudGnb({ className }: { className?: string }) {
  return (
    <header
      className={[
        "flex h-72 w-full items-center justify-between bg-fill-white px-60",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-node-id="256:2900"
    >
      {/* 좌: 로고 + 주요 메뉴 */}
      <div className="flex items-center gap-60">
        <a href="#" aria-label="NHN CLOUD 홈" className="flex items-center">
          <LogoNhncloud />
        </a>
        <nav aria-label="주요 메뉴">
          <ul className="flex items-center">
            {MENU.map((label) => (
              <li key={label}>
                <a href="#" className={`${NAV_LINK} px-18`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 우: 유틸 링크 + Console 버튼 */}
      <div className="flex items-center gap-80">
        <nav aria-label="유틸리티 메뉴">
          <ul className="flex items-center gap-28">
            {UTILS.map((label) => (
              <li key={label}>
                <a href="#" className={NAV_LINK}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <RoundButton size="sm">Console</RoundButton>
      </div>
    </header>
  );
}
