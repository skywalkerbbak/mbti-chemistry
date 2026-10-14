import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { downloadElementAsImage } from '../src/utils/imageExporter';
import * as htmlToImage from 'html-to-image';

vi.mock('html-to-image', () => ({
  toPng: vi.fn(),
}));

describe('imageExporter utility', () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement('div');
    element.innerHTML = '<span>Test Card</span>';
    document.body.appendChild(element);
    vi.clearAllMocks();
  });

  afterEach(() => {
    element.remove();
  });

  it('should successfully export element to PNG and trigger download', async () => {
    const mockDataUrl = 'data:image/png;base64,fakeimagecontent';
    vi.mocked(htmlToImage.toPng).mockResolvedValue(mockDataUrl);

    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    const success = await downloadElementAsImage(element, 'custom-result.png');

    expect(htmlToImage.toPng).toHaveBeenCalledWith(
      element,
      expect.objectContaining({
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      })
    );
    expect(clickSpy).toHaveBeenCalled();
    expect(success).toBe(true);

    clickSpy.mockRestore();
  });

  it('should automatically append .png extension if omitted', async () => {
    const mockDataUrl = 'data:image/png;base64,fakeimagecontent';
    vi.mocked(htmlToImage.toPng).mockResolvedValue(mockDataUrl);

    let createdDownload = '';
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const el = originalCreateElement(tagName);
      if (tagName === 'a') {
        const anchor = el as HTMLAnchorElement;
        const originalClick = anchor.click.bind(anchor);
        anchor.click = () => {
          createdDownload = anchor.download;
          originalClick();
        };
      }
      return el;
    });

    const success = await downloadElementAsImage(element, 'my-card');

    expect(success).toBe(true);
    expect(createdDownload).toBe('my-card.png');

    vi.restoreAllMocks();
  });

  it('should return false and not throw when html-to-image fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(htmlToImage.toPng).mockRejectedValue(new Error('Canvas tainted'));

    const success = await downloadElementAsImage(element);

    expect(success).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should return false when element is null or undefined', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // @ts-ignore
    const success = await downloadElementAsImage(null);

    expect(success).toBe(false);
    consoleErrorSpy.mockRestore();
  });
});
