import { act, createRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ReportCard } from '../src/components/ReportCard';
import { calculateChemistry } from '../src/utils/chemistryCalculator';

// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('ReportCard Component', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('should render user names, MBTI codes, and relationship title', () => {
    const result = calculateChemistry('INFP', 'ENFJ', 'love');
    const cardRef = createRef<HTMLDivElement>();

    act(() => {
      root.render(
        <ReportCard
          result={result}
          myName="지민"
          partnerName="정국"
          cardRef={cardRef}
        />
      );
    });

    expect(container.textContent).toContain('지민');
    expect(container.textContent).toContain('정국');
    expect(container.textContent).toContain('INFP');
    expect(container.textContent).toContain('ENFJ');
    expect(container.textContent).toContain(result.title);
    expect(cardRef.current).not.toBeNull();
  });

  it('should fallback to default labels if names are empty strings', () => {
    const result = calculateChemistry('INTJ', 'ENFP', 'friend');

    act(() => {
      root.render(
        <ReportCard
          result={result}
          myName=""
          partnerName="  "
        />
      );
    });

    expect(container.textContent).toContain('나');
    expect(container.textContent).toContain('상대방');
    expect(container.textContent).toContain('친구·동료');
  });

  it('should render score gauge, level badge, and all 3 analysis sections', () => {
    const result = calculateChemistry('INFP', 'ENFJ', 'love');

    act(() => {
      root.render(
        <ReportCard
          result={result}
          myName="민수"
          partnerName="수지"
        />
      );
    });

    // Score & Level
    expect(container.textContent).toContain(`${result.score}`);
    expect(container.textContent).toContain(result.levelName);

    // Section 1: Synergy
    expect(container.textContent).toContain('환상의 시너지');
    result.synergy.forEach((item) => {
      expect(container.textContent).toContain(item);
    });

    // Section 2: Caution
    expect(container.textContent).toContain('주의할 갈등 포인트');
    result.caution.forEach((item) => {
      expect(container.textContent).toContain(item);
    });

    // Section 3: Actionable Tip
    expect(container.textContent).toContain('특급 솔루션');
    expect(container.textContent).toContain(result.tip);

    // Bottom Watermark
    expect(container.textContent).toContain('MBTI 케미스트리');
  });
});
