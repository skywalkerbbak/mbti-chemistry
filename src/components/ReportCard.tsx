import React from 'react';
import { ChemistryResult } from '../utils/chemistryCalculator';
import { Sparkles, Heart, Zap, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';

export interface ReportCardProps {
  result: ChemistryResult;
  myName?: string;
  partnerName?: string;
  cardRef?: React.RefObject<HTMLDivElement | null> | React.RefObject<HTMLDivElement>;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  result,
  myName = '',
  partnerName = '',
  cardRef,
}) => {
  const displayName1 = myName.trim() || '나';
  const displayName2 = partnerName.trim() || '상대방';

  // Level badge theme helper
  const getLevelBadgeClasses = (level: number) => {
    switch (level) {
      case 5:
        return 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-500/20';
      case 4:
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/20';
      case 3:
        return 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-blue-500/20';
      case 2:
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/20';
      default:
        return 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-rose-500/20';
    }
  };

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      data-testid="report-card"
      className="w-full max-w-md mx-auto bg-gradient-to-b from-white via-pink-50/25 to-purple-50/35 rounded-3xl p-6 sm:p-7 shadow-xl border border-pink-100/90 relative overflow-hidden text-gray-800"
    >
      {/* Top Tag & Mode Badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700 border border-pink-200">
          {result.mode === 'love' ? (
            <>
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>연인 케미 리포트</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>친구·동료 케미 리포트</span>
            </>
          )}
        </div>
        <span className="text-[11px] font-medium text-gray-400">
          MBTI CHEMISTRY REPORT
        </span>
      </div>

      {/* Profile Comparison Header */}
      <div className="grid grid-cols-5 items-center justify-between gap-2 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-100/70 shadow-sm mb-5">
        {/* Person 1 */}
        <div className="col-span-2 flex flex-col items-center text-center">
          <span className="text-xs font-medium text-gray-500 mb-1 max-w-[100px] truncate" title={displayName1}>
            {displayName1}
          </span>
          <span className="text-xl font-black text-gray-900 tracking-tight">
            {result.m1}
          </span>
          <span className="text-[11px] text-gray-500 mt-0.5 max-w-[105px] truncate">
            {result.m1Info.nickname}
          </span>
        </div>

        {/* Center Heart / Sparkle */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center shadow-inner">
            {result.mode === 'love' ? (
              <Heart className="w-5 h-5 text-pink-500 fill-pink-400 animate-pulse" />
            ) : (
              <Sparkles className="w-5 h-5 text-purple-500" />
            )}
          </div>
        </div>

        {/* Person 2 */}
        <div className="col-span-2 flex flex-col items-center text-center">
          <span className="text-xs font-medium text-gray-500 mb-1 max-w-[100px] truncate" title={displayName2}>
            {displayName2}
          </span>
          <span className="text-xl font-black text-gray-900 tracking-tight">
            {result.m2}
          </span>
          <span className="text-[11px] text-gray-500 mt-0.5 max-w-[105px] truncate">
            {result.m2Info.nickname}
          </span>
        </div>
      </div>

      {/* Relationship Title Banner */}
      <div className="text-center px-3 py-3 mb-5 rounded-2xl bg-gradient-to-r from-pink-50/70 via-purple-50/70 to-pink-50/70 border border-pink-100">
        <h2 className="text-base font-bold text-gray-900 tracking-tight leading-snug">
          &ldquo;{result.title}&rdquo;
        </h2>
      </div>

      {/* Score Gauge & 5-Level Badge */}
      <div className="bg-white/90 rounded-2xl p-4 sm:p-5 border border-pink-100/70 shadow-sm mb-5 text-center">
        <div className="mb-2.5 text-center">
          <span className={`px-3.5 py-1 rounded-full text-xs font-bold shadow-sm inline-block ${getLevelBadgeClasses(result.level)}`}>
            {result.levelName}
          </span>
        </div>

        <div className="flex items-baseline justify-center gap-1 my-2">
          <span className="text-5xl font-black bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
            {result.score}
          </span>
          <span className="text-lg font-bold text-gray-400">/ 100점</span>
        </div>

        {/* Progress Gauge */}
        <div className="w-full bg-gray-100 rounded-full h-3.5 p-0.5 border border-gray-200/80 overflow-hidden mt-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 transition-all duration-700"
            style={{ width: `${Math.min(100, Math.max(0, result.score))}%` }}
          />
        </div>
      </div>

      {/* 3 Main Analysis Sections */}
      <div className="space-y-3.5 mb-6">
        {/* 1. 🌟 환상의 시너지 */}
        <div className="rounded-2xl p-4 bg-emerald-50/60 border border-emerald-100/90 text-left">
          <div className="flex items-center gap-2 mb-2 font-bold text-sm text-emerald-800">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>🌟 환상의 시너지</span>
          </div>
          <ul className="space-y-1.5 pl-0.5">
            {result.synergy.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. ⚡ 주의할 갈등 포인트 */}
        <div className="rounded-2xl p-4 bg-amber-50/60 border border-amber-100/90 text-left">
          <div className="flex items-center gap-2 mb-2 font-bold text-sm text-amber-800">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>⚡ 주의할 갈등 포인트</span>
          </div>
          <ul className="space-y-1.5 pl-0.5">
            {result.caution.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. 💡 특급 솔루션 처방 */}
        <div className="rounded-2xl p-4 bg-indigo-50/70 border border-indigo-100/90 text-left">
          <div className="flex items-center gap-2 mb-2 font-bold text-sm text-indigo-900">
            <Lightbulb className="w-4 h-4 text-indigo-600" />
            <span>💡 특급 솔루션 처방</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pl-0.5">
            {result.tip}
          </p>
        </div>
      </div>

      {/* Bottom Watermark Branding */}
      <div className="pt-3 border-t border-pink-100/80 text-center flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        <span className="font-semibold text-gray-500">MBTI 케미스트리</span>
        <span className="text-gray-300">|</span>
        <span>우리만의 특별한 궁합 리포트</span>
      </div>
    </div>
  );
};

export default ReportCard;
