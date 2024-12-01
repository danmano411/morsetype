"use client";

import React, { useState, useEffect } from "react";
import { morseToAlphabet, alphabetToMorse } from "../utils/morseMap";

interface TypingTestProps {
  mode: "morse-to-alphabet" | "alphabet-to-morse";
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const TypingTest: React.FC<TypingTestProps> = ({ mode, setScore }) => {
    // rest delay in miliseconds
    const delay:number = 1000;
    const [currentPrompt, setCurrentPrompt] = useState("");
    const [userInput, setUserInput] = useState("");
    const [inputIsFocused, setInputIsFocused] = useState(false);
    const [canType, setCanType] = useState(true);
    const [checkState, setCheckState] = useState<"neutral" | "right" | "wrong">("neutral");

    //   const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    resetGame();
  }, [mode]);

  //   useEffect(() => {
  //     if (timeLeft > 0) {
  //       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  //       return () => clearTimeout(timer);
  //     }
  //   }, [timeLeft]);

  onkeydown = (key: {code: string}) => {
    if (key.code === "Enter" && inputIsFocused && canType) {
        setCanType(false);
        if (userInput === "") {
            setCheckState("wrong");
            setUserInput(" ");
            setTimeout(() => {
                setCanType(true);
                resetGame();
                setCheckState("neutral");
            }, delay);
            return;
        }

        if (mode === "morse-to-alphabet") {
            if (morseToAlphabet[currentPrompt] === userInput.toLowerCase()) {
                setScore(oldScore => oldScore + 1);
                setCheckState("right");
            } else {
                setScore(oldScore => oldScore - 1);
                setCheckState("wrong");
            }
        } 
        else if (mode === "alphabet-to-morse") {
            if (alphabetToMorse[currentPrompt.toLowerCase()] === userInput){
                setScore(oldScore => oldScore + 1);
                setCheckState("right");
            } else {
                setScore(oldScore => oldScore - 1);
                setCheckState("wrong");
            }
        }
        setTimeout(() => {
            setCanType(true);
            resetGame();
            setCheckState("neutral");
        }, delay);
    }
  }

  const resetGame = () => {
    // Generate a new prompt
    if (mode === "morse-to-alphabet") {
        const morseKeys = Object.keys(morseToAlphabet);
        setCurrentPrompt(morseKeys[Math.floor(Math.random() * morseKeys.length)]);
    } 
    else {
        const alphabetKeys = Object.keys(alphabetToMorse);
        setCurrentPrompt(
            alphabetKeys[Math.floor(Math.random() * alphabetKeys.length)]
        );
    }

    setUserInput("");
  }

  const filterInput = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (mode === "morse-to-alphabet") {
        setUserInput(e.target.value.toLowerCase())
    } else {
        if (e.target.value.length > 0) {
            if (e.target.value.slice(-1) === "." || e.target.value.slice(-1) === "-") {
                setUserInput(e.target.value);
            }
            else if (e.target.value.slice(-1) === "/" || e.target.value.slice(-1) === "k") {
                setUserInput(e.target.value.slice(0, -1)+"-");
            } 
            else if (e.target.value.slice(-1) === "j" || e.target.value.slice(-1) === "0" ) {
                setUserInput(e.target.value.slice(0, -1)+".");
            }
        }

        if (e.target.value === "") {
            setUserInput("");
        }
    }
  }

  return (
    <div className="flex flex-col items-center p-4 bg-orange-400 h-full justify-center">
      <div className="text-6xl font-bold w-full h-full flex flex-row justify-center items-center px-10">
        {mode === "morse-to-alphabet"
          ? currentPrompt
          : currentPrompt.toUpperCase()}
      </div>

      <div className="w-full h-full flex flex-col justify-start items-center text-4xl gap-2">
        <input
            className={`border-2 border-gray-300 rounded p-2 mt-4 ${
            checkState === "right"
                ? "bg-green-500"
                : checkState === "wrong"
                ? "bg-red-500"
                : "bg-white"
            } `}
            value={userInput}
            onChange={canType ? e => filterInput(e) : undefined}
            // disabled={timeLeft === 0}
            placeholder={
            mode === "morse-to-alphabet"
                ? "Enter a letter"
                : "Enter morse code"
            }
            onFocus={() => setInputIsFocused(true)}
            onBlur={() => setInputIsFocused(false)}
        />
        <h1>
            {checkState === "right"
            ? "Correct! "
            : checkState === "wrong"
            ? "Incorrect! "
            : ""}
            {   
                (checkState === "wrong" || checkState === "right") &&
                mode === "morse-to-alphabet" ?
                `The answer was "${morseToAlphabet[currentPrompt]}"` :
                (checkState === "wrong" || checkState === "right") &&
                mode === "alphabet-to-morse" &&
                `The answer was "${alphabetToMorse[currentPrompt.toLowerCase()]}"`
            }
        </h1>
      </div>
    </div>
  );
};

export default TypingTest;
