import axios from 'axios';
import { Country, GetCountriesResponseType, SelectedCountry } from '../types';

/**
 * Fetches the countries from the countries API and filters out any without capital cities.
 */
export const fetchCountriesWithCapitals = async (): Promise<Country[] | null> => {
  try {
    const res = await axios.get('https://countriesnow.space/api/v0.1/countries/capital');

    const { data } = res;

    const parsed: GetCountriesResponseType = data;

    return parsed.data.filter((country) => country.capital); // Ensure that countries have capitals.
  } catch (error) {
    console.log('[fetchCountriesWithCapitals] ' + error);
    return null;
  }
};

/**
 * Generates an array of quiz answers containing one correct answer and two incorrect answers.
 * @param data - An array of countries to choose answers from.
 * @returns An array of SelectedCountry representing the quiz answers, or undefined if data is empty.
 */

export const generateQuizOptions = (data: Country[]): SelectedCountry[] | undefined => {
  if (data.length === 0) {
    // No data, something went wrong.
    return undefined;
  }

  const countries: SelectedCountry[] = [];

  const selectedIndex = Math.floor(Math.random() * data.length); // Pick a random index based of off data length.

  if (!data[selectedIndex].capital) {
    console.log(`[generateQuizOptions] Country ${data[selectedIndex].capital} does not have a capital. Skipping.`);
    return undefined;
  }

  const chosen: SelectedCountry = {
    country: data[selectedIndex].name,
    capital: data[selectedIndex].capital,
  };

  countries.push(chosen);

  const incorrectOptions = generateIncorrectOptions(selectedIndex, data);

  countries.push(...incorrectOptions);

  return countries;
};

/**
 * Generates the incorrect options for the answers array.
 * Requires: to be used with the ... spread operator.
 * @returns SelectedCountry[]
 */
export function generateIncorrectOptions(selectedIndex: number, data: Country[]): SelectedCountry[] {
  const incorrectOptions: SelectedCountry[] = [];

  for (let i = 0; i < 2; i++) {
    let otherOptionsIndex; // Does not need to be initialized here, as gets initialized within the do while

    do {
      otherOptionsIndex = Math.floor(Math.random() * data.length);
      if (otherOptionsIndex === selectedIndex) {
        // Prints only if the above is the same as the selectedIndex.
        console.log(
          '[generateQuizOptions] incorrectIndex is the same as selectedIndex! Reselecting an incorrect answer!'
        );
      }
    } while (otherOptionsIndex === selectedIndex);

    const incorrectOption: SelectedCountry = {
      country: data[otherOptionsIndex].name,
      capital: data[otherOptionsIndex].capital,
    };

    incorrectOptions.push(incorrectOption);
  }

  return incorrectOptions;
}
