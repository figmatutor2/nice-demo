// App shell — 콘솔 페이지와 비밀번호 재확인 페이지를 상태 전환으로 렌더한다(라우터 미사용).
// 노출 조건(기획문서 node 289-2654): 콘솔 계정 드롭다운 > [회원 정보] 선택 시 재확인 페이지로 전환.
// 모든 시각 값은 NHN 디자인 토큰(src/tokens/)에서 온다.
import { useState } from "react";
import { ConsolePage } from "./pages/ConsolePage";
import { PasswordConfirmPage } from "./pages/PasswordConfirmPage";

type View = "console" | "passwordConfirm";

export default function App() {
  const [view, setView] = useState<View>("console");

  if (view === "passwordConfirm") {
    return (
      <PasswordConfirmPage
        // 데모 판정 글루(라우터 콜백과 동일하게 호출부가 검증을 소유). 실서비스에선 서버 검증으로 교체.
        verifyPassword={(pw) => pw === "nhncloud"}
        // 마이페이지 이동은 라우터 대신 콜백으로 열어둠 — 데모에선 콘솔로 복귀.
        onConfirmSuccess={() => {
          console.log("[PasswordConfirm] 재인증 성공 → 마이페이지 이동");
          setView("console");
        }}
      />
    );
  }

  return (
    <ConsolePage
      onAccountMenuSelect={(label) => {
        if (label === "회원 정보") setView("passwordConfirm");
      }}
    />
  );
}
