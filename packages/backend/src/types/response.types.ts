import { Country } from "./country.types";

export type GetCountriesResponseType = {
	error: boolean;
	msg: string;
	data: Country[];
};
