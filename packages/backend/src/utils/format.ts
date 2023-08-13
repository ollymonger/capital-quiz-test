import { Capital, SelectedCountry } from '../types';

/**
 * Shuffles the elements of an array using the Fisher-Yates shuffle algorithm.
 * @param array - The array to be shuffled.
 * @returns A new array containing shuffled elements.
 */
function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

/**
 * Formats the SelectedCountry array, by shuffling and returning only the capitals!
 * @param options
 * @returns Capital[]
 */
export const format = (options: SelectedCountry[]): Capital[] => {
  const capitals = shuffle(options.map(({ capital }) => ({ capital })));
  return capitals;
};
