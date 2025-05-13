import { words } from "./Words";

export const newWord = () => {
  const randomIndex = Math.round(Math.random() * words.length);
  return words[randomIndex];
};
export function getFarewellText(language) {
  const options = [
    `Farewell, ${language}`,
    `Adios, ${language}`,
    `R.I.P., ${language}`,
    `we'll miss you, ${language}`,
    `Oh no, not ${language}`,
    `${language} bites the dust`,
    `Gone but not forgotten, ${language}`,
    `The end of ${language} as we know it`,
    `Off into the sunset, ${language}`,
    `${language}, it's been real`,
    `${language}, your watch has ended`,
    `${language} has left the building`,
  ];
  const randomIndex = Math.round(Math.random() * options.length);
  return options[randomIndex];
}
