import React, { useState } from 'react';
import {
  Heart,
  Users,
  Sparkles,
  ArrowRightLeft,
  Check,
  Trophy,
  User,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';
import { MBTICode, MBTI_TYPES } from '../data/mbtiTypes';

export interface MatchSelectorProps {
  mode: 'love' | 'friend';
  onModeChange: (mode: 'love' | 'friend') => void;
  myMbti: MBTICode | null;
  onMyMbtiChange: (mbti: MBTICode) => void;
  partnerMbti: MBTICode | null;
  onPartnerMbtiChange: (mbti: MBTICode) => void;
  myName: string;
  onMyNameChange: (name: string) => void;
  partnerName: string;
  onPartnerNameChange: (name: string) => void;
  onSubmit: () => void;
  onOpenQuickView: (mbti: MBTICode) => void;
}

const MBTI_GROUPS: {
  key: string;
  name: string;
  badge: string;
  types: MBTICode[];
}[] = [
  {
    key: 'NT',
    name: '분석형 (NT)',
    badge: 'bg-purple-100 text-purple-700 border-purple-200',
    types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
  },
  {
    key: 'NF',
    name: '외교형 (NF)',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
  },
  {
    key: 'SJ',
    name: '관리자형 (SJ)',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
  },
  {
    key: 'SP',
    name: '탐험가형 (SP)',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
  },
];

export const MatchSelector: React.FC<MatchSelectorProps> = ({
  mode,
  onModeChange,
  myMbti,
  onMyMbtiChange,
  partnerMbti,
  onPartnerMbtiChange,
  myName,
  onMyNameChange,
  partnerName,
  onPartnerNameChange,
  onSubmit,
  onOpenQuickView,
}) => {
  const [activeTab, setActiveTab] = useState<'my' | 'partner'>('my');

  const isReady = myMbti !== null && partnerMbti !== null;

  const handleSwap = () => {
    if (myMbti && partnerMbti) {
      const prevMy = myMbti;
      const prevPartner = partnerMbti;
      const prevMyName = myName;
      const prevPartnerName = partnerName;

      onMyMbtiChange(prevPartner);
      onPartnerMbtiChange(prevMy);
      onMyNameChange(prevPartnerName);
      onPartnerNameChange(prevMyName);
    }
  };

  const renderMbtiGrid = (
    currentSelected: MBTICode | null,
    onSelect: (code: MBTICode) => void,
    side: 'my' | 'partner'
  ) => {
    const isMy = side === 'my';
    const activeBorder = isMy
      ? 'border-pink-500 bg-pink-50/80 text-pink-900 shadow-sm ring-2 ring-pink-400'
      : 'border-indigo-500 bg-indigo-50/80 text-indigo-900 shadow-sm ring-2 ring-indigo-400';

    return (
      <div className="space-y-4">
        {MBTI_GROUPS.map((group) => (
          <div key={group.key} className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${group.badge}`}
              >
                {group.name}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {group.types.map((code) => {
                const info = MBTI_TYPES[code];
                const isSelected = currentSelected === code;

                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onSelect(code)}
                    data-testid={`mbti-${side}-${code}`}
                    aria-pressed={isSelected}
                    className={`relative p-2.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between ${
                      isSelected
                        ? activeBorder
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/80 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-extrabold text-sm sm:text-base tracking-wide">
                        {code}
                      </span>
                      {isSelected && (
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] ${
                            isMy ? 'bg-pink-500' : 'bg-indigo-600'
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium truncate mt-0.5 w-full">
                      {info.nickname}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* 1. Mode Switcher */}
      <div className="bg-white p-2 rounded-2xl shadow-xs border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="grid grid-cols-2 p-1 bg-gray-100/80 rounded-xl w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onModeChange('love')}
            data-testid="mode-love-btn"
            className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
              mode === 'love'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Heart className={`w-4 h-4 ${mode === 'love' ? 'fill-white' : ''}`} />
            <span>💖 연인 케미</span>
          </button>
          <button
            type="button"
            onClick={() => onModeChange('friend')}
            data-testid="mode-friend-btn"
            className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
              mode === 'friend'
                ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>🤝 친구·동료 케미</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 px-3 py-1 font-medium text-center sm:text-right">
          {mode === 'love'
            ? '달콤한 연애 스타일과 데이트 꿀팁 분석'
            : '환상의 티키타카 & 소통 시너지 분석'}
        </p>
      </div>

      {/* 2. Names & Quick Swap */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative">
          <div>
            <label
              htmlFor="my-name-input"
              className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-pink-500" />
              <span>나의 이름 또는 별칭 (선택)</span>
            </label>
            <input
              id="my-name-input"
              type="text"
              value={myName}
              onChange={(e) => onMyNameChange(e.target.value)}
              placeholder="예: 민수, 나"
              maxLength={12}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="partner-name-input"
              className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-indigo-500" />
              <span>상대방 이름 또는 별칭 (선택)</span>
            </label>
            <input
              id="partner-name-input"
              type="text"
              value={partnerName}
              onChange={(e) => onPartnerNameChange(e.target.value)}
              placeholder="예: 지우, 그 사람"
              maxLength={12}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Selected Pair Summary Preview with Swap */}
        <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-700">선택 현황:</span>
            <span
              className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                myMbti
                  ? 'bg-pink-100 text-pink-800 border border-pink-200'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {myMbti ? `나: ${myMbti} (${MBTI_TYPES[myMbti].nickname})` : '나: 미선택'}
            </span>
            <span className="text-gray-400">✕</span>
            <span
              className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                partnerMbti
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {partnerMbti
                ? `상대: ${partnerMbti} (${MBTI_TYPES[partnerMbti].nickname})`
                : '상대: 미선택'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {myMbti && partnerMbti && (
              <button
                type="button"
                onClick={handleSwap}
                aria-label="MBTI 서로 바꾸기"
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>서로 맞바꾸기</span>
              </button>
            )}

            {myMbti && (
              <button
                type="button"
                onClick={() => onOpenQuickView(myMbti)}
                data-testid="open-quick-view-btn"
                className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
              >
                <Trophy className="w-3.5 h-3.5 text-rose-500" />
                <span>내 MBTI 최고/최악 궁합 보기</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. MBTI Selector Grid with Tabs */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xs border border-gray-100 space-y-5">
        {/* Step Header & Side Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              {activeTab === 'my' ? '1단계: 나의 MBTI 선택' : '2단계: 상대방 MBTI 선택'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {activeTab === 'my'
                ? '본인의 MBTI를 아래에서 클릭해주세요.'
                : '궁합을 맞춰볼 상대방의 MBTI를 선택해주세요.'}
            </p>
          </div>

          <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('my')}
              data-testid="tab-my-mbti"
              className={`py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'my'
                  ? 'bg-white text-pink-600 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span>나의 MBTI</span>
              {myMbti && (
                <span className="text-[10px] bg-pink-100 text-pink-700 px-1.5 py-0.2 rounded font-extrabold">
                  {myMbti}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('partner')}
              data-testid="tab-partner-mbti"
              className={`py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'partner'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span>상대방 MBTI</span>
              {partnerMbti && (
                <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded font-extrabold">
                  {partnerMbti}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MBTI Grid Display */}
        {activeTab === 'my' ? (
          <div>
            {renderMbtiGrid(myMbti, (code) => {
              onMyMbtiChange(code);
              // auto advance to partner tab if partner not chosen yet
              if (!partnerMbti) {
                setActiveTab('partner');
              }
            }, 'my')}
          </div>
        ) : (
          <div>
            {renderMbtiGrid(partnerMbti, (code) => {
              onPartnerMbtiChange(code);
            }, 'partner')}
          </div>
        )}

        {/* Tab navigation footer */}
        <div className="flex items-center justify-between pt-2">
          {activeTab === 'my' ? (
            <div className="text-xs text-gray-500">
              {myMbti
                ? `선택 완료: ${myMbti} - 상대방 탭으로 이동하세요.`
                : '나의 MBTI를 먼저 선택해주세요.'}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab('my')}
              className="text-xs font-semibold text-gray-500 hover:text-gray-800"
            >
              ← 나의 MBTI 다시 선택하기
            </button>
          )}

          {activeTab === 'my' && (
            <button
              type="button"
              onClick={() => setActiveTab('partner')}
              className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1"
            >
              <span>상대방 MBTI 선택하러 가기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4. Submit CTA Section */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isReady}
          data-testid="submit-chemistry-btn"
          className={`w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
            isReady
              ? mode === 'love'
                ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-200 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                : 'bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-indigo-200 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>
            {mode === 'love'
              ? '두 사람의 연인 케미 분석하기 💖'
              : '두 사람의 친구·동료 케미 분석하기 🤝'}
          </span>
        </button>

        {/* Validation / Guidance Text */}
        <div className="text-center">
          {!isReady ? (
            <p className="text-xs font-medium text-rose-500">
              {!myMbti && !partnerMbti
                ? '⚠️ 나와 상대방의 MBTI를 모두 선택해주세요.'
                : !myMbti
                ? '⚠️ 나의 MBTI를 선택해주세요.'
                : '⚠️ 상대방의 MBTI를 선택해주세요.'}
            </p>
          ) : (
            <p className="text-xs font-medium text-gray-500">
              ✨ 두 사람의 MBTI가 모두 준비되었습니다! 버튼을 눌러 상세 분석을 확인하세요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchSelector;
