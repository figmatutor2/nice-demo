/*
 * tokenViz.ts — 디자인 토큰 시각화용 런타임 리더.
 * 원칙: 토큰 "값"을 소스에 하드코딩하지 않는다. 토큰 이름/유틸 클래스만 코드로 다루고,
 * 실제 값은 브라우저의 getComputedStyle로 런타임에 읽는다. (hex/px 리터럴 없음)
 */

/** :root 에 선언된 커스텀 프로퍼티의 계산값을 이름으로 읽는다. */
export function readVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * 브라우저가 계산한 색상 문자열(rgb/rgba 형태)을 hex 문자열로 변환한다.
 * 값은 전부 런타임 입력에서 파생 — 소스에 색 리터럴이 없다.
 */
export function toHex(color: string): string {
  const parts = color.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return color;
  const nums = parts.map(Number);
  const h = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  let out = "#" + h(nums[0]) + h(nums[1]) + h(nums[2]);
  if (nums.length >= 4 && nums[3] < 1) out += h(nums[3] * 255);
  return out.toUpperCase();
}

/** 실제 DOM 요소의 계산된 스타일 한 속성을 읽는다. */
export function readComputed(el: Element, prop: string): string {
  return getComputedStyle(el).getPropertyValue(prop).trim();
}

export interface TypeMetrics {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  fontFamily: string;
}

/** type-* @utility 클래스를 프로브에 적용해 실제 타이포 메트릭을 읽는다. */
export function readTypography(utilityClass: string): TypeMetrics {
  const probe = document.createElement("span");
  probe.className = utilityClass;
  probe.textContent = "Ag";
  probe.style.position = "absolute";
  probe.style.opacity = "0";
  probe.style.pointerEvents = "none";
  document.body.appendChild(probe);
  const cs = getComputedStyle(probe);
  const metrics: TypeMetrics = {
    fontSize: cs.fontSize,
    lineHeight: cs.lineHeight,
    fontWeight: cs.fontWeight,
    fontFamily: cs.fontFamily,
  };
  probe.remove();
  return metrics;
}

/** 로드된 모든 스타일시트에서 접두사로 시작하는 커스텀 프로퍼티 이름을 수집한다. */
export function discoverVars(prefix: string): string[] {
  const found = new Set<string>();
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin 시트는 건너뜀
    }
    for (const rule of Array.from(rules)) {
      const style = (rule as CSSStyleRule).style;
      if (!style) continue;
      for (let i = 0; i < style.length; i++) {
        const prop = style[i];
        if (prop.startsWith(prefix)) found.add(prop);
      }
    }
  }
  return Array.from(found).sort();
}
