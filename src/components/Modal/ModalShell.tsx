/*
 * ModalShell — 범용 다이얼로그 셸(오버레이 + 카드 + 헤더 + 푸터 슬롯).
 * 특정 화면에 종속되지 않는 재사용 셸: 헤더(타이틀 + 닫기 X)와 푸터는 슬롯,
 * 본문은 children 으로 받는다. 라우팅/포커스트랩/애니메이션 등 동작은 구현하지 않는다
 * (버튼 동작은 상위 조립본이 콜백으로 주입).
 *
 * 슬롯 구성:
 *  - 오버레이: 화면 전체 딤(bg-static-black/60), 중앙 정렬.
 *  - 카드    : 고정 폭(className 으로 제어) · bg-bg-canvas · rounded-2 · shadow-modal.
 *  - 헤더    : 타이틀(type-heading-3) + 우상단 닫기(X).
 *  - 바디    : children.
 *  - 푸터    : footer 슬롯(ReactNode) — 보통 Button 조합.
 *
 * 토큰 매핑 (모든 시각 값 = src/tokens 유틸리티):
 *  오버레이 딤      → bg-static-black/60 (static-black 토큰 + 불투명도 모디파이어)
 *  오버레이 여백    → p-40
 *  카드 배경/라운드/그림자 → bg-bg-canvas · rounded-2 · shadow-modal
 *  헤더 패딩        → pt-30 px-30 pb-20
 *  타이틀           → type-heading-3 · text-text-default
 *  닫기 위치/크기    → absolute top-20 right-20 · size-20 · 아이콘색 text-icon-default
 *  바디 패딩        → px-30
 *  푸터 패딩/간격    → px-30 pt-30 pb-30 · justify-end gap-4
 *
 * raw hex/px/rgb/arbitrary 미사용.
 */

import { useId, type ReactNode } from "react";

/** 닫기(X) 아이콘 — Icon 세트에 close 글리프가 없어 기존 Modal과 동일하게 인라인 SVG. 20×20, currentColor 상속. */
function CloseIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.707 4.293L4.293 5.707L8.586 10L4.293 14.293L5.707 15.707L10 11.414L14.293 15.707L15.707 14.293L11.414 10L15.707 5.707L14.293 4.293L10 8.586L5.707 4.293Z"
      />
    </svg>
  );
}

export interface ModalShellProps {
  /** 다이얼로그 타이틀(헤더). */
  title: string;
  /** 푸터 슬롯 — 보통 Button 조합. 없으면 푸터 미렌더. */
  footer?: ReactNode;
  /** 닫기(X) 클릭 콜백. */
  onClose?: () => void;
  /** 카드에 덧붙이는 추가 토큰 클래스(폭 등, 예: w-440). */
  className?: string;
  /** 본문 슬롯. */
  children: ReactNode;
}

export function ModalShell({
  title,
  footer,
  onClose,
  className,
  children,
}: ModalShellProps) {
  const titleId = useId();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-static-black/60 p-40">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={[
          "relative flex max-w-full flex-col rounded-2 bg-bg-canvas shadow-modal",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* header */}
        <div className="flex items-start px-30 pb-20 pt-30">
          <h2 id={titleId} className="type-heading-3 text-text-default">
            {title}
          </h2>
        </div>

        {/* body */}
        <div className="px-30">{children}</div>

        {/* footer */}
        {footer != null && (
          <div className="flex items-center justify-end gap-4 px-30 pb-30 pt-30">
            {footer}
          </div>
        )}

        {/* closeButton */}
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-20 top-20 flex size-20 items-center justify-center text-icon-default"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
