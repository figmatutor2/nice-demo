/*
 * Modal — NHN 디자인시스템 다이얼로그(조립본): "Server Security Check".
 * 출처: Figma "NHN 실습 디자인시스템" node 329-1587 (Modal/Server Security Check, 700w · 래퍼 section 326:1638 "modal" 내부).
 *
 * 파츠 조립: 헤더(타이틀 + 닫기) · 바디(스텝 인디케이터 + 안내 목록 + 결제수단 추가 영역) · 푸터(취소/다음).
 * 재사용: 스텝 사이 연결선은 Divider(원자 컴포넌트), 푸터 버튼은 Button(secondary/primary, lg),
 *        결제수단 추가 버튼의 + 아이콘은 Icon("plus")를 그대로 사용한다.
 *
 * API: title·steps·activeStep·sectionTitle·notices·cancelLabel·confirmLabel(내용 슬롯, 기본값=시안 내용)
 *      + onClose·onCancel·onConfirm·onAddCard(콜백). 라우팅/상태 전환은 구현하지 않는다.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  다이얼로그 폭 700         → w-700 (--spacing-700, raw 프레임 폭 승격 · 다이얼로그 고정 폭)
 *  배경 bg/canvas           → bg-bg-canvas
 *  그림자 drop-shadow        → shadow-modal (--shadow-modal, Modal effect 스펙)
 *  라운드 radius/2           → rounded-2
 *  헤더 패딩 45·40·30        → pt-45 pl-40 pb-30
 *  타이틀 Heading3 19 Bold   → type-heading-3 · text/default → text-text-default
 *  닫기 버튼 위치 20/20       → absolute top-20 right-20, size 20 → size-20, 아이콘색 text/default → text-icon-default
 *  바디 좌우 패딩 40         → px-40
 *  스텝 영역 하단 보더        → border-b border/subtle → border-border-subtle, pt-32 pb-25
 *  스텝 컬럼 폭 98           → w-98 (--spacing-98)
 *  스텝 연결선 폭 90         → w-90 (--spacing-90), 색 bg/muted → Divider 기본색
 *  스텝 뱃지 46·pill         → size-46 rounded-30, 활성 interactive/primary → bg-interactive-primary + text/white → text-static-white,
 *                             비활성 border/subtle → bg-border-subtle + text/default → text-text-default
 *  스텝 뱃지 숫자 Heading4 18 → type-heading-4
 *  스텝 라벨 Caption 13      → type-caption-base · text/default
 *  섹션 타이틀 Body 15 Medium → type-body-base · text/default
 *  안내 아이콘 13·status/critical → size-13 · text-status-critical
 *  안내 텍스트 Caption 13    → type-caption-base · text/secondary → text-text-secondary
 *  결제수단 영역 보더/패딩     → border border/subtle → border-border-subtle, py-33
 *  추가 버튼 40·pill·bg/subtle → h-40 rounded-30 bg-bg-subtle px-10 py-9, + 아이콘색 icon/tertiary → text-icon-tertiary
 *  푸터 패딩 40·30/간격 4     → px-40 py-30 gap-4, 버튼은 Button(size lg: 취소=secondary, 다음=primary)
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import { useId } from "react";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import { Icon } from "../icons/Icon";

/** 닫기(X) 아이콘 — Figma ic/delete(node 256:2770, 20×20). currentColor 상속. */
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

/** 안내(느낌표 원형) 아이콘 — Figma ic/noticeIcon(node 326:1984, 13×13). currentColor 상속. */
function NoticeIcon() {
  return (
    <svg
      viewBox="0 0 13 13"
      fill="currentColor"
      className="size-13 shrink-0 text-status-critical"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5ZM7.58333 3.25V7.58333H5.41667V3.25H7.58333ZM7.58333 10.2917V8.66667H5.41667V10.2917H7.58333Z"
      />
    </svg>
  );
}

/** 스텝 인디케이터 한 컬럼(번호 뱃지 + 라벨). */
function StepColumn({
  index,
  label,
  active,
}: {
  index: number;
  label: string;
  active: boolean;
}) {
  return (
    <div className="flex w-98 flex-col items-center gap-10">
      <div
        className={[
          "flex size-46 items-center justify-center rounded-30",
          active
            ? "bg-interactive-primary text-static-white"
            : "bg-border-subtle text-text-default",
        ].join(" ")}
      >
        <span className="type-heading-4">{index}</span>
      </div>
      <span className="type-caption-base w-full text-center text-text-default">
        {label}
      </span>
    </div>
  );
}

/** 시안(node 329-1587)의 기본 안내 문구 4개. */
export const DEFAULT_MODAL_NOTICES: string[] = [
  '팝업이 차단된 경우, "팝업을 항상 허용" 옵션을 열어주신 후 결제 수단 추가/변경을 부탁드립니다.',
  "팝업이 차단된 결제 수단은 NHN Cloud 서비스를 이용하기 위해 반드시 등록해야 합니다.",
  "결제 수단은 NHN Cloud 서비스를 이용하기 위해 반드시 등록해야 합니다.",
  "동일한 결제 수단은 최대 3개의 계정에 등록할 수 있습니다.",
];

/** 시안(node 329-1587)의 기본 스텝 라벨. */
export const DEFAULT_MODAL_STEPS: string[] = ["결제 수단 등록", "조직/프로젝트 확인"];

export interface ModalProps {
  /** 다이얼로그 타이틀. 기본 "Server Security Check". */
  title?: string;
  /** 스텝 라벨 목록. 기본 시안 2스텝. */
  steps?: string[];
  /** 현재 활성 스텝(0-based). 기본 0. */
  activeStep?: number;
  /** 본문 섹션 타이틀. 기본 "결제 수단". */
  sectionTitle?: string;
  /** 안내 문구 목록. 기본 시안 4개. */
  notices?: string[];
  /** 취소 버튼 라벨. 기본 "취소". */
  cancelLabel?: string;
  /** 확인(다음) 버튼 라벨. 기본 "다음". */
  confirmLabel?: string;
  /** 닫기(X) 클릭 콜백. */
  onClose?: () => void;
  /** 취소 버튼 클릭 콜백. */
  onCancel?: () => void;
  /** 확인(다음) 버튼 클릭 콜백. */
  onConfirm?: () => void;
  /** 결제 수단 추가(+) 버튼 클릭 콜백. */
  onAddCard?: () => void;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
}

export function Modal({
  title = "Server Security Check",
  steps = DEFAULT_MODAL_STEPS,
  activeStep = 0,
  sectionTitle = "결제 수단",
  notices = DEFAULT_MODAL_NOTICES,
  cancelLabel = "취소",
  confirmLabel = "다음",
  onClose,
  onCancel,
  onConfirm,
  onAddCard,
  className,
}: ModalProps) {
  const titleId = useId();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={[
        "relative flex w-700 max-w-full flex-col rounded-2 bg-bg-canvas shadow-modal",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-node-id="329:1587"
    >
      {/* header */}
      <div className="flex items-center pb-30 pl-40 pt-45">
        <h2 id={titleId} className="type-heading-3 text-text-default">
          {title}
        </h2>
      </div>

      {/* body */}
      <div className="w-full px-40">
        {/* stepIndicator */}
        <div className="flex justify-center border-b border-solid border-border-subtle pb-25 pt-32">
          <div className="flex items-center justify-center">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center">
                {i > 0 && (
                  <div className="w-90">
                    <Divider orientation="horizontal" />
                  </div>
                )}
                <StepColumn index={i + 1} label={label} active={i === activeStep} />
              </div>
            ))}
          </div>
        </div>

        {/* paymentSection */}
        <div className="flex w-full flex-col gap-5 pb-10 pt-24">
          <p className="type-body-base text-text-default">{sectionTitle}</p>

          {/* noticeList */}
          <div className="flex flex-col">
            {notices.map((notice) => (
              <div
                key={notice}
                className="flex min-h-32 items-center gap-5"
              >
                <NoticeIcon />
                <p className="type-caption-base text-text-secondary">{notice}</p>
              </div>
            ))}
          </div>

          {/* cardPlaceholder */}
          <div className="flex items-center justify-center border border-solid border-border-subtle py-33">
            <button
              type="button"
              onClick={onAddCard}
              aria-label="결제 수단 추가"
              className="flex h-40 items-center justify-center rounded-30 bg-bg-subtle px-10 py-9"
            >
              <Icon name="plus" className="text-icon-tertiary" />
            </button>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-end gap-4 px-40 py-30">
        <Button variant="secondary" size="lg" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="primary" size="lg" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>

      {/* closeButton */}
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="absolute right-20 top-20 flex size-20 items-center justify-center text-icon-default"
        data-node-id="326:2015"
      >
        <CloseIcon />
      </button>
    </div>
  );
}
