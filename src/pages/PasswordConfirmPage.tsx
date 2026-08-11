/*
 * PasswordConfirmPage — 비밀번호 재확인 페이지 (조립본).
 * 화면: Figma "NHN 실습 디자인시스템" node 253-1973.
 * 동작: 기획문서 node 289-2654 Description.
 *   01 검증 : 비밀번호 불일치 시 입력 필드 caution 상태 + 오류 문구 노출.
 *   02 확인 : 성공 → onConfirmSuccess() (마이페이지 이동은 라우터 대신 콜백으로 열어둠),
 *             실패 → 페이지 유지 + caution 전환.
 *
 * 기존 컴포넌트/토큰을 "조합만" 한다 — 신규 시각 값 없이 prop과 토큰 유틸리티만 사용.
 * 구조(Figma):
 *   NhncloudGnb (h-72, w-full)
 *   ContentsArea (bg-bg-subtle, flex-1, 콘텐츠 수직·수평 중앙)
 *     Header : 제목(type-display) + 안내 문구 2줄, pb-40
 *     Form   : TextInput(비밀번호) + RoundButton "확인"(w-full), gap-32, 고정 폭 w-440
 *
 * 검증 규칙은 페이지가 소유하지 않는다 — verifyPassword(pw)=>boolean prop 으로 위임한다
 * (라우팅과 동일하게 호출부가 결정). 페이지에 비밀번호를 하드코딩하지 않는다.
 *
 * raw hex/px/rgb/arbitrary 미사용 — 모든 시각 값은 src/tokens 토큰 유틸리티만 참조.
 */

import { useState, type FormEvent } from "react";
import { NhncloudGnb } from "../components/NhncloudGnb/NhncloudGnb";
import { TextInput } from "../components/TextInput/TextInput";
import { RoundButton } from "../components/RoundButton/RoundButton";

/** 불일치 시 노출할 오류 문구(설계서: "오류 문구 노출"). */
const ERROR_MESSAGE = "비밀번호가 일치하지 않습니다.";

export interface PasswordConfirmPageProps {
  /** 비밀번호 검증. true=일치(성공). 페이지는 판정 로직을 소유하지 않고 호출부에 위임한다. */
  verifyPassword: (password: string) => boolean;
  /** 성공 시 호출(설계서 02: 마이페이지 이동). 라우터 대신 콜백으로 열어둔다. */
  onConfirmSuccess: () => void;
}

export function PasswordConfirmPage({
  verifyPassword,
  onConfirmSuccess,
}: PasswordConfirmPageProps) {
  const [password, setPassword] = useState("");
  const [caution, setCaution] = useState(false);

  // 확인 클릭(submit) 시에만 검증 — 성공: onConfirmSuccess, 실패: 페이지 유지 + caution.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (verifyPassword(password)) {
      onConfirmSuccess();
    } else {
      setCaution(true);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-fill-white">
      <NhncloudGnb />

      {/* 콘텐츠 영역 — 콘텐츠를 수직·수평 중앙 배치 */}
      <div className="flex flex-1 items-center justify-center bg-bg-subtle px-20 py-80">
        <div className="flex flex-col items-center">
          {/* Header — 제목 + 안내 문구 */}
          <div className="flex flex-col items-center gap-12 pb-40 text-center">
            <h1 className="type-display text-text-default">비밀번호 재확인</h1>
            <p className="type-body-large text-text-secondary opacity-80">
              안전한 이용을 위해 비밀번호를 한번 더 입력해주세요.
              <br />
              확인 후 마이페이지로 이동합니다.
            </p>
          </div>

          {/* Form — 비밀번호 입력 + 확인 버튼 */}
          <form
            className="flex w-440 max-w-440 flex-col gap-32"
            onSubmit={handleSubmit}
          >
            <TextInput
              type="password"
              placeholder="비밀번호"
              aria-label="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              caution={caution}
              message={ERROR_MESSAGE}
            />
            <RoundButton size="lg" type="submit" className="w-full">
              확인
            </RoundButton>
          </form>
        </div>
      </div>
    </div>
  );
}
