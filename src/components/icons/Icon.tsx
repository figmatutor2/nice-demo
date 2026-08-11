import type { ReactNode, SVGProps } from "react";

/**
 * Icon — NHN 디자인시스템 아이콘 세트.
 * 출처: Figma "NHN 실습 디자인시스템" section `icon` (node 60:3260), 23 심볼 · 20×20.
 *
 * 색상: 단색 아이콘은 `fill="currentColor"` 로 그려지므로 `text-icon-*` 유틸리티(토큰)로
 * 색을 지정한다. 예: `<span className="text-icon-accent"><Icon name="search" /></span>`.
 * `lock` 은 2톤(배지) 아이콘 — 원은 currentColor, 안쪽 자물쇠는 `--color-icon-on-white` 토큰.
 *
 * 크기: `size` prop(기본 20 = spacing 토큰 --spacing-20)이 svg width/height 를 지정한다.
 * 필요 시 `size-16`/`size-24` 등 토큰 유틸리티 className 으로도 재정의 가능(CSS 우선).
 * raw px 문자열/arbitrary 금지.
 */

// DS 기준 아이콘 크기 = spacing 토큰 --spacing-20 (size-20) 와 동일한 기준값.
const DEFAULT_ICON_SIZE = 20;

export const ICON_NAMES = [
  "service",
  "search",
  "folder",
  "state-left",
  "hamburger",
  "plus",
  "dooray",
  "compute-instance",
  "color-default",
  "compute-image",
  "compute-auto-scale",
  "cloudtrail",
  "online-contact",
  "setting",
  "workplace-erp",
  "company",
  "lock",
  "chevron-right",
  "chevron-left",
  "chevron-double-left",
  "chevron-double-right",
  "arrow-down",
  "arrow-up",
  "notice",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

// 각 아이콘의 vector geometry (Figma 노드에서 svg export → icon 그룹만 추출).
// 단색 path 는 fill 을 생략해 svg 의 currentColor 를 상속한다.
const PATHS: Record<IconName, ReactNode> = {
  service: (
    <path d="M7 17H3V13H7V17ZM12 17H8V13H12V17ZM17 17H13V13H17V17ZM7 12H3V8H7V12ZM12 12H8V8H12V12ZM17 12H13V8H17V12ZM7 7H3V3H7V7ZM12 7H8V3H12V7ZM17 7H13V3H17V7Z" />
  ),
  search: (
    <path d="M9.5 4C11.9853 4 14 6.01472 14 8.5C14 9.48738 13.6808 10.3996 13.1416 11.1416L16 14L14.5 15.5L11.5205 12.5205C10.9128 12.8265 10.2268 13 9.5 13C7.01472 13 5 10.9853 5 8.5C5 6.01472 7.01472 4 9.5 4ZM9.5 6C8.11929 6 7 7.11929 7 8.5C7 9.88071 8.11929 11 9.5 11C10.8807 11 12 9.88071 12 8.5C12 7.11929 10.8807 6 9.5 6Z" />
  ),
  folder: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 4V16C3 16.5523 3.44772 17 4 17H17C17.5523 17 18 16.5523 18 16V6C18 5.44772 17.5523 5 17 5H12L10 3H4C3.44772 3 3 3.44772 3 4Z"
    />
  ),
  "state-left": <path d="M5 16H3V4H5V16ZM17 16H7V4H17V16ZM9 14H15V6H9V14Z" />,
  hamburger: <path d="M15 15H5V13H15V15ZM15 11H5V9H15V11ZM15 7H5V5H15V7Z" />,
  plus: (
    <>
      <path fillRule="evenodd" clipRule="evenodd" d="M9 5V15H11V5H9Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5 9V11H15V9H5Z" />
    </>
  ),
  dooray: (
    <path d="M7.5 4C10.5376 4 13 6.46243 13 9.5V10.5C13 13.5376 10.5376 16 7.5 16H3V4H7.5ZM16 14C16.5826 14 17 14.4204 17 15C17 15.5658 16.5826 16 16 16C15.4459 16 15 15.5658 15 15C15 14.4204 15.4459 14 16 14ZM5 14H7.5C9.433 14 11 12.433 11 10.5V9.5C11 7.567 9.433 6 7.5 6H5V14ZM17 13H15V4H17V13Z" />
  ),
  "compute-instance": (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 3C3.44772 3 3 3.44772 3 4V8C3 8.55228 3.44772 9 4 9H16C16.5523 9 17 8.55228 17 8V4C17 3.44772 16.5523 3 16 3H4ZM11 5V7H15V5H11Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 11C3.44772 11 3 11.4477 3 12V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V12C17 11.4477 16.5523 11 16 11H4ZM11 13V15H15V13H11Z"
      />
    </>
  ),
  "color-default": (
    <path d="M9 7H7V13H13V11H15V15H5V5H9V7ZM15 10L13.207 8.20703L10.707 10.707L9.29297 9.29297L11.793 6.79297L10 5H15V10Z" />
  ),
  "compute-image": (
    <>
      <path d="M7 3V5H5V15H7V17H3V3H7Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7 7V9H9V7H7Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7 11V13H9V11H7Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11 7V9H13V7H11Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11 11V13H13V11H11Z" />
      <path d="M13 3V5H15V15H13V17H17V3H13Z" />
    </>
  ),
  "compute-auto-scale": (
    <path d="M8.9502 12.4141L6.68164 14.6816L9 17H3V11L5.26758 13.2676L7.53516 11L8.9502 12.4141ZM17 17H11L13.292 14.707L11 12.4141L12.4141 11L14.707 13.292L17 11V17ZM6.70703 5.29199L8.9502 7.53516L7.53516 8.9502L5.29199 6.70703L3 9V3H9L6.70703 5.29199ZM17 9L14.6816 6.68164L12.4141 8.9502L11 7.53516L13.2676 5.26758L11 3H17V9Z" />
  ),
  cloudtrail: (
    <path d="M14 3C15.6569 3 17 4.34315 17 6C17 7.65685 15.6569 9 14 9C13.5159 9 13.0601 8.88235 12.6553 8.67871L8.67871 12.6553C8.88235 13.0601 9 13.5159 9 14C9 15.6569 7.65685 17 6 17C4.34315 17 3 15.6569 3 14C3 12.3431 4.34315 11 6 11C6.48361 11 6.93919 11.117 7.34375 11.3203L11.3203 7.34375C11.2646 7.23282 11.2157 7.11828 11.1738 7H8.82617C8.41406 8.16468 7.30585 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.30585 3 8.41406 3.83532 8.82617 5H11.1738C11.5859 3.83532 12.6941 3 14 3ZM14 11C15.6569 11 17 12.3431 17 14C17 15.6569 15.6569 17 14 17C12.3431 17 11 15.6569 11 14C11 12.3431 12.3431 11 14 11ZM6 13C5.44772 13 5 13.4477 5 14C5 14.5523 5.44772 15 6 15C6.55228 15 7 14.5523 7 14C7 13.4477 6.55228 13 6 13ZM14 13C13.4477 13 13 13.4477 13 14C13 14.5523 13.4477 15 14 15C14.5523 15 15 14.5523 15 14C15 13.4477 14.5523 13 14 13ZM6 5C5.44772 5 5 5.44772 5 6C5 6.55228 5.44772 7 6 7C6.55228 7 7 6.55228 7 6C7 5.44772 6.55228 5 6 5ZM14 5C13.4477 5 13 5.44772 13 6C13 6.55228 13.4477 7 14 7C14.5523 7 15 6.55228 15 6C15 5.44772 14.5523 5 14 5Z" />
  ),
  "online-contact": (
    <path d="M17 3C17.5523 3 18 3.44772 18 4V15C18 15.5523 17.5523 16 17 16H11V17H13C13.5523 17 14 17.4477 14 18H6C6 17.4477 6.44772 17 7 17H9V16H3C2.44772 16 2 15.5523 2 15V4C2 3.44772 2.44772 3 3 3H17ZM9 12V13C9 13.5523 9.44772 14 10 14C10.5523 14 11 13.5523 11 13H12C12.5523 13 13 12.5523 13 12H9ZM10 5C7.79086 5 6 6.79086 6 9V10C6 10.5523 6.44772 11 7 11H8V9H7C7 7.34315 8.34315 6 10 6C11.6569 6 13 7.34315 13 9H12V11H13C13.5523 11 14 10.5523 14 10V9C14 6.79086 12.2091 5 10 5Z" />
  ),
  setting: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 5L10.9998 6.12595C11.3669 6.22042 11.7136 6.36569 12.032 6.55383L12.8284 5.75736L14.2426 7.17157L13.4462 7.96801C13.6341 8.28611 13.7793 8.63249 13.8738 8.99924L15 9V11L13.874 10.9998C13.7796 11.3669 13.6343 11.7136 13.4462 12.032L14.2426 12.8284L12.8284 14.2426L12.032 13.4462C11.7136 13.6343 11.3669 13.7796 10.9998 13.874L11 15H9L8.99924 13.8738C8.63249 13.7793 8.28611 13.6341 7.96801 13.4462L7.17157 14.2426L5.75736 12.8284L6.55383 12.032C6.36569 11.7136 6.22042 11.3669 6.12595 10.9998L5 11V9L6.12621 8.99924C6.22069 8.63249 6.36587 8.28611 6.55383 7.96801L5.75736 7.17157L7.17157 5.75736L7.96801 6.55383C8.28611 6.36587 8.63249 6.22069 8.99924 6.12621L9 5H11ZM10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8Z"
    />
  ),
  "workplace-erp": (
    <path d="M8 16H9V6H11V16H12V8H14V16H15V10H17V16H18V17H2V16H3V8H5V16H6V3H8V16Z" />
  ),
  company: (
    <path d="M16 1C16.5523 1 17 1.44772 17 2V18L3 17.9844V2C3 1.44772 3.44772 1 4 1H16ZM6 15H8V12H6V15ZM9 15H11V12H9V15ZM12 15H14V12H12V15ZM6 11H8V8H6V11ZM9 11H11V8H9V11ZM12 11H14V8H12V11ZM6 7H8V4H6V7ZM9 7H11V4H9V7ZM12 7H14V4H12V7Z" />
  ),
  lock: (
    <>
      <circle cx={10} cy={10} r={8} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 6C11.6569 6 13 7.34315 13 9V12.5C13 12.7761 12.7761 13 12.5 13H7.5C7.22386 13 7 12.7761 7 12.5V9C7 7.34315 8.34315 6 10 6ZM10 7.5C9.17157 7.5 8.5 8.17157 8.5 9V10H11.5V9C11.5 8.17157 10.8284 7.5 10 7.5Z"
        style={{ fill: "var(--color-icon-on-white)" }}
      />
    </>
  ),
  "chevron-right": (
    <path d="M7.9375 6.52941L11.4072 9.99908L7.9375 13.4688L8.99816 14.5294L13.5285 9.99908L8.99816 5.46875L7.9375 6.52941Z" />
  ),
  "chevron-left": (
    <path d="M12.0625 6.53039L8.59283 10.0001L12.0625 13.4697L11.0018 14.5304L6.47151 10.0001L11.0018 5.46973L12.0625 6.53039Z" />
  ),
  "chevron-double-left": (
    <path d="M9.47168 10L14.002 14.5303L15.0625 13.4697L11.5928 10L15.0625 6.53027L14.002 5.46973L9.47168 10ZM4.47168 10L9.00195 14.5303L10.0625 13.4697L6.59277 10L10.0625 6.53027L9.00195 5.46973L4.47168 10Z" />
  ),
  "chevron-double-right": (
    <path d="M10.5283 10L5.99805 14.5303L4.9375 13.4697L8.40723 10L4.9375 6.53027L5.99805 5.46973L10.5283 10ZM15.5283 10L10.998 14.5303L9.9375 13.4697L13.4072 10L9.9375 6.53027L10.998 5.46973L15.5283 10Z" />
  ),
  "arrow-down": (
    <path fillRule="evenodd" clipRule="evenodd" d="M14 8L10 13L6 8L14 8Z" />
  ),
  "arrow-up": (
    <path fillRule="evenodd" clipRule="evenodd" d="M14 13L10 8L6 13H14Z" />
  ),
  // 원 채움 + 느낌표(!) evenodd 로 뚫린 알림 배지. 20×20 풀블리드(r=10) 원.
  notice: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM11.6667 5V11.6667H8.33333V5H11.6667ZM11.6667 15.8333V13.3333H8.33333V15.8333H11.6667Z"
    />
  ),
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  /** 렌더할 아이콘 이름. */
  name: IconName;
  /** 접근성 레이블. 지정 시 role="img"; 미지정 시 장식용으로 aria-hidden 처리. */
  title?: string;
  /** 아이콘 한 변 크기(px). 기본 20(= spacing 토큰 --spacing-20). size-* 유틸리티로도 재정의 가능. */
  size?: number;
}

export function Icon({ name, title, size = DEFAULT_ICON_SIZE, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      className={["inline-block shrink-0", className].filter(Boolean).join(" ")}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}
