import { ALL_MBTI_CODES, MBTICode, MBTITypeInfo, MBTI_TYPES } from '../data/mbtiTypes';
import { getChemistryDetail } from '../data/chemistryMatrix';

export type RelationMode = 'love' | 'friend';

export interface MatchRankItem {
  mbti: MBTICode;
  score: number;
  level: 1 | 2 | 3 | 4 | 5;
  levelName: string;
  title: string;
  info: MBTITypeInfo;
}

export interface ChemistryResult {
  m1: MBTICode;
  m2: MBTICode;
  m1Info: MBTITypeInfo;
  m2Info: MBTITypeInfo;
  mode: RelationMode;
  score: number;
  level: 1 | 2 | 3 | 4 | 5;
  levelName: string;
  title: string;
  synergy: string[];
  caution: string[];
  tip: string;
  loveTip: string;
  friendTip: string;
  isSameType: boolean;
}

/**
 * Calculates the detailed chemistry between two MBTI types for the given mode (love or friend).
 */
export function calculateChemistry(
  m1: MBTICode,
  m2: MBTICode,
  mode: RelationMode = 'love'
): ChemistryResult {
  const detail = getChemistryDetail(m1, m2);
  const m1Info = MBTI_TYPES[m1];
  const m2Info = MBTI_TYPES[m2];
  const isSameType = m1 === m2;
  const tip = mode === 'friend' ? detail.friendTip : detail.loveTip;

  return {
    m1,
    m2,
    m1Info,
    m2Info,
    mode,
    score: detail.score,
    level: detail.level,
    levelName: detail.levelName,
    title: detail.title,
    synergy: detail.synergy,
    caution: detail.caution,
    tip,
    loveTip: detail.loveTip,
    friendTip: detail.friendTip,
    isSameType,
  };
}

/**
 * Returns the top 3 best matching MBTI types and top 3 worst matching MBTI types for a given MBTI.
 */
export function getBestAndWorstMatches(mbti: MBTICode): {
  best: MatchRankItem[];
  worst: MatchRankItem[];
} {
  const allMatches: MatchRankItem[] = ALL_MBTI_CODES.map((other) => {
    const detail = getChemistryDetail(mbti, other);
    return {
      mbti: other,
      score: detail.score,
      level: detail.level,
      levelName: detail.levelName,
      title: detail.title,
      info: MBTI_TYPES[other],
    };
  });

  // Sort descending for best matches
  const sortedDesc = [...allMatches].sort((a, b) => b.score - a.score);
  const best = sortedDesc.slice(0, 3);

  // Sort ascending for worst matches
  const sortedAsc = [...allMatches].sort((a, b) => a.score - b.score);
  const worst = sortedAsc.slice(0, 3);

  return {
    best,
    worst,
  };
}
