import { Country, GetCountriesResponseType, SelectedCountry } from "../types";

export const fetchCountriesWithCapitals = async (): Promise<
  Country[] | null
> => {
  try {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/capital"
    );

    const parsed: GetCountriesResponseType = await res.json();

    const { error, data, msg } = parsed;

    if (error && !data) {
      throw new Error(msg);
    }

    return data.filter((country) => country.capital); // Ensure that countries have capitals.
  } catch (error) {
    console.log("[fetchCountriesWithCapitals] " + error);
    return null;
  }
};

/**
 * Generates an array of quiz answers containing one correct answer and two incorrect answers.
 * @param data - An array of countries to choose answers from.
 * @returns An array of SelectedCountry representing the quiz answers, or undefined if data is empty.
 */

export const generateQuizOptions = (
  data: Country[]
): SelectedCountry[] | undefined => {
  if (data.length === 0) {
    // No data, something went wrong.
    return undefined;
  }

  const countries: SelectedCountry[] = [];

  const selectedIndex = Math.floor(Math.random() * data.length); // Pick a random index based of off data length.

  if (!data[selectedIndex].capital) {
    console.log(
      `[generateQuizOptions] Country ${data[selectedIndex].capital} does not have a capital. Skipping.`
    );
    return undefined;
  }

  const chosen: SelectedCountry = {
    country: data[selectedIndex].name,
    capital: data[selectedIndex].capital,
  };

  countries.push(chosen);

  for (let i = 0; i < 2; i++) {
    let incorrectIndex = Math.floor(Math.random() * data.length);

    do {
      // This is to always ensure that the correct answer does not appear twice.
      console.log(
        "[generateQuizOptions] incorrectIndex is the same as selectedIndex! Reselecting an incorrect answer!"
      );
      incorrectIndex = Math.floor(Math.random() * data.length);
    } while (incorrectIndex === selectedIndex);

    const incorrect: SelectedCountry = {
      country: data[incorrectIndex].name,
      capital: data[incorrectIndex].capital,
    };

    countries.push(incorrect);
  }

  return countries;
};
