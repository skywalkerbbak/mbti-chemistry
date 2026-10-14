import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Header } from '../src/components/Header';
import { MatchSelector, MatchSelectorProps } from '../src/components/MatchSelector';
import { QuickBestWorst } from '../src/components/QuickBestWorst';

// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const setNativeInputValue = (input: HTMLInputElement, value: string) => {
  const nativeSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  )?.set;
  nativeSetter?.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
};

describe('Task 3: Selection & Interaction Components', () => {
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

  describe('Header Component', () => {
    it('should render header branding and title properly in love mode', () => {
      act(() => {
        root.render(<Header mode="love" />);
      });

      expect(container.textContent).toContain('MBTI 케미스트리');
      expect(container.textContent).toContain('연인 케미 모드');
      expect(container.textContent).toContain('설렘 지수');
    });

    it('should adapt slogan and badge when in friend mode', () => {
      act(() => {
        root.render(<Header mode="friend" />);
      });

      expect(container.textContent).toContain('MBTI 케미스트리');
      expect(container.textContent).toContain('친구·동료 모드');
      expect(container.textContent).toContain('소통 궁합');
    });

    it('should switch headline gradient depending on mode', () => {
      act(() => {
        root.render(<Header mode="friend" />);
      });
      const h1Friend = container.querySelector('h1');
      expect(h1Friend?.className).toContain('from-indigo-600 via-blue-600 to-teal-600');

      act(() => {
        root.render(<Header mode="love" />);
      });
      const h1Love = container.querySelector('h1');
      expect(h1Love?.className).toContain('from-pink-600 via-rose-500 to-indigo-600');
    });
  });

  describe('MatchSelector Component', () => {
    const defaultProps: MatchSelectorProps = {
      mode: 'love',
      onModeChange: vi.fn(),
      myMbti: null,
      onMyMbtiChange: vi.fn(),
      partnerMbti: null,
      onPartnerMbtiChange: vi.fn(),
      myName: '',
      onMyNameChange: vi.fn(),
      partnerName: '',
      onPartnerNameChange: vi.fn(),
      onSubmit: vi.fn(),
      onOpenQuickView: vi.fn(),
    };

    it('should toggle between love and friend mode', () => {
      const onModeChange = vi.fn();
      act(() => {
        root.render(<MatchSelector {...defaultProps} onModeChange={onModeChange} />);
      });

      const friendBtn = container.querySelector('[data-testid="mode-friend-btn"]') as HTMLButtonElement;
      expect(friendBtn).toBeTruthy();

      act(() => {
        friendBtn.click();
      });

      expect(onModeChange).toHaveBeenCalledWith('friend');
    });

    it('should handle name input changes', () => {
      const onMyNameChange = vi.fn();
      const onPartnerNameChange = vi.fn();

      act(() => {
        root.render(
          <MatchSelector
            {...defaultProps}
            onMyNameChange={onMyNameChange}
            onPartnerNameChange={onPartnerNameChange}
          />
        );
      });

      const myNameInput = container.querySelector('#my-name-input') as HTMLInputElement;
      const partnerNameInput = container.querySelector('#partner-name-input') as HTMLInputElement;

      expect(myNameInput).toBeTruthy();
      expect(partnerNameInput).toBeTruthy();

      act(() => {
        setNativeInputValue(myNameInput, '철수');
      });
      expect(onMyNameChange).toHaveBeenCalledWith('철수');

      act(() => {
        setNativeInputValue(partnerNameInput, '영희');
      });
      expect(onPartnerNameChange).toHaveBeenCalledWith('영희');
    });

    it('should select MBTI for user and auto-advance to partner selection', () => {
      const onMyMbtiChange = vi.fn();

      act(() => {
        root.render(
          <MatchSelector
            {...defaultProps}
            myMbti={null}
            partnerMbti={null}
            onMyMbtiChange={onMyMbtiChange}
          />
        );
      });

      const infpBtn = container.querySelector('[data-testid="mbti-my-INFP"]') as HTMLButtonElement;
      expect(infpBtn).toBeTruthy();

      act(() => {
        infpBtn.click();
      });

      expect(onMyMbtiChange).toHaveBeenCalledWith('INFP');
    });

    it('should show quick view button when myMbti is selected and call onOpenQuickView', () => {
      const onOpenQuickView = vi.fn();

      act(() => {
        root.render(
          <MatchSelector
            {...defaultProps}
            myMbti="ENFP"
            onOpenQuickView={onOpenQuickView}
          />
        );
      });

      const quickBtn = container.querySelector('[data-testid="open-quick-view-btn"]') as HTMLButtonElement;
      expect(quickBtn).toBeTruthy();

      act(() => {
        quickBtn.click();
      });

      expect(onOpenQuickView).toHaveBeenCalledWith('ENFP');
    });

    it('should disable submit button when both MBTIs are not selected', () => {
      const onSubmit = vi.fn();

      act(() => {
        root.render(
          <MatchSelector
            {...defaultProps}
            myMbti="INFP"
            partnerMbti={null}
            onSubmit={onSubmit}
          />
        );
      });

      const submitBtn = container.querySelector('[data-testid="submit-chemistry-btn"]') as HTMLButtonElement;
      expect(submitBtn.disabled).toBe(true);
      expect(container.textContent).toContain('상대방의 MBTI를 선택해주세요');

      act(() => {
        submitBtn.click();
      });
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should enable submit button and call onSubmit when both MBTIs are selected', () => {
      const onSubmit = vi.fn();

      act(() => {
        root.render(
          <MatchSelector
            {...defaultProps}
            myMbti="INFP"
            partnerMbti="ENFJ"
            onSubmit={onSubmit}
          />
        );
      });

      const submitBtn = container.querySelector('[data-testid="submit-chemistry-btn"]') as HTMLButtonElement;
      expect(submitBtn.disabled).toBe(false);

      act(() => {
        submitBtn.click();
      });
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should switch between tabs and select partner MBTI', () => {
      const onPartnerMbtiChange = vi.fn();

      act(() => {
        root.render(
          <MatchSelector
            {...defaultProps}
            myMbti="INTJ"
            partnerMbti={null}
            onPartnerMbtiChange={onPartnerMbtiChange}
          />
        );
      });

      const partnerTab = container.querySelector('[data-testid="tab-partner-mbti"]') as HTMLButtonElement;
      act(() => {
        partnerTab.click();
      });

      const enfpPartnerBtn = container.querySelector('[data-testid="mbti-partner-ENFP"]') as HTMLButtonElement;
      expect(enfpPartnerBtn).toBeTruthy();

      act(() => {
        enfpPartnerBtn.click();
      });
      expect(onPartnerMbtiChange).toHaveBeenCalledWith('ENFP');
    });
  });

  describe('QuickBestWorst Component', () => {
    it('should return null if isOpen is false', () => {
      act(() => {
        root.render(
          <QuickBestWorst
            mbti="INFP"
            isOpen={false}
            onClose={vi.fn()}
            onSelectPartner={vi.fn()}
          />
        );
      });

      expect(container.firstChild).toBeNull();
    });

    it('should render modal with TOP 3 best and worst cards when open', () => {
      act(() => {
        root.render(
          <QuickBestWorst
            mbti="INFP"
            isOpen={true}
            onClose={vi.fn()}
            onSelectPartner={vi.fn()}
          />
        );
      });

      expect(container.textContent).toContain('INFP');
      expect(container.textContent).toContain('환상의 짝꿍 TOP 3');
      expect(container.textContent).toContain('주의가 필요한 궁합 TOP 3');

      // Check best and worst cards exist
      const bestCards = container.querySelectorAll('[data-testid^="quick-rank-card-best-"]');
      const worstCards = container.querySelectorAll('[data-testid^="quick-rank-card-worst-"]');

      expect(bestCards.length).toBe(3);
      expect(worstCards.length).toBe(3);
    });

    it('should call onClose when clicking close button or backdrop', () => {
      const onClose = vi.fn();

      act(() => {
        root.render(
          <QuickBestWorst
            mbti="INFP"
            isOpen={true}
            onClose={onClose}
            onSelectPartner={vi.fn()}
          />
        );
      });

      const closeBtn = container.querySelector('button[aria-label="닫기"]') as HTMLButtonElement;
      expect(closeBtn).toBeTruthy();

      act(() => {
        closeBtn.click();
      });

      expect(onClose).toHaveBeenCalledTimes(1);

      // Backdrop click
      const backdrop = container.querySelector('[role="dialog"]') as HTMLDivElement;
      act(() => {
        backdrop.click();
      });
      expect(onClose).toHaveBeenCalledTimes(2);
    });

    it('should call onSelectPartner and onClose when partner select button is clicked', () => {
      const onClose = vi.fn();
      const onSelectPartner = vi.fn();

      act(() => {
        root.render(
          <QuickBestWorst
            mbti="INFP"
            isOpen={true}
            onClose={onClose}
            onSelectPartner={onSelectPartner}
          />
        );
      });

      const partnerBtn = container.querySelector('[data-testid^="select-partner-btn-"]') as HTMLButtonElement;
      expect(partnerBtn).toBeTruthy();

      act(() => {
        partnerBtn.click();
      });

      expect(onSelectPartner).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should handle Escape key to close modal', () => {
      const onClose = vi.fn();

      act(() => {
        root.render(
          <QuickBestWorst
            mbti="INFP"
            isOpen={true}
            onClose={onClose}
            onSelectPartner={vi.fn()}
          />
        );
      });

      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
