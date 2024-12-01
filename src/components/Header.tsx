'use client'

import React from 'react';
import { Button } from '@mui/material';

interface HeaderProps {
    mode: "morse-to-alphabet" | "alphabet-to-morse";
    setMode: React.Dispatch<React.SetStateAction<"morse-to-alphabet" | "alphabet-to-morse">>;
    score: number;
}

const Header:React.FC<HeaderProps> = ({
    mode,
    setMode,
    score
}) => {
    return (
        <div className="p-4 bg-gray-800 text-white grid grid-cols-3 justify-center items-center">
            <h1 className="text-4xl font-bold">MorseType</h1>
            <div className="font-semibold flex flex-row w-full justify-center text-2xl">Score: {score}</div>
            <div className='flex flex-row gap-2 justify-end'>
                <button
                    className={`p-3 h-fit text-2xl ${mode === 'morse-to-alphabet' ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
                    onClick={() => setMode('morse-to-alphabet')}
                >
                    Morse-to-Alphabet
                </button>
                <button
                    className={`p-3 h-fit text-2xl ${mode === 'alphabet-to-morse' ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
                    onClick={() => setMode('alphabet-to-morse')}
                >
                    Alphabet-to-Morse
                </button>
            </div>
        </div>
    )
  
};

export default Header;
