import React from 'react';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold text-pink-600 tracking-tight sm:text-4xl">
          💖 MBTI 케미스트리
        </h1>
        <p className="mt-2 text-base text-gray-600">
          우리 궁합은 몇 점일까? 두 사람의 MBTI를 선택하고 특별한 케미를 확인해보세요!
        </p>
      </header>
    </div>
  );
};

export default App;
