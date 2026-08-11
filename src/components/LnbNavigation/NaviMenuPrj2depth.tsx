import { Icon } from "../icons/Icon";

/*
 * NaviMenuPrj2depth — LNB Prj 영역 2depth 트리 항목("Auto Scale").
 * 출처: Figma node 101:5271(default) / 101:5270(active) / 101:5272(hover).
 *
 * 역할: 프로젝트(1depth) 하위 리소스 항목. Org 목록(NaviMenuOrgList)과 구분되는 트리 노드다.
 *
 * 상태 처리(지시): default/active는 prop(active), hover는 CSS :hover.
 *  - default : bg fill/subtle, 아이콘·텍스트 default 색(검정)
 *  - active  : bg fill/subtle 유지, 아이콘·텍스트 primary(파랑)  ← "선택됨"
 *  - hover   : bg interactive/light, 아이콘·텍스트 primary(파랑)
 *  아이콘은 currentColor라 래퍼 텍스트색만 바꾸면 아이콘까지 함께 물든다.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  - 배경 fill/subtle → bg-fill-subtle, hover interactive/light → hover:bg-interactive-light
 *  - 텍스트·아이콘 text/primary·icon/accent → text-text-primary (active/hover)
 *  - 아이콘 compute-instance, 타이포 Body 13 R → type-caption-base(13/20)
 *  - 후행 여백 scale/30 → pr-30, 들여쓰기 Figma 52 → pl-50(근사, 토큰 순도 우선)
 *  - 아이콘-라벨 간격 15 → gap-15, 행 높이 42 = py-11 + line-height 20
 * raw px/hex/arbitrary 미사용.
 */
type NaviMenuPrj2depthProps = {
  /** 항목 라벨. */
  label: string;
  /** 선택(active) 상태 — 파란색 강조. */
  active?: boolean;
  /** 클릭 핸들러. */
  onClick?: () => void;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
};

export function NaviMenuPrj2depth({ label, active = false, onClick, className }: NaviMenuPrj2depthProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active || undefined}
      className={[
        "flex w-full items-center gap-15 bg-fill-subtle py-11 pl-50 pr-30 text-left",
        "hover:bg-interactive-light hover:text-text-primary",
        active ? "text-text-primary" : "text-text-default",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-node-id="101:5271"
    >
      <Icon name="compute-instance" />
      <span className="type-caption-base flex-1 truncate">{label}</span>
    </button>
  );
}
