import { MBTICode, MBTI_TYPES } from './mbtiTypes';

export interface ChemistryDetail {
  score: number;
  level: 1 | 2 | 3 | 4 | 5;
  levelName: string;
  title: string;
  synergy: string[];
  caution: string[];
  loveTip: string;
  friendTip: string;
}

// 16x16 Base Score Matrix (strictly symmetric)
export const RAW_SCORE_MATRIX: Record<MBTICode, Record<MBTICode, number>> = {
  ISTJ: {
    ISTJ: 85, ISFJ: 88, INFJ: 35, INTJ: 68,
    ISTP: 79, ISFP: 65, INFP: 32, INTP: 58,
    ESTP: 93, ESFP: 96, ENFP: 28, ENTP: 45,
    ESTJ: 87, ESFJ: 85, ENFJ: 38, ENTJ: 62,
  },
  ISFJ: {
    ISTJ: 88, ISFJ: 85, INFJ: 66, INTJ: 38,
    ISTP: 66, ISFP: 80, INFP: 34, INTP: 35,
    ESTP: 95, ESFP: 94, ENFP: 32, ENTP: 28,
    ESTJ: 85, ESFJ: 88, ENFJ: 36, ENTJ: 39,
  },
  INFJ: {
    ISTJ: 35, ISFJ: 66, INFJ: 84, INTJ: 76,
    ISTP: 48, ISFP: 55, INFP: 89, INTP: 78,
    ESTP: 24, ESFP: 30, ENFP: 97, ENTP: 95,
    ESTJ: 32, ESFJ: 36, ENFJ: 88, ENTJ: 83,
  },
  INTJ: {
    ISTJ: 68, ISFJ: 38, INFJ: 76, INTJ: 84,
    ISTP: 56, ISFP: 48, INFP: 82, INTP: 88,
    ESTP: 34, ESFP: 22, ENFP: 94, ENTP: 96,
    ESTJ: 62, ESFJ: 30, ENFJ: 85, ENTJ: 86,
  },
  ISTP: {
    ISTJ: 79, ISFJ: 66, INFJ: 48, INTJ: 56,
    ISTP: 82, ISFP: 85, INFP: 45, INTP: 72,
    ESTP: 86, ESFP: 75, ENFP: 38, ENTP: 55,
    ESTJ: 95, ESFJ: 92, ENFJ: 35, ENTJ: 60,
  },
  ISFP: {
    ISTJ: 65, ISFJ: 80, INFJ: 55, INTJ: 48,
    ISTP: 85, ISFP: 84, INFP: 75, INTP: 42,
    ESTP: 78, ESFP: 87, ENFP: 58, ENTP: 36,
    ESTJ: 93, ESFJ: 96, ENFJ: 91, ENTJ: 35,
  },
  INFP: {
    ISTJ: 32, ISFJ: 34, INFJ: 89, INTJ: 82,
    ISTP: 45, ISFP: 75, INFP: 85, INTP: 78,
    ESTP: 35, ESFP: 48, ENFP: 87, ENTP: 82,
    ESTJ: 28, ESFJ: 30, ENFJ: 98, ENTJ: 94,
  },
  INTP: {
    ISTJ: 58, ISFJ: 35, INFJ: 78, INTJ: 88,
    ISTP: 72, ISFP: 42, INFP: 78, INTP: 83,
    ESTP: 58, ESFP: 38, ENFP: 81, ENTP: 86,
    ESTJ: 92, ESFJ: 26, ENFJ: 82, ENTJ: 97,
  },
  ESTP: {
    ISTJ: 93, ISFJ: 95, INFJ: 24, INTJ: 34,
    ISTP: 86, ISFP: 78, INFP: 35, INTP: 58,
    ESTP: 83, ESFP: 88, ENFP: 46, ENTP: 72,
    ESTJ: 82, ESFJ: 78, ENFJ: 32, ENTJ: 64,
  },
  ESFP: {
    ISTJ: 96, ISFJ: 94, INFJ: 30, INTJ: 22,
    ISTP: 75, ISFP: 87, INFP: 48, INTP: 38,
    ESTP: 88, ESFP: 86, ENFP: 70, ENTP: 48,
    ESTJ: 76, ESFJ: 84, ENFJ: 52, ENTJ: 28,
  },
  ENFP: {
    ISTJ: 28, ISFJ: 32, INFJ: 97, INTJ: 94,
    ISTP: 38, ISFP: 58, INFP: 87, INTP: 81,
    ESTP: 46, ESFP: 70, ENFP: 86, ENTP: 85,
    ESTJ: 34, ESFJ: 42, ENFJ: 88, ENTJ: 86,
  },
  ENTP: {
    ISTJ: 45, ISFJ: 28, INFJ: 95, INTJ: 96,
    ISTP: 55, ISFP: 36, INFP: 82, INTP: 86,
    ESTP: 72, ESFP: 48, ENFP: 85, ENTP: 85,
    ESTJ: 55, ESFJ: 35, ENFJ: 84, ENTJ: 86,
  },
  ESTJ: {
    ISTJ: 87, ISFJ: 85, INFJ: 32, INTJ: 62,
    ISTP: 95, ISFP: 93, INFP: 28, INTP: 92,
    ESTP: 82, ESFP: 76, ENFP: 34, ENTP: 55,
    ESTJ: 84, ESFJ: 87, ENFJ: 52, ENTJ: 76,
  },
  ESFJ: {
    ISTJ: 85, ISFJ: 88, INFJ: 36, INTJ: 30,
    ISTP: 92, ISFP: 96, INFP: 30, INTP: 26,
    ESTP: 78, ESFP: 84, ENFP: 42, ENTP: 35,
    ESTJ: 87, ESFJ: 87, ENFJ: 68, ENTJ: 45,
  },
  ENFJ: {
    ISTJ: 38, ISFJ: 36, INFJ: 88, INTJ: 85,
    ISTP: 35, ISFP: 91, INFP: 98, INTP: 82,
    ESTP: 32, ESFP: 52, ENFP: 88, ENTP: 84,
    ESTJ: 52, ESFJ: 68, ENFJ: 86, ENTJ: 85,
  },
  ENTJ: {
    ISTJ: 62, ISFJ: 39, INFJ: 83, INTJ: 86,
    ISTP: 60, ISFP: 35, INFP: 94, INTP: 97,
    ESTP: 64, ESFP: 28, ENFP: 86, ENTP: 86,
    ESTJ: 76, ESFJ: 45, ENFJ: 85, ENTJ: 83,
  },
};

export function getLevelInfo(score: number): {
  level: 1 | 2 | 3 | 4 | 5;
  levelName: string;
} {
  if (score >= 90) return { level: 5, levelName: '천생연분 (Perfect Harmony)' };
  if (score >= 75) return { level: 4, levelName: '찰떡 콤비 (Great Synergy)' };
  if (score >= 60) return { level: 3, levelName: '상호 보완 (Balanced Dynamic)' };
  if (score >= 40) return { level: 2, levelName: '알쏭달쏭 탐색 (Curious Difference)' };
  return { level: 1, levelName: '극과 극 케미 (Challenging Match)' };
}

export function getPairKey(a: MBTICode, b: MBTICode): string {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

// Special hand-crafted details for key pairings
const SPECIAL_PAIR_DETAILS: Record<string, Partial<ChemistryDetail>> = {
  // INFP - ENFJ (Dual / 천생연분 98점)
  'ENFJ-INFP': {
    title: '영혼의 빈틈을 채워주는 기적 같은 천생연분',
    synergy: [
      'ENFJ의 따스한 리더십이 INFP의 닫힌 마음을 자연스럽게 무장해제함',
      '서로의 이상향과 예술적 감수성을 깊이 존중하고 무한히 지지함',
      '정서적 공감대가 풍부하여 눈빛만으로도 마음의 상태를 알아챔',
    ],
    caution: [
      '서로에게 상처를 주지 않으려다 솔직한 불만을 속으로 삭힐 수 있음',
      '감정이 격해졌을 때 둘 다 쉽게 눈물을 보이거나 위축될 수 있음',
    ],
    loveTip: '서운한 점이 있다면 망설이지 말고 다정하게 표현하세요. 상대방은 언제나 경청할 준비가 되어 있습니다.',
    friendTip: '세상에 따뜻한 선한 영향력을 전하는 기획이나 프로젝트를 함께 해보세요. 최고의 시너지가 납니다.',
  },

  // INFJ - ENFP (Dual / 천생연분 97점)
  'ENFP-INFJ': {
    title: '서로의 세계를 무한히 확장하는 영혼의 단짝',
    synergy: [
      'ENFP의 기발한 상상력을 INFJ가 깊이 있고 단단하게 구체화해 줌',
      '서로에게 가장 자유롭고 안전한 심리적 해방감을 선물하는 사이',
      '대화가 시작되면 끝이 없을 정도로 관심사와 세계관이 일치함',
    ],
    caution: [
      'ENFP의 즉흥적 템포에 INFJ의 에너지가 소진될 수 있음',
      '둘 다 현실적이고 물질적인 디테일(일정, 재정)을 놓치기 쉬움',
    ],
    loveTip: 'INFJ에게 혼자만의 충전 시간을 존중해 주고, ENFP의 다채로운 열정을 아낌없이 칭찬해 주세요.',
    friendTip: '새로운 아이디어를 구상하고 탐구하는 밤샘 대화에서 평생 잊지 못할 영감을 얻게 됩니다.',
  },

  // INTP - ENTJ (Dual / 천생연분 97점)
  'ENTJ-INTP': {
    title: '지성과 실행력이 완벽히 맞물린 무적의 브레인 듀오',
    synergy: [
      'INTP의 날카롭고 독창적인 통찰과 ENTJ의 압도적인 추진력의 결합',
      '감정 소모 없이 사실과 논리 위주로 막힘없이 통하는 쿨한 소통',
      '서로의 뛰어난 지적 역량을 진심으로 인정하고 존경함',
    ],
    caution: [
      '논쟁이 길어질 경우 서로의 논리적 고집으로 차가운 냉전이 생길 수 있음',
      '효율성만 따지다 서로의 감정적 온도를 세심하게 챙기지 못할 위험',
    ],
    loveTip: '가끔은 분석과 전략을 내려놓고 마음을 전하는 다정한 한마디를 먼저 건네보세요.',
    friendTip: '스터디, 창업, 프로젝트 등 목표가 명확한 분야에서 세상 누구도 당해낼 수 없는 최강의 팀이 됩니다.',
  },

  // INTJ - ENTP (Dual / 천생연분 96점)
  'ENTP-INTJ': {
    title: '끝없는 지적 유희와 혜안을 나누는 천재 콤비',
    synergy: [
      'ENTP의 반짝이는 아이디어를 INTJ가 치밀하게 체계화하여 실현함',
      '지적 호기심과 논쟁을 즐기며 서로의 사고를 끊임없이 확장시킴',
      '상대방의 독립성과 개인 시간을 완벽히 존중해 주는 쿨한 관계',
    ],
    caution: [
      '서로 지기 싫어하는 승부욕 때문에 말싸움이 감정싸움으로 번질 수 있음',
      '감정적 취약함을 털어놓지 않고 겉으로만 논리적으로 무장할 위험',
    ],
    loveTip: '상대를 설득하려 하기보다 있는 그대로 인정해 주세요. 마음의 문을 열면 가장 든든한 내 편이 됩니다.',
    friendTip: '심도 있는 토론이나 전시회 관람, 전략 게임을 함께 즐기면 세상에서 가장 유쾌한 파트너가 됩니다.',
  },

  // ISFP - ESFJ (Dual / 천생연분 96점)
  'ESFJ-ISFP': {
    title: '포근한 온기와 배려로 물드는 힐링 천생연분',
    synergy: [
      'ESFJ의 세심한 보살핌과 ISFP의 순수하고 온화한 매력이 조화를 이룸',
      '일상의 소소한 행복과 맛있는 음식을 함께 나누는 안락한 관계',
      '갈등 상황을 피하고 서로에게 편안한 안식처가 되어 줌',
    ],
    caution: [
      'ISFP의 혼자만의 시간을 ESFJ가 거리감으로 오해할 수 있음',
      '서로 거절을 잘 못 해 속마음을 털어놓지 못하고 속앓이할 수 있음',
    ],
    loveTip: 'ISFP는 고마움을 따뜻한 말로 적극 표현하고, ESFJ는 상대의 개인 공간을 여유롭게 존중해 주세요.',
    friendTip: '예쁜 카페나 감성 넘치는 명소를 함께 찾아다니면 일상의 피로가 눈 녹듯 사라집니다.',
  },

  // ISTP - ESTJ (Dual / 천생연분 95점)
  'ESTJ-ISTP': {
    title: '현실 감각과 문제 해결력이 폭발하는 실전 최강 듀오',
    synergy: [
      'ESTJ의 체계적인 기획과 ISTP의 번뜩이는 손재주·임기응변의 조화',
      '군더더기 없는 담백하고 솔직한 커뮤니케이션으로 오해가 적음',
      '실질적인 삶의 과제를 가장 신속하고 정확하게 해결해 냄',
    ],
    caution: [
      'ESTJ의 지시적 태도에 ISTP가 구속감을 느끼고 반발할 수 있음',
      '감정적 위로나 공감이 부족하여 관계가 다소 딱딱하게 느껴질 위험',
    ],
    loveTip: '서로의 하루 감정을 가볍게 물어보는 루틴을 만들어보세요. 실용성 이상의 로맨스가 채워집니다.',
    friendTip: '캠핑, 스포츠, 조립, DIY 등 몸으로 부딪쳐 만드는 활동을 함께하면 최고의 단짝이 됩니다.',
  },

  // ISFJ - ESTP (Dual / 천생연분 95점)
  'ESTP-ISFJ': {
    title: '안정적인 안식처와 짜릿한 모험이 만난 극적 하모니',
    synergy: [
      'ESTP의 넘치는 활력이 ISFJ의 단조로운 일상에 신선한 생기를 불어넣음',
      'ISFJ의 헌신적인 지지가 ESTP에게 가장 믿음직한 안식처가 됨',
      '서로에게 결핍된 에너지를 완벽하게 메워주는 상호보완적 케미',
    ],
    caution: [
      'ESTP의 지나치게 즉흥적인 행동이 ISFJ에게 불안감을 줄 수 있음',
      'ISFJ가 마음속으로 쌓아둔 서운함을 ESTP가 무심코 지나칠 위험',
    ],
    loveTip: 'ESTP는 약속과 작은 신뢰를 철저히 지키고, ISFJ는 상대의 유쾌한 장난을 열린 마음으로 받아주세요.',
    friendTip: '여행이나 야외 활동 시 계획은 ISFJ가, 현장 분위기와 재미는 ESTP가 주도하면 환상의 팀워크를 냅니다.',
  },

  // ISTJ - ESFP (Dual / 천생연분 96점)
  'ESFP-ISTJ': {
    title: '묵직한 든든함과 톡톡 튀는 비타민의 환상 조합',
    synergy: [
      'ESFP의 밝고 유쾌한 에너지가 ISTJ의 무거운 일상에 웃음을 선물함',
      'ISTJ의 철저한 현실 감각과 책임감이 ESFP를 안전하게 지탱해 줌',
      '정반대의 매력에 서로 깊이 끌리며 안정과 활력을 동시에 얻음',
    ],
    caution: [
      '시간 약속이나 소비 습관 등 현실적 기준의 차이로 부딪힐 수 있음',
      'ISTJ의 현실적 직언에 ESFP가 상처받거나 서운함을 느낄 수 있음',
    ],
    loveTip: 'ESFP의 애정 표현에 ISTJ도 다정한 리액션으로 화답하고, 서로의 라이프스타일 템포를 존중하세요.',
    friendTip: 'ISTJ에게는 삶의 활력소가, ESFP에게는 흔들리지 않는 든든한 멘토가 되어주는 소중한 인연입니다.',
  },

  // Extreme Conflict Pairs (극과 극 케미 20~30점대)
  'ESTJ-INFP': {
    title: '감성과 효율이 맞부딪히는 아슬아슬 극과 극 케미',
    synergy: [
      'INFP의 따뜻한 이상과 ESTJ의 압도적 실행력이 합쳐지면 현실에 기적을 만듦',
      '서로 전혀 다른 렌즈로 세상을 바라보며 시야를 극적으로 넓힐 기회',
    ],
    caution: [
      'ESTJ의 직설적이고 통제적인 화법에 INFP가 깊은 상처를 받을 수 있음',
      'INFP의 감정적 반응과 모호한 표현을 ESTJ가 비효율적이라 비판할 위험',
    ],
    loveTip: 'ESTJ는 비판보다 따뜻한 공감을 먼저 건네고, INFP는 상대의 조언이 애정에서 비롯되었음을 기억하세요.',
    friendTip: '감정적인 영역보다는 명확한 역할 분담이 가능한 작업에서 공적인 시너지를 내는 것이 안전합니다.',
  },

  'ENFP-ISTJ': {
    title: '자유로운 상상과 원칙의 규칙이 만난 반전 드라마',
    synergy: [
      'ENFP의 통통 튀는 아이디어가 ISTJ의 현실적 검증을 거쳐 실체화됨',
      'ISTJ에게는 새로운 활력을, ENFP에게는 든든한 현실의 닻을 제공함',
    ],
    caution: [
      '규칙과 정돈을 중시하는 ISTJ와 즉흥적인 ENFP 사이의 생활 방식 충돌',
      'ISTJ의 묵묵한 태도를 ENFP가 무관심으로 오해할 수 있음',
    ],
    loveTip: 'ENFP는 시간 약속을 성실히 지키고, ISTJ는 상대의 자유로운 영혼을 바꾸려 하지 말고 지켜봐 주세요.',
    friendTip: '아이디어 회의는 ENFP가, 실행 계획과 마무리는 ISTJ가 맡으면 의외의 명작을 만들어냅니다.',
  },

  'ESFP-INTJ': {
    title: '현재의 찰나와 먼 미래의 비전이 교차하는 미지의 세계',
    synergy: [
      'INTJ의 깊은 사유와 ESFP의 감각적 순간 몰입이 서로에게 없는 세계를 보여줌',
      '서로에게 익숙하지 않은 새로운 삶의 방식을 체험하게 해주는 신선한 자극',
    ],
    caution: [
      '진지한 대화를 원하는 INTJ와 즐겁고 즉흥적인 순간을 원하는 ESFP의 엇박자',
      'INTJ의 냉철한 태도에 ESFP가 거리감을 느끼거나 INTJ가 피로감을 느낄 위험',
    ],
    loveTip: 'INTJ는 즐거운 분위기를 함께 즐겨주고, ESFP는 상대의 진지한 고민에 귀 기울여 주는 배려가 필수입니다.',
    friendTip: '가벼운 모임이나 파티에서 만나면 유쾌하게 어울릴 수 있지만, 장기 프로젝트는 충분한 조율이 필요합니다.',
  },

  'ESFJ-INTP': {
    title: '따스한 감정의 온도와 차가운 논리의 정반대 만남',
    synergy: [
      'ESFJ의 섬세한 인간관계 배려와 INTP의 명쾌한 문제 분석의 만남',
      '서로의 맹점을 가장 극명하게 짚어주며 균형 잡힌 시각을 배우는 관계',
    ],
    caution: [
      '감정적 공감을 원하는 ESFJ에게 INTP가 팩트 폭격을 날려 상처를 줄 수 있음',
      '사회적 예절을 강조하는 ESFJ에게 INTP의 무관심한 태도가 무례하게 느껴질 위험',
    ],
    loveTip: 'INTP는 해결책 대신 "그랬구나" 공감을 먼저 건네고, ESFJ는 상대의 조용한 침묵을 인정해 주세요.',
    friendTip: '서로의 세계관이 완전히 다르다는 점을 인정하고, 배려심 있는 태도로 대화하면 의외의 배움이 있습니다.',
  },
};

// Generate high quality tailored content for identical MBTI pairs
function getIdenticalPairDetail(code: MBTICode, score: number): ChemistryDetail {
  const info = MBTI_TYPES[code];
  const levelInfo = getLevelInfo(score);

  return {
    score,
    level: levelInfo.level,
    levelName: levelInfo.levelName,
    title: `${info.name} 둘이 마주한 거울 속 도플갱어 케미`,
    synergy: [
      `말하지 않아도 서로의 생각과 감정을 훤히 꿰뚫어 보는 텔레파시 같은 공감대`,
      `비슷한 가치관과 유머 코드를 지녀 함께 있을 때 세상에서 가장 편안한 안식처`,
      `서로의 강점과 매력을 가장 잘 이해하고 북돋워 줄 수 있는 최고의 자기 반영`,
    ],
    caution: [
      `서로의 약점과 단점까지 똑같이 닮아 나태해지거나 결정을 함께 미룰 수 있음`,
      `감정적인 침체나 스트레스 상황이 동시에 찾아오면 둘 다 회피할 위험`,
    ],
    loveTip: `서로를 너무 잘 안다고 여겨 배려나 표현을 생략하지 마세요. 거울을 대하듯 다정하게 마음을 전하세요.`,
    friendTip: `가장 편한 영혼의 단짝이지만, 함께 일할 때는 명확한 행동 대장을 정해 실행력을 보완해 보세요.`,
  };
}

// Synthesize tailored chemistry detail for any pair based on dimensions and score level
function synthesizePairDetail(
  m1: MBTICode,
  m2: MBTICode,
  score: number
): ChemistryDetail {
  const levelInfo = getLevelInfo(score);
  const info1 = MBTI_TYPES[m1];
  const info2 = MBTI_TYPES[m2];

  const sameEI = m1[0] === m2[0];
  const sameNS = m1[1] === m2[1];
  const sameTF = m1[2] === m2[2];
  const samePJ = m1[3] === m2[3];

  let title = '';
  if (levelInfo.level === 5) {
    title = `서로에게 없는 조각을 채워주는 기적의 천생연분 (${info1.name} × ${info2.name})`;
  } else if (levelInfo.level === 4) {
    title = `손발이 척척 맞고 서로를 북돋워 주는 찰떡 콤비 (${info1.name} × ${info2.name})`;
  } else if (levelInfo.level === 3) {
    title = `다름을 통해 서로를 한 단계 성장시키는 상호 보완 파트너`;
  } else if (levelInfo.level === 2) {
    title = `서로 다른 매력에 호기심을 품고 탐색해 가는 알쏭달쏭 케미`;
  } else {
    title = `정반대의 개성으로 스릴과 긴장감이 넘치는 극과 극 케미`;
  }

  const synergy: string[] = [];
  if (sameNS) {
    synergy.push(
      sameNS && m1[1] === 'N'
        ? '깊이 있는 대화와 상상력 넘치는 아이디어를 공유하며 공감대 형성'
        : '현실적인 감각과 실용적인 경험을 바탕으로 공통의 관심사를 나눔'
    );
  } else {
    synergy.push('현실적 실용성과 창의적 통찰이 결합하여 균형 잡힌 관점을 제공');
  }

  if (sameEI) {
    synergy.push(
      m1[0] === 'E'
        ? '넘치는 에너지와 적극성으로 함께 활동할 때 시너지 폭발'
        : '조용하고 차분한 에너지 템포로 서로에게 깊은 안정감을 선사'
    );
  } else {
    synergy.push('외향의 활기찬 에너지와 내향의 깊은 내면이 완벽한 상호보완을 이룸');
  }

  if (sameTF) {
    synergy.push(
      m1[2] === 'T'
        ? '명쾌한 논리와 솔직 담백한 의사소통으로 깔끔한 관계 유지'
        : '풍부한 감수성과 따뜻한 공감 능력으로 서로를 깊이 위로함'
    );
  } else {
    synergy.push('따뜻한 감성적 지지와 이성적 현실 판단이 조화를 이룸');
  }

  const caution: string[] = [];
  if (!sameTF) {
    caution.push('서운함을 표현하는 방식과 이성적 피드백 사이에서 오해가 생길 수 있음');
  } else if (m1[2] === 'T') {
    caution.push('논리적 승패에 집착하다가 상대방의 감정을 놓치고 냉랭해질 수 있음');
  } else {
    caution.push('서로 상처받는 것을 두려워해 솔직한 속마음을 감출 수 있음');
  }

  if (!samePJ) {
    caution.push('즉흥적인 유연성과 체계적인 계획성 사이의 템포 차이로 인한 마찰');
  } else if (m1[3] === 'P') {
    caution.push('둘 다 중요한 결정이나 마무리를 뒤로 미루어 혼란이 생길 수 있음');
  } else {
    caution.push('서로의 생활 방식이나 규칙에 대한 고집으로 타협이 어려울 수 있음');
  }

  const loveTip =
    levelInfo.level >= 4
      ? '서로의 다름을 매력으로 여기고 표현을 아끼지 마세요. 작은 배려가 둘만의 깊은 유대감을 만듭니다.'
      : levelInfo.level === 3
      ? '상대방의 방식이 나와 다를 수 있음을 인정하고, 감정을 솔직하고 부드럽게 표현하세요.'
      : '내 기준을 상대방에게 강요하지 말고, 다름을 인정하며 천천히 신뢰를 쌓아가는 인내가 필요합니다.';

  const friendTip =
    levelInfo.level >= 4
      ? '대화와 활동 모두에서 최고의 호흡을 자랑합니다. 함께 목표를 세우고 협업해보세요.'
      : levelInfo.level === 3
      ? '서로의 장점이 다르므로 역할을 분담하면 어떤 과제든 훌륭히 완수할 수 있습니다.'
      : '서로의 영역과 스타일을 존중하며 한 걸음 물러선 배려로 소통하면 뜻밖의 지혜를 얻습니다.';

  return {
    score,
    level: levelInfo.level,
    levelName: levelInfo.levelName,
    title,
    synergy: synergy.slice(0, 3),
    caution: caution.slice(0, 2),
    loveTip,
    friendTip,
  };
}

export function getChemistryDetail(m1: MBTICode, m2: MBTICode): ChemistryDetail {
  const score = RAW_SCORE_MATRIX[m1]?.[m2] ?? 70;
  const levelInfo = getLevelInfo(score);

  if (m1 === m2) {
    return getIdenticalPairDetail(m1, score);
  }

  const pairKey = getPairKey(m1, m2);
  const special = SPECIAL_PAIR_DETAILS[pairKey];

  if (special) {
    const base = synthesizePairDetail(m1, m2, score);
    return {
      score,
      level: levelInfo.level,
      levelName: levelInfo.levelName,
      title: special.title ?? base.title,
      synergy: special.synergy ?? base.synergy,
      caution: special.caution ?? base.caution,
      loveTip: special.loveTip ?? base.loveTip,
      friendTip: special.friendTip ?? base.friendTip,
    };
  }

  return synthesizePairDetail(m1, m2, score);
}
