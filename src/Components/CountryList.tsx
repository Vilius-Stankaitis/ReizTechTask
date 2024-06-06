import useSWR from "swr";
import { COUNTRIES_URL } from "../common/constants";
import { CountryType } from "../common/types";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const CountryList = () => {
  const {
    data: countriesList,
    error,
    isLoading,
  } = useSWR(COUNTRIES_URL, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {countriesList.map((country: CountryType) => (
        <div key={country.name}>
          <h3>{country.name}</h3>
          <p>Region: {country.region}</p>
          {country.area && <p>Area: {country.area} km²</p>}
        </div>
      ))}
    </div>
  );
};

export default CountryList;
