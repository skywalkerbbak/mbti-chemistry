import React, { useState, useEffect, useRef } from 'react';
import { ALL_MBTI_CODES, MBTICode } from './data/mbtiTypes';
import { calculateChemistry, RelationMode } from './utils/chemistryCalculator';
import { downloadElementAsImage } from './utils/imageExporter';
import { Header } from './components/Header';
import { MatchSelector } from './components/MatchSelector';
import { ReportCard } from './components/ReportCard';
import { ShareActions } from './components/ShareActions';
import { QuickBestWorst } from './components/QuickBestWorst';
import { Toast } from './components/Toast';

export function parseUrlParams() {
  if (typeof window === 'undefined') {
    return {
      mode: 'love' as RelationMode,
      myMbti: null as MBTICode | null,
      partnerMbti: null as MBTICode | null,
      myName: '',
      partnerName: '',
      step: 'input' as 'input' | 'result',
    };
  }

  const params = new URLSearchParams(window.location.search);
  const m1 = params.get('m1')?.toUpperCase() as MBTICode | undefined;
  const m2 = params.get('m2')?.toUpperCase() as MBTICode | undefined;
  const modeParam = params.get('mode');
  const n1 = params.get('n1') || '';
  const n2 = params.get('n2') || '';

  const isValidM1 = Boolean(m1 && ALL_MBTI_CODES.includes(m1));
  const isValidM2 = Boolean(m2 && ALL_MBTI_CODES.includes(m2));
  const mode: RelationMode = modeParam === 'friend' ? 'friend' : 'love';

  if (isValidM1 && isValidM2) {
    return {
      mode,
      myMbti: m1 as MBTICode,
      partnerMbti: m2 as MBTICode,
      myName: n1,
      partnerName: n2,
      step: 'result' as const,
    };
  }

  return {
    mode,
    myMbti: isValidM1 ? (m1 as MBTICode) : null,
    partnerMbti: isValidM2 ? (m2 as MBTICode) : null,
    myName: n1,
    partnerName: n2,
    step: 'input' as const,
  };
}

export const App: React.FC = () => {
  const [initial] = useState(() => parseUrlParams());

  const [mode, setMode] = useState<RelationMode>(initial.mode);
  const [myMbti, setMyMbti] = useState<MBTICode | null>(initial.myMbti);
  const [partnerMbti, setPartnerMbti] = useState<MBTICode | null>(initial.partnerMbti);
  const [myName, setMyName] = useState<string>(initial.myName);
  const [partnerName, setPartnerName] = useState<string>(initial.partnerName);
  const [step, setStep] = useState<'input' | 'result'>(initial.step);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [quickViewMbti, setQuickViewMbti] = useState<MBTICode | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  // Sync state when browser navigation occurs
  useEffect(() => {
    const handlePopState = () => {
      const state = parseUrlParams();
      setMode(state.mode);
      setMyMbti(state.myMbti);
      setPartnerMbti(state.partnerMbti);
      setMyName(state.myName);
      setPartnerName(state.partnerName);
      setStep(state.step);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSubmit = () => {
    if (!myMbti || !partnerMbti) return;

    const params = new URLSearchParams();
    params.set('m1', myMbti);
    params.set('m2', partnerMbti);
    params.set('mode', mode);
    if (myName.trim()) params.set('n1', myName.trim());
    if (partnerName.trim()) params.set('n2', partnerName.trim());

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, '', newUrl);
    setStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep('input');
    window.history.pushState(null, '', window.location.pathname);
  };

  const handleCopyLink = async () => {
    let shareUrl = window.location.href;
    if (myMbti && partnerMbti) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('m1', myMbti);
        url.searchParams.set('m2', partnerMbti);
        url.searchParams.set('mode', mode);
        if (myName.trim()) {
          url.searchParams.set('n1', myName.trim());
        } else {
          url.searchParams.delete('n1');
        }
        if (partnerName.trim()) {
          url.searchParams.set('n2', partnerName.trim());
        } else {
          url.searchParams.delete('n2');
        }
        shareUrl = url.toString();
      } catch {
        // Fallback to current URL if URL parsing fails
        shareUrl = window.location.href;
      }
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setToastMessage('결과 링크가 복사되었습니다! 친구에게 공유해보세요 💌');
    } catch {
      setToastMessage('결과 링크가 복사되었습니다! 친구에게 공유해보세요 💌');
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const filename = `${myMbti || 'MBTI'}_${partnerMbti || 'MBTI'}_케미카드.png`;
      const success = await downloadElementAsImage(cardRef.current, filename);
      if (success) {
        setToastMessage('스토리 카드 이미지가 저장되었습니다! 📸');
      } else {
        setToastMessage('이미지 저장에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Failed to download image:', error);
      setToastMessage('이미지 저장 중 오류가 발생했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };

  const chemistryResult =
    myMbti && partnerMbti ? calculateChemistry(myMbti, partnerMbti, mode) : null;

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-500 ${
        mode === 'love'
          ? 'bg-gradient-to-br from-pink-50/70 via-rose-50/40 to-indigo-50/50'
          : 'bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-teal-50/50'
      }`}
    >
      <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center flex-1">
        <Header mode={mode} />

        <main className="w-full mt-4 flex flex-col items-center">
          {step === 'result' && chemistryResult ? (
            <div className="w-full flex flex-col items-center gap-6">
              <ReportCard
                result={chemistryResult}
                myName={myName}
                partnerName={partnerName}
                cardRef={cardRef}
              />
              <ShareActions
                onDownloadImage={handleDownloadImage}
                onCopyLink={handleCopyLink}
                onReset={handleReset}
                isDownloading={isDownloading}
              />
            </div>
          ) : (
            <MatchSelector
              mode={mode}
              onModeChange={setMode}
              myMbti={myMbti}
              onMyMbtiChange={setMyMbti}
              partnerMbti={partnerMbti}
              onPartnerMbtiChange={setPartnerMbti}
              myName={myName}
              onMyNameChange={setMyName}
              partnerName={partnerName}
              onPartnerNameChange={setPartnerName}
              onSubmit={handleSubmit}
              onOpenQuickView={(mbti) => setQuickViewMbti(mbti)}
            />
          )}
        </main>
      </div>

      <footer className="w-full text-center py-6 text-xs text-gray-400 font-medium">
        © 2026 MBTI 케미스트리 · 16x16 전 조합 정밀 분석
      </footer>

      {quickViewMbti && (
        <QuickBestWorst
          mbti={quickViewMbti}
          isOpen={Boolean(quickViewMbti)}
          onClose={() => setQuickViewMbti(null)}
          onSelectPartner={(partner) => {
            setPartnerMbti(partner);
            setQuickViewMbti(null);
          }}
        />
      )}

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default App;
