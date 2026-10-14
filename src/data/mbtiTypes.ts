export type MBTICode =
  | 'ISTJ'
  | 'ISFJ'
  | 'INFJ'
  | 'INTJ'
  | 'ISTP'
  | 'ISFP'
  | 'INFP'
  | 'INTP'
  | 'ESTP'
  | 'ESFP'
  | 'ENFP'
  | 'ENTP'
  | 'ESTJ'
  | 'ESFJ'
  | 'ENFJ'
  | 'ENTJ';

export interface MBTITypeInfo {
  code: MBTICode;
  name: string;
  nickname: string;
  shortDesc: string;
  keywords: string[];
  color: string;
  badgeColor: string;
}

export const ALL_MBTI_CODES: MBTICode[] = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
];

export const MBTI_TYPES: Record<MBTICode, MBTITypeInfo> = {
  // NF Group (Green / Teal / Emerald)
  INFP: {
    code: 'INFP',
    name: '열정적인 중재자',
    nickname: '열정적인 중재자',
    shortDesc: '상냥하고 따뜻하며 높은 이상과 깊은 감수성을 지닌 낭만가',
    keywords: ['이상주의', '깊은 공감', '따뜻한 감성', '진정성'],
    color: 'from-emerald-400 to-teal-500',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  ENFP: {
    code: 'ENFP',
    name: '재기발랄한 활동가',
    nickname: '재기발랄한 활동가',
    shortDesc: '언제나 긍정 에너지와 무한한 상상력으로 활기를 불어넣는 스파크형',
    keywords: ['열정 폭발', '창의적 발상', '친화력 끝판왕', '긍정 에너지'],
    color: 'from-green-400 to-emerald-500',
    badgeColor: 'bg-green-100 text-green-800 border-green-300',
  },
  INFJ: {
    code: 'INFJ',
    name: '선의의 옹호자',
    nickname: '선의의 옹호자',
    shortDesc: '사람의 본질을 꿰뚫는 통찰력과 조용한 신념을 품은 이상주의자',
    keywords: ['깊은 통찰력', '따뜻한 조언가', '신비주의', '확고한 가치관'],
    color: 'from-teal-400 to-cyan-500',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
  },
  ENFJ: {
    code: 'ENFJ',
    name: '정의로운 주인공',
    nickname: '정의로운 주인공',
    shortDesc: '타인의 성장을 돕고 온 마음으로 응원하는 카리스마 리더',
    keywords: ['배려의 달인', '선한 영향력', '공감 리더십', '사람 중심'],
    color: 'from-emerald-500 to-green-600',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },

  // NT Group (Purple / Indigo / Violet)
  INTJ: {
    code: 'INTJ',
    name: '용의주도한 전략가',
    nickname: '용의주도한 전략가',
    shortDesc: '전체 그림을 설계하고 치밀하게 목표를 실행하는 전략적 마인드',
    keywords: ['치밀한 전략', '높은 독립심', '논리적 분석', '목표 지향'],
    color: 'from-purple-500 to-indigo-600',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  INTP: {
    code: 'INTP',
    name: '논리적인 사색가',
    nickname: '논리적인 사색가',
    shortDesc: '지적 호기심과 독창적인 분석력으로 본질을 파고드는 아이디어 뱅크',
    keywords: ['지적 탐구', '객관적 분석', '창의적 발상', '솔직 담백'],
    color: 'from-indigo-400 to-violet-500',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  },
  ENTJ: {
    code: 'ENTJ',
    name: '대담한 통솔자',
    nickname: '대담한 통솔자',
    shortDesc: '명확한 비전과 강력한 결단력으로 목표를 향해 이끄는 타고난 리더',
    keywords: ['추진력 최고', '체계적 해결', '비전 제시', '당당한 매력'],
    color: 'from-violet-500 to-purple-600',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-300',
  },
  ENTP: {
    code: 'ENTP',
    name: '뜨거운 논쟁을 즐기는 변론가',
    nickname: '뜨거운 논쟁을 즐기는 변론가',
    shortDesc: '틀을 깨는 재치 있는 통찰과 끝없는 지적 유희를 즐기는 발명가',
    keywords: ['기발한 재치', '두뇌 회전력', '도전 정신', '솔직한 화법'],
    color: 'from-purple-400 to-pink-500',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },

  // SJ Group (Blue / Sky / Cyan)
  ISTJ: {
    code: 'ISTJ',
    name: '청렴결백한 논리주의자',
    nickname: '청렴결백한 논리주의자',
    shortDesc: '원칙과 신뢰를 목숨처럼 여기며 묵묵히 제 몫을 해내는 현실주의자',
    keywords: ['확실한 신뢰', '책임감의 화신', '체계적 정리', '묵직한 지지'],
    color: 'from-blue-500 to-sky-600',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  ISFJ: {
    code: 'ISFJ',
    name: '용감한 수호자',
    nickname: '용감한 수호자',
    shortDesc: '조용하지만 헌신적인 태도로 주변 사람들을 세심하게 챙기는 수호천사',
    keywords: ['세심한 배려', '기억력 천재', '묵묵한 헌신', '안정감'],
    color: 'from-sky-400 to-blue-500',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
  },
  ESTJ: {
    code: 'ESTJ',
    name: '엄격한 관리자',
    nickname: '엄격한 관리자',
    shortDesc: '규칙과 질서를 바로 세우고 탁월한 실행력으로 실질적 결과를 내는 경영자',
    keywords: ['압도적 실행력', '신속한 판단', '책임과 질서', '믿음직한 보호자'],
    color: 'from-blue-600 to-indigo-700',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  ESFJ: {
    code: 'ESFJ',
    name: '사교적인 외교관',
    nickname: '사교적인 외교관',
    shortDesc: '따스한 미소와 친화력으로 분위기를 이끌고 화합을 이루는 분위기 메이커',
    keywords: ['친절한 온기', '센스 만점', '공동체 화합', '다정한 소통'],
    color: 'from-sky-500 to-cyan-600',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
  },

  // SP Group (Amber / Orange / Yellow)
  ISTP: {
    code: 'ISTP',
    name: '만능 재주꾼',
    nickname: '만능 재주꾼',
    shortDesc: '상황을 쿨하게 관찰하며 필요할 때 즉각 문제를 해결하는 실전형 장인',
    keywords: ['쿨한 매력', '순발력 끝판왕', '손재주 장인', '자유로운 영혼'],
    color: 'from-amber-400 to-orange-500',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  ISFP: {
    code: 'ISFP',
    name: '호기심 많은 예술가',
    nickname: '호기심 많은 예술가',
    shortDesc: '자신만의 감각적인 라이프스타일을 사랑하고 현재를 음미하는 평화주의자',
    keywords: ['남다른 미적 감각', '순수한 온화함', '유연한 태도', '힐링 에너지'],
    color: 'from-amber-300 to-yellow-500',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  ESTP: {
    code: 'ESTP',
    name: '모험을 즐기는 사업가',
    nickname: '모험을 즐기는 사업가',
    shortDesc: '짜릿한 스릴과 도전을 두려워하지 않으며 몸으로 부딪쳐 기회를 잡는 활동가',
    keywords: ['넘치는 활력', '재치 있는 유머', '빠른 적응력', '스릴과 모험'],
    color: 'from-orange-400 to-amber-500',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
  },
  ESFP: {
    code: 'ESFP',
    name: '자유로운 영혼의 연예인',
    nickname: '자유로운 영혼의 연예인',
    shortDesc: '어디서나 스포트라이트를 몰고 다니며 순간의 행복을 극대화하는 파티스타',
    keywords: ['매력적인 위트', '사교성 만렙', '현재에 집중', '행복 바이러스'],
    color: 'from-orange-300 to-pink-500',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
  },
};
