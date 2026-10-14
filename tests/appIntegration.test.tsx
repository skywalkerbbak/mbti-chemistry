import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { App } from '../src/App';

// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Task 5: App Integration & URL Parameter Deep Linking', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    window.scrollTo = vi.fn();
    window.history.pushState(null, '', '/');
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    window.history.pushState(null, '', '/');
    vi.restoreAllMocks();
  });

  it('1. should render default input form when no query parameters are present', () => {
    act(() => {
      root.render(<App />);
    });

    expect(container.textContent).toContain('MBTI 케미스트리');
    expect(container.textContent).toContain('16 x 16 정밀 매트릭스');
    expect(container.textContent).toContain('나의 MBTI');
    expect(container.textContent).toContain('상대방 MBTI');

    const submitBtn = container.querySelector('[data-testid="submit-chemistry-btn"]') as HTMLButtonElement;
    expect(submitBtn).toBeTruthy();
    expect(submitBtn.disabled).toBe(true);

    const reportCard = container.querySelector('[data-testid="report-card"]');
    expect(reportCard).toBeNull();
  });

  it('2. should transition to result screen when MBTIs are selected and submit is clicked', () => {
    act(() => {
      root.render(<App />);
    });

    // 1) Select my MBTI (INFP)
    const myInfpBtn = container.querySelector('[data-testid="mbti-my-INFP"]') as HTMLButtonElement;
    expect(myInfpBtn).toBeTruthy();
    act(() => {
      myInfpBtn.click();
    });

    // 2) Select partner MBTI (ENFJ) - MatchSelector auto-advances tab to partner
    const partnerEnfjBtn = container.querySelector('[data-testid="mbti-partner-ENFJ"]') as HTMLButtonElement;
    expect(partnerEnfjBtn).toBeTruthy();
    act(() => {
      partnerEnfjBtn.click();
    });

    const submitBtn = container.querySelector('[data-testid="submit-chemistry-btn"]') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);

    // 3) Click submit
    act(() => {
      submitBtn.click();
    });

    // 4) Verify result screen and URL update
    const reportCard = container.querySelector('[data-testid="report-card"]');
    expect(reportCard).toBeTruthy();
    expect(window.location.search).toContain('m1=INFP');
    expect(window.location.search).toContain('m2=ENFJ');
    expect(window.location.search).toContain('mode=love');

    // Verify share actions
    const copyBtn = container.querySelector('[data-testid="copy-link-btn"]');
    const resetBtn = container.querySelector('[data-testid="reset-btn"]');
    expect(copyBtn).toBeTruthy();
    expect(resetBtn).toBeTruthy();
  });

  it('3. should immediately render result screen when URL contains valid m1 and m2 params', () => {
    window.history.pushState(null, '', '/?m1=INFP&m2=ENFJ&mode=love&n1=로미오&n2=줄리엣');

    act(() => {
      root.render(<App />);
    });

    const reportCard = container.querySelector('[data-testid="report-card"]');
    expect(reportCard).toBeTruthy();
    expect(container.textContent).toContain('로미오');
    expect(container.textContent).toContain('줄리엣');
    expect(container.textContent).toContain('연인 케미 리포트');
  });

  it('4. should return to input form and reset URL when reset button is clicked', () => {
    window.history.pushState(null, '', '/?m1=INTJ&m2=ENFP&mode=love');

    act(() => {
      root.render(<App />);
    });

    const reportCardBefore = container.querySelector('[data-testid="report-card"]');
    expect(reportCardBefore).toBeTruthy();

    const resetBtn = container.querySelector('[data-testid="reset-btn"]') as HTMLButtonElement;
    expect(resetBtn).toBeTruthy();

    act(() => {
      resetBtn.click();
    });

    // Verify input form is back and URL query is cleared
    const reportCardAfter = container.querySelector('[data-testid="report-card"]');
    expect(reportCardAfter).toBeNull();
    expect(container.querySelector('[data-testid="submit-chemistry-btn"]')).toBeTruthy();
    expect(window.location.search).toBe('');
  });

  it('5. should copy link and display toast message when copy link button is clicked', async () => {
    window.history.pushState(null, '', '/?m1=INFP&m2=ENFJ&mode=love');

    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    act(() => {
      root.render(<App />);
    });

    const copyBtn = container.querySelector('[data-testid="copy-link-btn"]') as HTMLButtonElement;
    expect(copyBtn).toBeTruthy();

    await act(async () => {
      copyBtn.click();
    });

    expect(writeTextMock).toHaveBeenCalled();
    expect(container.textContent).toContain('결과 링크가 복사되었습니다! 친구에게 공유해보세요 💌');
  });

  it('6. should render friend mode report when mode=friend is provided in URL', () => {
    window.history.pushState(null, '', '/?m1=ISTJ&m2=ESTJ&mode=friend');

    act(() => {
      root.render(<App />);
    });

    const reportCard = container.querySelector('[data-testid="report-card"]');
    expect(reportCard).toBeTruthy();
    expect(container.textContent).toContain('친구·동료 케미 리포트');
  });

  it('7. should show failure toast when clipboard writeText rejects', async () => {
    window.history.pushState(null, '', '/?m1=INFP&m2=ENFJ&mode=love');

    const writeTextMock = vi.fn().mockRejectedValue(new Error('Permission denied'));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    act(() => {
      root.render(<App />);
    });

    const copyBtn = container.querySelector('[data-testid="copy-link-btn"]') as HTMLButtonElement;
    await act(async () => {
      copyBtn.click();
    });

    expect(container.textContent).toContain('클립보드 복사에 실패했습니다. 브라우저 주소창의 링크를 복사해주세요.');
  });

  it('8. should fallback to textarea execCommand when navigator.clipboard is undefined', async () => {
    window.history.pushState(null, '', '/?m1=INFP&m2=ENFJ&mode=love');

    Object.assign(navigator, {
      clipboard: undefined,
    });
    const execCommandMock = vi.fn().mockReturnValue(true);
    document.execCommand = execCommandMock;

    act(() => {
      root.render(<App />);
    });

    const copyBtn = container.querySelector('[data-testid="copy-link-btn"]') as HTMLButtonElement;
    await act(async () => {
      copyBtn.click();
    });

    expect(execCommandMock).toHaveBeenCalledWith('copy');
    expect(container.textContent).toContain('결과 링크가 복사되었습니다! 친구에게 공유해보세요 💌');
  });

  it('9. should show failure toast when fallback execCommand returns false', async () => {
    window.history.pushState(null, '', '/?m1=INFP&m2=ENFJ&mode=love');

    Object.assign(navigator, {
      clipboard: undefined,
    });
    const execCommandMock = vi.fn().mockReturnValue(false);
    document.execCommand = execCommandMock;

    act(() => {
      root.render(<App />);
    });

    const copyBtn = container.querySelector('[data-testid="copy-link-btn"]') as HTMLButtonElement;
    await act(async () => {
      copyBtn.click();
    });

    expect(execCommandMock).toHaveBeenCalledWith('copy');
    expect(container.textContent).toContain('클립보드 복사에 실패했습니다. 브라우저 주소창의 링크를 복사해주세요.');
  });
});
