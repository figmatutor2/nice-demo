# Component Map — Figma → 코드 매핑

Figma "NHN 실습 디자인시스템" 컴포넌트 → 코드 컴포넌트 매핑. 각 컴포넌트 파일 헤더 주석에
토큰 매핑이 상세히 있으며, 이 표는 이름·노드·위치의 인덱스다.

## `table` 섹션 (node 70-12832)

하위→상위 순서로 구현. Checkbox 는 범용 폼 원자로 최상위 독립, Th·Td·Table 은 `Table/` 폴더.

| Figma 이름 (node) | 코드 컴포넌트 | 파일 | 스토리 |
|---|---|---|---|
| Checkbox (100:5273) | `Checkbox` | `src/components/Checkbox/Checkbox.tsx` | `Checkbox.stories.tsx` |
| Grid/Th (100:5344) | `Th` | `src/components/Table/Th.tsx` | `Th.stories.tsx` |
| grid/Td (100:5347) | `Td` | `src/components/Table/Td.tsx` | `Td.stories.tsx` |
| Table (137:8059) | `Table` | `src/components/Table/Table.tsx` | `Table.stories.tsx` |

### 축 매핑 (Figma → 코드)

**Checkbox** — Figma 단일 `state` enum → 직교 props:

| Figma state | 코드 |
|---|---|
| default | (기본) |
| active | `checked` (네이티브) |
| danger | `danger` prop |
| disabled | 네이티브 `disabled` |

hover 상태는 디자인에 없음 → 미구현.

**Th** — `type`: checkbox · text. (Figma type3/type4=disabled 헤더 변형은 조립 테이블 미사용 → 미구현.)

**Td** — `type`: text · checkbox · button × `state`: default · disabled · selected.
- `selected` 는 행 단위 상태로 `Table` 이 소유(Uncontrolled + `defaultSelected`).
- `type=button` 셀은 기존 `Button`(size=sm·variant=tertiary)을 **재사용**하고 라벨/보더 색만
  토큰 유틸리티를 important(`!`)로 override(새 버튼 미생성). `buttonTone`(primary·info)으로
  시안의 보기(info 옅은 파랑)·수정(primary 진한 파랑) 열별 강조 구분.

**Table** — `columns[]` + `rows[]` 조립 API(제네릭/정렬/페이지네이션 없음). 행 선택 Uncontrolled.

### 재사용·토큰 결정

- **Button 재사용:** Td 버튼 셀은 `Button` 재사용(지오메트리 100% 일치, 색만 override).
- **danger 색:** Figma `Functional/Red/Red 3 #DA1E28` 는 팔레트에 없어 기존
  `border-caution`(red-700) 토큰으로 근사 매핑(신규 토큰 미추가).
- **격자선:** `border-collapse` + 셀 `border-bg-muted` 로 형성.
