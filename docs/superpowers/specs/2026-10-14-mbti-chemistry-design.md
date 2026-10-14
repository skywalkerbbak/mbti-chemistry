# MBTI 궁합 웹 애플리케이션 상세 설계서 (Design Specification)

- **작성일**: 2026-10-14
- **상태**: 승인 완료 (Approved)
- **대상 프로젝트**: `mbti` (MBTI Chemistry Web App)

---

## 1. 개요 및 목적
두 사람의 MBTI와 관계 유형(연인 vs 친구/동료)을 선택하여 궁합 점수, 환상의 케미(장점), 갈등 유발 요인(주의점), 맞춤형 대화법 팁을 확인하고, 인스타그램 스토리/카드 규격의 고해상도 이미지 및 링크로 공유할 수 있는 반응형 프론트엔드 웹 애플리케이션을 구축한다.

---

## 2. 핵심 기능 요구사항

### 2.1 관계 모드 선택
- **연인 케미 모드 (`love`)**: 로맨틱한 관계 관점에서 감정 교류, 데이트 성향, 애정 표현 및 갈등 예방 팁 제공.
- **친구/동료 케미 모드 (`friend`)**: 협업, 팀워크, 일상적인 대화 스타일, 스트레스 상황 시 상호작용 팁 제공.

### 2.2 입력 인터페이스
- 16개 MBTI 타입 선택기 (E/I, N/S, T/F, P/J 그룹별 직관적 태그 및 배지 UI).
- 본인 및 상대방의 이름(또는 별칭) 선택 입력 기능.
- "내 MBTI 기준 최고/최악 궁합 바로보기" 퀵 버튼 제공.

### 2.3 궁합 분석 및 결과 리포트
- **궁합 지수 (0~100점)** 및 5단계 케미 등급:
  - Level 5 (90~100점): 천생연분 (Perfect Harmony)
  - Level 4 (75~89점): 찰떡 콤비 (Great Synergy)
  - Level 3 (60~74점): 상호 보완 (Balanced Dynamic)
  - Level 2 (40~59점): 알쏭달쏭 탐색 (Curious Difference)
  - Level 1 (0~39점): 극과 극 케미 (Challenging Match)
- **관계 한 줄 정의 타이틀** (예: "서로에게 없는 조각을 채워주는 퍼즐 같은 사이").
- **3대 분석 카드**:
  1. 🌟 **환상의 시너지 (Best Points)**: 함께 있을 때 극대화되는 장점.
  2. ⚡ **주의할 갈등 포인트 (Caution Points)**: 가치관/소통 방식 차이로 생기는 오해.
  3. 💡 **특급 관계 솔루션 (Actionable Tips)**: 오해를 줄이고 관계를 돈독하게 만드는 소통 처방.

### 2.4 공유 및 저장 기능
- **스토리 카드 이미지 다운로드**: `html-to-image`를 활용하여 모바일 화면 규격(1080x1920 또는 깔끔한 정방형/세로형 카드)의 PNG 이미지 저장.
- **URL 파라미터 링크 복사**: 쿼리스트링(`?m1=INFP&m2=ENFJ&mode=love`)을 통해 접속자가 동일한 결과를 즉시 확인 가능.
- **다시하기 / 다른 조합 테스트**: 원클릭으로 초기화 및 새 조합 탐색.

---

## 3. 시스템 아키텍처 및 기술 스택

### 3.1 기술 스택
- **런타임 & 프레임워크**: React 18+, TypeScript, Vite
- **스타일링**: Tailwind CSS, Lucide React (아이콘)
- **이미지 생성**: `html-to-image`
- **테스트 도구**: Vitest, React Testing Library
- **상태 관리**: React Local State (`useState`, `useMemo`, `useSearchParams`)

### 3.2 디렉터리 구조
```text
mbti/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── src/
│   ├── assets/                # 에셋 및 기본 일러스트/아이콘
│   ├── components/
│   │   ├── Header.tsx         # 헤더 및 브랜드 로고
│   │   ├── MatchSelector.tsx   # 본인/상대방 MBTI 및 모드 선택기
│   │   ├── QuickBestWorst.tsx # 특정 MBTI의 최고/최악 궁합 요약 팝업/탭
│   │   ├── ReportCard.tsx     # 메인 결과 시각화 리포트 카드 (캡처 대상)
│   │   ├── ShareActions.tsx   # 이미지 저장, 링크 복사, 재시작 액션 버튼군
│   │   └── Toast.tsx          # 링크 복사 알림 등 토스트 메시지
│   ├── data/
│   │   ├── mbtiTypes.ts       # 16개 MBTI 기본 정보, 별칭, 색상, 키워드
│   │   └── chemistryMatrix.ts # 16x16 점수 매트릭스 및 관계별 상세 코멘트 데이터
│   ├── utils/
│   │   ├── chemistryCalculator.ts # 궁합 계산, 랭킹 추출, 레벨 판별 함수
│   │   └── imageExporter.ts       # html-to-image 기반 캡처 및 다운로드 처리
│   ├── App.tsx
│   └── main.tsx
└── tests/
    └── chemistryCalculator.test.ts # 256개 전 조합 무결성 및 계산 로직 단위 테스트
```

---

## 4. 데이터 모델 및 계산 엔진

### 4.1 MBTI 메타데이터 구조 (`mbtiTypes.ts`)
```typescript
export interface MBTITypeInfo {
  code: string; // 예: "INFP"
  nickname: string; // 예: "열정적인 중재자"
  keywords: string[]; // 예: ["이상주의", "공감", "따뜻함"]
  badgeColor: string; // 뱃지 색상 테마
}
```

### 4.2 케미스트리 데이터 구조 (`chemistryMatrix.ts`)
```typescript
export interface ChemistryDetail {
  score: number; // 0 ~ 100
  level: 1 | 2 | 3 | 4 | 5;
  title: string; // "영혼의 단짝", "서로의 거울" 등
  synergy: string[]; // 잘 맞는 점 2~3가지
  caution: string[]; // 부딪힐 수 있는 점 2가지
  loveTip?: string; // 연인 모드 조언
  friendTip?: string; // 친구/동료 모드 조언
}
```

### 4.3 계산 로직 (`chemistryCalculator.ts`)
- 16x16 조합에 대해 정의된 데이터를 조회하되, 역방향(A x B vs B x A)에 대해 일관된 점수 및 대칭성을 보장한다.
- 동일 MBTI 조합(INFP x INFP 등)에 대한 독자적이고 유쾌한 '도플갱어 케미' 코멘트를 제공한다.

---

## 5. 예외 처리 및 엣지 케이스

1. **미선택 상태 검증**: MBTI 2개가 모두 선택되지 않았을 경우 분석 트리거 버튼을 비활성화하고 가이드 툴팁 노출.
2. **잘못된 URL 파라미터**: 유효하지 않은 MBTI 코드 입력 시 기본값(`INFP`, `ENFJ`)으로 정규화하여 렌더링.
3. **이미지 다운로드 실패 대응**: 인앱 브라우저 등에서 Blob 저장 실패 시 대체 안내 모달 노출.

---

## 6. 검증 계획 (Verification)
- **단위 테스트**: `vitest`를 통해 16x16 (총 256개) 궁합 점수 및 데이터의 무결성(누락값 없음, 점수 범위 0~100) 자동 검증.
- **UI 반응형 및 인터랙션 검증**: 모바일(375px) ~ 데스크톱 화면에서 레이아웃 반응형 확인, 이미지 다운로드 생성물 육안 검증.
