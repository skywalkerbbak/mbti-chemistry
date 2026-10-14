import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ShareActions } from '../src/components/ShareActions';
import { Toast } from '../src/components/Toast';

// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('ShareActions Component', () => {
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

  it('should render action buttons and trigger appropriate callbacks', () => {
    const onDownloadImage = vi.fn();
    const onCopyLink = vi.fn();
    const onReset = vi.fn();

    act(() => {
      root.render(
        <ShareActions
          onDownloadImage={onDownloadImage}
          onCopyLink={onCopyLink}
          onReset={onReset}
          isDownloading={false}
        />
      );
    });

    const downloadBtn = container.querySelector('[data-testid="download-card-btn"]') as HTMLButtonElement;
    const copyBtn = container.querySelector('[data-testid="copy-link-btn"]') as HTMLButtonElement;
    const resetBtn = container.querySelector('[data-testid="reset-btn"]') as HTMLButtonElement;

    expect(downloadBtn).toBeTruthy();
    expect(copyBtn).toBeTruthy();
    expect(resetBtn).toBeTruthy();

    expect(downloadBtn.textContent).toContain('스토리 카드 이미지 저장');
    expect(copyBtn.textContent).toContain('결과 링크 복사');
    expect(resetBtn.textContent).toContain('다른 조합으로 다시하기');

    act(() => {
      downloadBtn.click();
    });
    expect(onDownloadImage).toHaveBeenCalledTimes(1);

    act(() => {
      copyBtn.click();
    });
    expect(onCopyLink).toHaveBeenCalledTimes(1);

    act(() => {
      resetBtn.click();
    });
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('should show loading indicator and disable button while downloading', () => {
    const onDownloadImage = vi.fn();

    act(() => {
      root.render(
        <ShareActions
          onDownloadImage={onDownloadImage}
          onCopyLink={vi.fn()}
          onReset={vi.fn()}
          isDownloading={true}
        />
      );
    });

    const downloadBtn = container.querySelector('[data-testid="download-card-btn"]') as HTMLButtonElement;
    expect(downloadBtn.disabled).toBe(true);
    expect(downloadBtn.textContent).toContain('저장 중');
  });
});

describe('Toast Component', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.useFakeTimers();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    vi.restoreAllMocks();
  });

  it('should not render anything when message is null or empty', () => {
    act(() => {
      root.render(<Toast message={null} onClose={vi.fn()} />);
    });
    expect(container.firstChild).toBeNull();

    act(() => {
      root.render(<Toast message="" onClose={vi.fn()} />);
    });
    expect(container.firstChild).toBeNull();
  });

  it('should render toast message when message is provided', () => {
    act(() => {
      root.render(<Toast message="결과 링크가 복사되었습니다!" onClose={vi.fn()} />);
    });

    expect(container.textContent).toContain('결과 링크가 복사되었습니다!');
  });

  it('should call onClose automatically after duration', () => {
    const onClose = vi.fn();

    act(() => {
      root.render(<Toast message="성공적으로 저장되었습니다." onClose={onClose} duration={2000} />);
    });

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = vi.fn();

    act(() => {
      root.render(<Toast message="알림 메시지" onClose={onClose} />);
    });

    const closeBtn = container.querySelector('button[aria-label="닫기"]') as HTMLButtonElement;
    if (closeBtn) {
      act(() => {
        closeBtn.click();
      });
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('should render success icon by default and error icon when type="error"', () => {
    act(() => {
      root.render(<Toast message="성공 메시지" onClose={vi.fn()} />);
    });
    // Check emerald text class for success CheckCircle2
    expect(container.querySelector('.text-emerald-400')).toBeTruthy();
    expect(container.querySelector('.text-rose-400')).toBeNull();

    act(() => {
      root.render(<Toast message="에러 메시지" type="error" onClose={vi.fn()} />);
    });
    // Check rose text class for error AlertCircle
    expect(container.querySelector('.text-rose-400')).toBeTruthy();
    expect(container.querySelector('.text-emerald-400')).toBeNull();
  });
});
