import { Icon, type IconName } from "../icons/Icon";

/*
 * Tab — Topbar 서비스 탭. 3가지 type 변형을 가진다.
 * 출처: Figma "NHN 실습 디자인시스템" node 134-5074 (ResourceTopbar/tab).
 *
 * 변형 처리(요구사항):
 *  - type(lg/md/sm) = variant prop (구조·아이콘이 type마다 다름)
 *  - state(hover)   = prop이 아니라 CSS :hover (텍스트/아이콘색 → primary). 스토리에서 상태별 표시.
 *
 * 구조 (Figma 기준):
 *  - lg: leftIcon + label(신축) + [setting + arrow-down]  (드롭다운형)
 *  - md: leftIcon + label
 *  - sm: 알약 칩(fill/muted) 안에 label + lock
 *
 * 토큰 매핑:
 *  - 배경 bg/subtle → `bg-bg-subtle`, 칩 배경 fill/muted → `bg-fill-muted`
 *  - 기본 텍스트/아이콘 text·icon/default → `text-text-default`(아이콘은 currentColor 상속)
 *  - hover text/primary·icon/accent → `hover:text-text-primary`
 *  - 높이 → `h-60`, 내부 여백 scale/20 → `px-20`, 간격 scale/8 → `gap-8`, scale/1 → `gap-1`
 *  - 칩: 라운드 radius/18 → `rounded-18`, 높이 scale/32 → `h-32`, 여백 scale/10·6 → `pl-10 pr-6`
 *  - 라벨 size/14 → `type-body-small`, 칩 라벨 size/13 → `type-caption-base`
 *
 * 폭(Figma 270/130/100)은 spacing 토큰이 없어 고정하지 않고 내용 크기(hug)로 둔다.
 * (Topbar 안에서 반응형으로 신축; raw px/arbitrary 폭 금지.)
 */
export type TabType = "lg" | "md" | "sm";

type TabProps = {
  /** 탭 크기·구조 변형. */
  type?: TabType;
  /** 탭 라벨 텍스트. */
  label: string;
  /** 선두 아이콘(lg·md). 미지정 시 type 기본값(lg=company, md=setting). sm은 무시. */
  icon?: IconName;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
};

const ROOT =
  "flex h-60 shrink-0 items-center bg-bg-subtle px-20 text-text-default transition-colors hover:text-text-primary";

export function Tab({ type = "lg", label, icon, className }: TabProps) {
  const root = [ROOT, className].filter(Boolean).join(" ");

  if (type === "sm") {
    return (
      <button type="button" className={root} data-node-id="135:5865">
        <span className="flex h-32 items-center gap-8 rounded-18 bg-fill-muted pl-10 pr-6">
          <span className="type-caption-base">{label}</span>
          <Icon name="lock" />
        </span>
      </button>
    );
  }

  if (type === "md") {
    return (
      <button type="button" className={`${root} gap-8`} data-node-id="134:5072">
        <Icon name={icon ?? "setting"} />
        <span className="type-body-small whitespace-nowrap">{label}</span>
      </button>
    );
  }

  // type === "lg"
  return (
    <button type="button" className={`${root} gap-8`} data-node-id="134:5073">
      <Icon name={icon ?? "company"} />
      <span className="type-body-small">{label}</span>
      <span className="flex items-center gap-1">
        <Icon name="setting" />
        <Icon name="arrow-down" />
      </span>
    </button>
  );
}
