import { describe, it, expect } from 'vitest';
import { ALL_MBTI_CODES, MBTI_TYPES } from '../src/data/mbtiTypes';
import { calculateChemistry, getBestAndWorstMatches } from '../src/utils/chemistryCalculator';

describe('MBTI Chemistry Engine', () => {
  describe('MBTI Types Metadata', () => {
    it('should define all 16 MBTI types with complete metadata', () => {
      expect(ALL_MBTI_CODES).toHaveLength(16);

      ALL_MBTI_CODES.forEach((code) => {
        const info = MBTI_TYPES[code];
        expect(info).toBeDefined();
        expect(info.code).toBe(code);
        expect(info.name).toBeTruthy();
        expect(info.nickname).toBeTruthy();
        expect(info.shortDesc).toBeTruthy();
        expect(Array.isArray(info.keywords)).toBe(true);
        expect(info.keywords.length).toBeGreaterThanOrEqual(2);
        expect(info.color).toBeTruthy();
        expect(info.badgeColor).toBeTruthy();
      });
    });
  });

  describe('16x16 (256 pairs) Matrix Integrity', () => {
    it('should return valid scores (0-100) and details for all 256 combinations', () => {
      let count = 0;
      for (const m1 of ALL_MBTI_CODES) {
        for (const m2 of ALL_MBTI_CODES) {
          count++;
          const loveRes = calculateChemistry(m1, m2, 'love');
          const friendRes = calculateChemistry(m1, m2, 'friend');

          // Score bounds
          expect(loveRes.score).toBeGreaterThanOrEqual(0);
          expect(loveRes.score).toBeLessThanOrEqual(100);
          expect(friendRes.score).toBe(loveRes.score);

          // Level mapping
          if (loveRes.score >= 90) {
            expect(loveRes.level).toBe(5);
            expect(loveRes.levelName).toContain('천생연분');
          } else if (loveRes.score >= 75) {
            expect(loveRes.level).toBe(4);
            expect(loveRes.levelName).toContain('찰떡 콤비');
          } else if (loveRes.score >= 60) {
            expect(loveRes.level).toBe(3);
            expect(loveRes.levelName).toContain('상호 보완');
          } else if (loveRes.score >= 40) {
            expect(loveRes.level).toBe(2);
            expect(loveRes.levelName).toContain('알쏭달쏭');
          } else {
            expect(loveRes.level).toBe(1);
            expect(loveRes.levelName).toContain('극과 극');
          }

          // Synergy and caution
          expect(loveRes.title.trim().length).toBeGreaterThan(0);
          expect(loveRes.synergy.length).toBeGreaterThanOrEqual(2);
          expect(loveRes.caution.length).toBeGreaterThanOrEqual(2);

          // Tips
          expect(loveRes.tip).toBe(loveRes.loveTip);
          expect(friendRes.tip).toBe(friendRes.friendTip);
          expect(loveRes.loveTip.trim().length).toBeGreaterThan(0);
          expect(friendRes.friendTip.trim().length).toBeGreaterThan(0);

          // Info attachments
          expect(loveRes.m1Info.code).toBe(m1);
          expect(loveRes.m2Info.code).toBe(m2);
        }
      }
      expect(count).toBe(256);
    });

    it('should guarantee score symmetry (A x B == B x A)', () => {
      for (const m1 of ALL_MBTI_CODES) {
        for (const m2 of ALL_MBTI_CODES) {
          const ab = calculateChemistry(m1, m2, 'love');
          const ba = calculateChemistry(m2, m1, 'love');
          expect(ab.score).toBe(ba.score);
          expect(ab.level).toBe(ba.level);
        }
      }
    });
  });

  describe('Special Handling & Modes', () => {
    it('should provide mirror/doppelganger chemistry for identical MBTI pairs', () => {
      for (const code of ALL_MBTI_CODES) {
        const res = calculateChemistry(code, code, 'love');
        expect(res.isSameType).toBe(true);
        expect(
          res.title.includes('거울') ||
          res.title.includes('도플갱어') ||
          res.title.includes('쌍둥이') ||
          res.title.includes('데칼코마니') ||
          res.title.includes('닮은꼴')
        ).toBe(true);
      }
    });

    it('should provide different tips depending on love vs friend mode', () => {
      const loveRes = calculateChemistry('INFP', 'ENFJ', 'love');
      const friendRes = calculateChemistry('INFP', 'ENFJ', 'friend');

      expect(loveRes.tip).toBe(loveRes.loveTip);
      expect(friendRes.tip).toBe(friendRes.friendTip);
      expect(loveRes.mode).toBe('love');
      expect(friendRes.mode).toBe('friend');
    });
  });

  describe('getBestAndWorstMatches', () => {
    it('should return top 3 best and bottom 3 worst matches sorted by score', () => {
      for (const code of ALL_MBTI_CODES) {
        const { best, worst } = getBestAndWorstMatches(code);

        expect(best).toHaveLength(3);
        expect(worst).toHaveLength(3);

        // Best should be sorted descending
        expect(best[0].score).toBeGreaterThanOrEqual(best[1].score);
        expect(best[1].score).toBeGreaterThanOrEqual(best[2].score);

        // Worst should be sorted ascending
        expect(worst[0].score).toBeLessThanOrEqual(worst[1].score);
        expect(worst[1].score).toBeLessThanOrEqual(worst[2].score);

        // Best score should be >= worst score
        expect(best[2].score).toBeGreaterThanOrEqual(worst[2].score);

        // Check structure
        best.forEach((item) => {
          expect(ALL_MBTI_CODES).toContain(item.mbti);
          expect(item.score).toBeGreaterThanOrEqual(0);
          expect(item.score).toBeLessThanOrEqual(100);
          expect(item.level).toBeGreaterThanOrEqual(1);
          expect(item.level).toBeLessThanOrEqual(5);
          expect(item.levelName).toBeTruthy();
          expect(item.title).toBeTruthy();
          expect(item.info.code).toBe(item.mbti);
        });

        worst.forEach((item) => {
          expect(ALL_MBTI_CODES).toContain(item.mbti);
          expect(item.score).toBeGreaterThanOrEqual(0);
          expect(item.score).toBeLessThanOrEqual(100);
          expect(item.level).toBeGreaterThanOrEqual(1);
          expect(item.level).toBeLessThanOrEqual(5);
          expect(item.levelName).toBeTruthy();
          expect(item.title).toBeTruthy();
          expect(item.info.code).toBe(item.mbti);
        });
      }
    });
  });
});
