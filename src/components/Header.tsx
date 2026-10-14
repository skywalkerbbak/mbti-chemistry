import React from 'react';
import { Heart, Sparkles, Users } from 'lucide-react';

export interface HeaderProps {
  mode?: 'love' | 'friend';
}

export const Header: React.FC<HeaderProps> = ({ mode = 'love' }) => {
  return (
    <header className="w-full text-center py-6 sm:py-8 px-4">
      {/* Brand Badge */}
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm mb-4 transition-colors duration-300 backdrop-blur-sm ${
          mode === 'love'
            ? 'bg-white/80 border border-pink-200/60 text-pink-700'
            : 'bg-white/80 border border-indigo-200/60 text-indigo-700'
        }`}
      >
        <Sparkles
          className={`w-3.5 h-3.5 animate-pulse ${
            mode === 'love' ? 'text-pink-500' : 'text-indigo-500'
          }`}
        />
        <span>16 x 16 정밀 매트릭스 256 케미 분석</span>
        <span
          className={`w-1 h-1 rounded-full ${
            mode === 'love' ? 'bg-pink-400' : 'bg-indigo-400'
          }`}
        />
        <span className="text-gray-500 font-normal">
          {mode === 'love' ? '연인 케미 모드' : '친구·동료 모드'}
        </span>
      </div>

      {/* Main Headline */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
        <div
          className={`p-2 sm:p-2.5 rounded-2xl text-white shadow-md ${
            mode === 'love'
              ? 'bg-gradient-to-tr from-pink-500 to-rose-400 shadow-pink-200'
              : 'bg-gradient-to-tr from-indigo-500 to-blue-500 shadow-indigo-200'
          }`}
        >
          {mode === 'love' ? (
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-white/90" />
          ) : (
            <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          )}
        </div>
        <h1
          className={`text-2xl sm:text-4xl font-black tracking-tight bg-gradient-to-r ${
            mode === 'friend'
              ? 'from-indigo-600 via-blue-600 to-teal-600'
              : 'from-pink-600 via-rose-500 to-indigo-600'
          } bg-clip-text text-transparent`}
        >
          MBTI 케미스트리
        </h1>
      </div>

      {/* Slogan & Subtitle */}
      <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-600 mt-2 font-medium leading-relaxed">
        {mode === 'love' ? (
          <>
            두 사람만의 숨겨진 <span className="text-pink-600 font-semibold">설렘 지수</span>와{' '}
            <span className="text-indigo-600 font-semibold">연애 시너지</span>를 과학적으로 분석해보세요.
          </>
        ) : (
          <>
            티키타카 <span className="text-indigo-600 font-semibold">소통 궁합</span>과{' '}
            <span className="text-teal-600 font-semibold">협업 시너지</span>로 더 끈끈한 관계를 만들어보세요.
          </>
        )}
      </p>

      {/* Feature Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-gray-500">
        <span className="px-2.5 py-0.5 rounded-md bg-gray-100/90 text-gray-700 font-medium">
          💖 연인 & 🤝 친구 모드
        </span>
        <span className="px-2.5 py-0.5 rounded-md bg-gray-100/90 text-gray-700 font-medium">
          📊 5단계 궁합 레벨
        </span>
        <span className="px-2.5 py-0.5 rounded-md bg-gray-100/90 text-gray-700 font-medium">
          💡 맞춤 시너지 & 주의 팁
        </span>
      </div>
    </header>
  );
};

export default Header;
