import React from 'react';
import { Download, Copy, RotateCcw, Loader2 } from 'lucide-react';

export interface ShareActionsProps {
  onDownloadImage: () => Promise<void> | void;
  onCopyLink: () => void;
  onReset: () => void;
  isDownloading?: boolean;
}

export const ShareActions: React.FC<ShareActionsProps> = ({
  onDownloadImage,
  onCopyLink,
  onReset,
  isDownloading = false,
}) => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2">
      {/* 1. 이미지 저장 버튼 */}
      <button
        type="button"
        data-testid="download-card-btn"
        onClick={onDownloadImage}
        disabled={isDownloading}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm transition-all shadow-md active:scale-95 ${
          isDownloading
            ? 'bg-pink-300 text-white cursor-not-allowed opacity-90'
            : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-500/25 hover:shadow-lg'
        }`}
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>이미지 저장 중...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>🖼️ 스토리 카드 이미지 저장</span>
          </>
        )}
      </button>

      {/* 2. 링크 복사 버튼 */}
      <button
        type="button"
        data-testid="copy-link-btn"
        onClick={onCopyLink}
        className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-200/90 shadow-sm hover:shadow transition-all active:scale-95"
      >
        <Copy className="w-4 h-4 text-gray-500" />
        <span>🔗 결과 링크 복사</span>
      </button>

      {/* 3. 다시하기 버튼 */}
      <button
        type="button"
        data-testid="reset-btn"
        onClick={onReset}
        className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm bg-white hover:bg-gray-50 text-gray-600 border border-gray-200/90 shadow-sm hover:shadow transition-all active:scale-95"
      >
        <RotateCcw className="w-4 h-4 text-gray-500" />
        <span>🔄 다른 조합으로 다시하기</span>
      </button>
    </div>
  );
};

export default ShareActions;
