import { toPng } from 'html-to-image';

/**
 * Downloads a DOM element as a high-resolution PNG image.
 * Uses html-to-image with pixelRatio: 2 and high quality.
 *
 * @param element The HTML element to capture.
 * @param filename The name of the downloaded file. Defaults to 'mbti-chemistry-card.png'.
 * @returns Promise<boolean> True if download succeeded, false otherwise.
 */
export async function downloadElementAsImage(
  element: HTMLElement,
  filename: string = 'mbti-chemistry-card.png'
): Promise<boolean> {
  if (!element) {
    console.error('downloadElementAsImage: No element provided for capture.');
    return false;
  }

  try {
    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
    });

    const finalFilename = filename.toLowerCase().endsWith('.png')
      ? filename
      : `${filename}.png`;

    const downloadLink = document.createElement('a');
    downloadLink.download = finalFilename;
    downloadLink.href = dataUrl;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    return true;
  } catch (error) {
    console.error('downloadElementAsImage: Failed to capture element as image:', error);
    return false;
  }
}
