import type { ReactNode } from "react";
import { Divider } from "../Divider/Divider";

/*
 * TopbarMenu — Topbar 우측 유틸 메뉴 (리전 · 언어 · 계정).
 * 출처: Figma "NHN 실습 디자인시스템" node 135-5843 (ResourceTopbar/menu).
 *
 * 항목 사이 구분선은 범용 `Divider`(orientation=vertical)를 재사용한다.
 * 컨테이너 `py-24` 때문에 Divider의 `h-full`이 콘텐츠 높이(약 12)로 짧게 렌더된다(Figma와 동일).
 *
 * 계정 드롭다운(node 250-1407): `accountMenu` 슬롯을 넘기면 계정 텍스트 hover 시
 * 아래로 펼쳐진다. hover 그룹 래퍼를 `-my-24 py-24`로 바 전체 높이만큼 늘려 팝오버가
 * 바 하단(`top-full`)에 붙고, 텍스트→메뉴로 커서를 옮겨도 같은 그룹 안이라 열림이 유지된다.
 * 키보드 접근성: 트리거는 `<button>`, 팝오버는 `group-focus-within`으로도 열린다.
 *
 * 토큰 매핑:
 *  - 배경 bg/subtle → `bg-bg-subtle`
 *  - 텍스트 text/default(size/13) → `text-text-default` + `type-caption-base`
 *  - 높이 → `h-60`, 상하 여백 scale/24 → `py-24`, 항목 간격 scale/10 → `gap-10`
 */
type TopbarMenuProps = {
  /** 리전 표시. */
  region?: string;
  /** 언어 표시. */
  language?: string;
  /** 계정(마스킹된 이메일 등). */
  account?: string;
  /** 계정 텍스트 hover 시 아래로 펼칠 드롭다운(예: `<AccountMenu />`). 미지정 시 정적 텍스트. */
  accountMenu?: ReactNode;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
};

export function TopbarMenu({
  region = "한국 리전",
  language = "한국어",
  account = "nhncl***@nhncloud.com",
  accountMenu,
  className,
}: TopbarMenuProps) {
  return (
    <div
      className={[
        "flex h-60 items-center justify-end gap-10 bg-bg-subtle py-24 text-text-default",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-node-id="135:5843"
    >
      <span className="type-caption-base whitespace-nowrap">{region}</span>
      <Divider orientation="vertical" />
      <span className="type-caption-base whitespace-nowrap">{language}</span>
      <Divider orientation="vertical" />
      {accountMenu ? (
        <div className="group relative -my-24 flex items-center py-24">
          <button
            type="button"
            className="type-caption-base cursor-pointer whitespace-nowrap"
            aria-haspopup="menu"
          >
            {account}
          </button>
          <div className="absolute right-0 top-full z-50 hidden group-hover:block group-focus-within:block">
            {accountMenu}
          </div>
        </div>
      ) : (
        <span className="type-caption-base whitespace-nowrap">{account}</span>
      )}
    </div>
  );
}
