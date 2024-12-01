export const morseToAlphabet: { [key: string]: string } = {
  '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd', '.': 'e',
  '..-.': 'f', '--.': 'g', '....': 'h', '..': 'i', '.---': 'j',
  '-.-': 'k', '.-..': 'l', '--': 'm', '-.': 'n', '---': 'o',
  '.--.': 'p', '--.-': 'q', '.-.': 'r', '...': 's', '-': 't',
  '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x', '-.--': 'y',
  '--..': 'z'
};

export const morseToAlphaNumeric: { [key: string]: string } = {
  ...morseToAlphabet,
  '.----': '1', '..---': '2', '...--': '3',
  '....-': '4', '.....': '5', '-....': '6', '--...': '7',
  '---..': '8', '----.': '9', '-----': '0'
};

export const alphabetToMorse = Object.fromEntries(
  Object.entries(morseToAlphabet).map(([key, value]) => [value, key])
);

export const alphaNumericToMorse = Object.fromEntries(
  Object.entries(morseToAlphaNumeric).map(([key, value]) => [value, key])
);