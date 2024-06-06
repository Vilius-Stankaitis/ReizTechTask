import { CountryType } from "../common/types";

type CountryListProp = {
  countriesList: CountryType[];
};

const CountryList = ({ countriesList }: CountryListProp) => {
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
