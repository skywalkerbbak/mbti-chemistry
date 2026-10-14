import React, { useEffect } from 'react';
import { X, Sparkles, AlertTriangle, ArrowRight, Trophy } from 'lucide-react';
import { MBTICode, MBTI_TYPES } from '../data/mbtiTypes';
import { getBestAndWorstMatches, MatchRankItem } from '../utils/chemistryCalculator';

export interface QuickBestWorstProps {
  mbti: MBTICode;
  isOpen: boolean;
  onClose: () => void;
  onSelectPartner: (partnerMbti: MBTICode) => void;
}

export const QuickBestWorst: React.FC<QuickBestWorstProps> = ({
  mbti,
  isOpen,
  onClose,
  onSelectPartner,
}) => {
  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const baseInfo = MBTI_TYPES[mbti];
  const { best, worst } = getBestAndWorstMatches(mbti);

  const handleSelect = (partnerMbti: MBTICode) => {
    onSelectPartner(partnerMbti);
    onClose();
  };

  const renderRankCard = (item: MatchRankItem, rank: number, type: 'best' | 'worst') => {
    const isBest = type === 'best';

    return (
      <div
        key={item.mbti}
        className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
          isBest
            ? 'bg-rose-50/60 border-rose-200/80 hover:border-rose-400 hover:shadow-sm'
            : 'bg-amber-50/60 border-amber-200/80 hover:border-amber-400 hover:shadow-sm'
        }`}
        data-testid={`quick-rank-card-${type}-${item.mbti}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${
                isBest
                  ? rank === 1
                    ? 'bg-rose-500 ring-2 ring-rose-200'
                    : rank === 2
                    ? 'bg-pink-500'
                    : 'bg-rose-400'
                  : rank === 1
                  ? 'bg-amber-600 ring-2 ring-amber-200'
                  : rank === 2
                  ? 'bg-amber-500'
                  : 'bg-yellow-500'
              }`}
            >
              {rank}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-gray-900 tracking-wide">
                  {item.mbti}
                </span>
                <span className="text-xs text-gray-600 font-medium truncate max-w-[120px] sm:max-w-none">
                  {item.info.nickname}
                </span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                {item.title}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span
              className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold ${
                isBest
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {item.score}점
            </span>
            <div className="text-[11px] text-gray-500 font-medium mt-0.5">
              {item.levelName}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleSelect(item.mbti)}
          className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            isBest
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm'
              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
          }`}
          data-testid={`select-partner-btn-${item.mbti}`}
        >
          <span>상대방으로 선택</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-pink-50/70 via-white to-indigo-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-indigo-500 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="quick-modal-title"
                className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-1.5"
              >
                <span>{mbti}</span>
                <span className="text-gray-500 text-xs sm:text-sm font-normal">
                  ({baseInfo.nickname})
                </span>
                <span className="text-gray-700">케미 랭킹</span>
              </h2>
              <p className="text-xs text-gray-500">
                나의 MBTI를 기준으로 본 가장 잘 맞는 짝꿍과 주의할 유형
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Best Matches */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-rose-100 text-rose-600">
                <Trophy className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-gray-900">
                환상의 짝꿍 TOP 3 (최고 케미)
              </h3>
              <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                High Chemistry
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {best.map((item, idx) => renderRankCard(item, idx + 1, 'best'))}
            </div>
          </div>

          {/* Worst Matches */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-gray-900">
                주의가 필요한 궁합 TOP 3 (극과 극 케미)
              </h3>
              <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Handle with Care
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {worst.map((item, idx) => renderRankCard(item, idx + 1, 'worst'))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>원하는 카드의 &apos;상대방으로 선택&apos;을 누르면 즉시 지정됩니다.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 font-medium hover:bg-gray-200/60 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickBestWorst;
