/*
 * DescriptionGuide — 화면 설계서(디스크립션)의 최종 산출물 렌더 컴포넌트.
 * 양식: docs/description-template.md (헤더 표 + Description 표).
 *
 * 구성(양식 "산출물 형태"):
 *  - 헤더 표   : 화면 / 화면 ID / 화면타입 / LOCATION / 화면구분.
 *  - 화면 슬롯 : 대상 화면(이미지 또는 페이지 컴포넌트) — `screen` prop 으로 주입.
 *  - 지시번호 마커 : 화면 위에 01·02… 번호를 절대 위치(%)로 얹어 Description 항목과 연결.
 *  - Description 표 : 번호별 동작 설명(제목 + 소분류 + 항목).
 *
 * 컴포넌트는 특정 화면에 종속되지 않는다 — 내용은 전부 prop 으로 받는다(스토리가 채운다).
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 * 마커 위치(top/left)는 화면 슬롯 대비 백분율이라 인라인 style 로 전달한다(디자인 토큰 아님).
 */

import type { ReactNode } from "react";

/** 헤더 표 5개 항목(양식 헤더 표). */
export interface DescriptionGuideHeader {
  screen: string;
  screenId: string;
  screenType: string;
  location: string;
  screenKind: string;
}

/** 화면 위 지시번호 마커. top/left 는 화면 슬롯 대비 백분율(예: "56%"). */
export interface DescriptionMarker {
  number: string;
  top: string;
  left: string;
}

/** Description 항목 안의 소분류(예: "1. 노출 조건" + 불릿 항목들). */
export interface DescriptionSection {
  heading: string;
  items: string[];
}

/** Description 표의 번호 행(예: 01 [Page] …). */
export interface DescriptionRow {
  number: string;
  title: string;
  sections: DescriptionSection[];
}

export interface DescriptionGuideProps {
  header: DescriptionGuideHeader;
  /** 화면 슬롯 — 이미지(<img/>) 또는 페이지 컴포넌트. */
  screen: ReactNode;
  markers: DescriptionMarker[];
  rows: DescriptionRow[];
}

/** 헤더 표 셀 공통 유틸리티. */
const TH = "border border-border-default bg-bg-subtle px-16 py-10 text-left type-body-base text-text-default whitespace-nowrap align-middle";
const TD = "border border-border-default px-16 py-10 type-body-base text-text-secondary align-middle";

export function DescriptionGuide({ header, screen, markers, rows }: DescriptionGuideProps) {
  return (
    <div className="flex flex-col gap-24 bg-fill-white p-24">
      {/* 헤더 표 */}
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <th className={TH}>화면</th>
            <td className={TD}>{header.screen}</td>
            <th className={TH}>화면 ID</th>
            <td className={TD}>{header.screenId}</td>
            <th className={TH}>화면타입</th>
            <td className={TD}>{header.screenType}</td>
          </tr>
          <tr>
            <th className={TH}>LOCATION</th>
            <td className={TD} colSpan={3}>{header.location}</td>
            <th className={TH}>화면구분</th>
            <td className={TD}>{header.screenKind}</td>
          </tr>
        </tbody>
      </table>

      {/* 본문: 좌 화면(+마커) / 우 Description 표 */}
      <div className="flex flex-col gap-24 lg:flex-row lg:items-start">
        {/* 화면 슬롯 + 지시번호 마커 */}
        <div className="relative min-w-0 overflow-hidden rounded-8 border border-border-subtle lg:flex-1">
          {screen}
          {markers.map((m) => (
            <span
              key={m.number}
              className="absolute flex size-30 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fill-primary-01 type-body-base text-static-white"
              style={{ top: m.top, left: m.left }}
              aria-hidden="true"
            >
              {m.number}
            </span>
          ))}
        </div>

        {/* Description 표 */}
        <table className="w-full border-collapse lg:w-440">
          <tbody>
            {rows.map((r) => (
              <tr key={r.number}>
                <th className="w-50 border border-border-subtle bg-bg-subtle px-16 py-12 text-left align-top type-heading-3 text-text-default">
                  {r.number}
                </th>
                <td className="border border-border-subtle px-16 py-12 align-top">
                  <div className="flex flex-col gap-12">
                    <p className="type-body-large text-text-default">{r.title}</p>
                    {r.sections.map((s) => (
                      <div key={s.heading} className="flex flex-col gap-4">
                        <p className="type-body-base text-text-default">{s.heading}</p>
                        {s.items.map((item, i) => (
                          <p key={i} className="type-body-small text-text-secondary">
                            - {item}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
