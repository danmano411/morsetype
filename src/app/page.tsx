'use client';

import { useState } from 'react';
import Header from '../components/Header';
import TypingTest from '../components/TypingTest';

export default function Home() {
  const [mode, setMode] = useState<'morse-to-alphabet' | 'alphabet-to-morse'>('morse-to-alphabet');
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen h-screen w-screen bg-red-500 flex flex-col justify-normal">
      <Header mode={mode} setMode={setMode} score={score}/>
      <div className="h-full">
        <TypingTest mode={mode} setScore={setScore}/>
      </div>
    </div>
  );
}
