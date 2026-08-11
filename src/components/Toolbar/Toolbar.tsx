/*
 * Toolbar — NHN 디자인시스템 ControlResource/Toolbar.
 * 출처: Figma "NHN 실습 디자인시스템" node 137-7370.
 *
 * 구성: [추가(primary) │ Divider │ 삭제(tertiary)] 버튼 그룹.
 *  - 버튼은 기존 <Button> 을 재사용한다(새 버튼 미생성).
 *    · 추가 = variant primary + leadingIcon plus
 *    · 삭제 = variant tertiary (Figma 기본 상태가 disabled — 선택 항목이 있을 때 활성)
 *  - 구분선은 기존 <Divider>(세로선) 를 재사용한다. Figma는 상하 scale/10 inset(py-10)이라
 *    scale/32 높이 행 안에서 짧은 선으로 보인다.
 *
 * 토큰 매핑: 간격 scale/10 → gap-10 / py-10, 높이 scale/32 → h-32.
 * 색·라운드·타이포 등 버튼 자체의 시각 값은 <Button>·<Divider> 토큰에 위임.
 * raw hex/px/rgb/arbitrary 미사용.
 */

import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";

export interface ToolbarProps {
  /** 추가 버튼 레이블. 기본 "추가". */
  addLabel?: string;
  /** 삭제 버튼 레이블. 기본 "삭제". */
  deleteLabel?: string;
  /** 추가 버튼 클릭 핸들러. */
  onAdd?: () => void;
  /** 삭제 버튼 클릭 핸들러. */
  onDelete?: () => void;
  /** 추가 버튼 비활성. 기본 false. */
  addDisabled?: boolean;
  /** 삭제 버튼 비활성. 기본 true(선택 항목이 있을 때 활성화). */
  deleteDisabled?: boolean;
  /** 기본 유틸리티에 덧붙이는 추가 Tailwind 토큰 클래스. */
  className?: string;
}

export function Toolbar({
  addLabel = "추가",
  deleteLabel = "삭제",
  onAdd,
  onDelete,
  addDisabled = false,
  deleteDisabled = true,
  className,
}: ToolbarProps) {
  return (
    <div
      className={["flex h-32 items-center gap-10", className]
        .filter(Boolean)
        .join(" ")}
      data-node-id="137:7370"
    >
      <Button
        variant="primary"
        size="md"
        leadingIcon="plus"
        onClick={onAdd}
        disabled={addDisabled}
      >
        {addLabel}
      </Button>
      <div className="flex h-full items-center py-10">
        <Divider />
      </div>
      <Button
        variant="tertiary"
        size="md"
        onClick={onDelete}
        disabled={deleteDisabled}
      >
        {deleteLabel}
      </Button>
    </div>
  );
}
