import { Icon, type IconName } from "../icons/Icon";

/*
 * NaviMenuOrgList — LNB Org 영역 서비스 항목(선두 아이콘 + 라벨 + 외부링크 아이콘).
 * 출처: Figma "NHN 실습 디자인시스템" node 100:6072 (NaviMenu/Org/List).
 *
 * 역할: 조직/서비스 목록(외부 서비스로 이동)이라 Prj 트리(1depth/2depth, 펼침·선택)와 구분된다.
 * 외부 이동을 뜻하는 후행 아이콘(color-default = open-in-new) 때문에 <a> 링크로 렌더한다.
 *
 * 토큰 매핑 (Figma 변수 → 프로젝트 토큰):
 *  - 배경 fill/white → bg-fill-white
 *  - 라벨 text/default → text-text-default, 타이포 Body 13 R(size13 · lh16) → type-caption-base(13/20)
 *  - 선두 아이콘 icon/default → text-icon-default
 *  - 후행 외부링크 아이콘 icon/subtle → text-icon-subtle
 *  - 좌우 여백 scale/30·20 → pl-30 pr-20, 아이콘-라벨 간격 15 → gap-15
 *  - 행 높이 42 = py-11 + line-height 20 (type-caption-base)
 * Figma의 절대좌표(left-30/65, right-20)는 flex + 토큰 간격으로 재구성(반응형·토큰 순도). raw px/hex/arbitrary 미사용.
 */
type NaviMenuOrgListProps = {
  /** 선두 서비스 아이콘. */
  icon: IconName;
  /** 항목 라벨. */
  label: string;
  /** 외부 서비스 이동 경로. */
  href?: string;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
};

export function NaviMenuOrgList({ icon, label, href, className }: NaviMenuOrgListProps) {
  return (
    <a
      href={href}
      className={["flex w-full items-center gap-15 bg-fill-white py-11 pl-30 pr-20 text-text-default", className]
        .filter(Boolean)
        .join(" ")}
      data-node-id="100:6072"
    >
      <span className="text-icon-default">
        <Icon name={icon} />
      </span>
      <span className="type-caption-base flex-1 truncate">{label}</span>
      <span className="text-icon-subtle">
        <Icon name="color-default" title="외부 링크로 이동" />
      </span>
    </a>
  );
}
