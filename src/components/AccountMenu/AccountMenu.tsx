/*
 * AccountMenu — 계정 드롭다운 패널(조립본).
 * 출처: Figma "NHN 실습 디자인시스템" node 256-2691 (AccountMenu, 156w).
 *
 * 파츠 조립: AccountMenuItem 여러 개를 그룹으로 묶고, 그룹 사이에 Divider(재사용)를 넣는다.
 *
 * 구조: 시안의 5개 그룹(구분선 4개).
 *  1) 회원 정보 … 개인정보 이용 내역   2) 회원 역할 관리 … 결제 관리
 *  3) 회원/조직/프로젝트 권한 … 스테이션 관리   4) 고객 센터   5) 로그아웃
 *
 * API: groups(문자열 배열의 배열) + onItemClick 콜백 하나. 라우팅·화면 전환은 구현하지 않는다.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  패널 폭   156           → w-156 (--spacing-156, raw 프레임 폭 승격)
 *  패널 배경 bg/canvas      → bg-bg-canvas
 *  패널 보더 border/subtle  → border-border-subtle (그림자·라운드는 시안에 없음)
 *  세로 패딩 9             → py-9 (--spacing-9, raw 프레임 값 승격)
 *  그룹 간격 scale/5        → pt-5 / pb-5
 *  구분선 인셋 scale/20     → px-20 (Divider 좌우 여백)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import { Fragment } from "react";
import { AccountMenuItem } from "./AccountMenuItem";
import { Divider } from "../Divider/Divider";

/** 시안(node 256-2691)의 기본 5그룹. */
export const DEFAULT_ACCOUNT_MENU_GROUPS: string[][] = [
  ["회원 정보", "로그인 보안 설정", "마켓플레이스", "결제 수단", "크레딧", "개인정보 이용 내역"],
  ["회원 역할 관리", "회원 알림 수신 그룹 관리", "결제 관리"],
  ["회원/조직/프로젝트 권한", "조직/프로젝트 쿼터 관리", "API 보안 설정", "스테이션 관리"],
  ["고객 센터"],
  ["로그아웃"],
];

export interface AccountMenuProps {
  /** 항목 그룹 목록(문자열 배열의 배열). 그룹 사이에 Divider가 삽입된다. 기본값=시안 5그룹. */
  groups?: string[][];
  /** 항목 클릭 콜백. 클릭된 항목의 라벨을 전달한다. */
  onItemClick?: (label: string) => void;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
}

export function AccountMenu({
  groups = DEFAULT_ACCOUNT_MENU_GROUPS,
  onItemClick,
  className,
}: AccountMenuProps) {
  return (
    <div
      className={[
        "flex w-156 flex-col border border-solid border-border-subtle bg-bg-canvas py-9",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-node-id="256:2691"
    >
      {groups.map((group, gi) => (
        <Fragment key={group[0]}>
          {gi > 0 && (
            <div className="px-20">
              <Divider orientation="horizontal" />
            </div>
          )}
          <div
            className={[
              "flex flex-col",
              gi > 0 && "pt-5",
              gi < groups.length - 1 && "pb-5",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {group.map((label) => (
              <AccountMenuItem
                key={label}
                label={label}
                onClick={() => onItemClick?.(label)}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
