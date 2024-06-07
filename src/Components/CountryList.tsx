import { CountryType } from "../common/types";
import CountryEntry from "./CountryEntry";

type CountryListProp = {
  countriesList: CountryType[];
};

const CountryList = ({ countriesList }: CountryListProp) => {
  return (
    <div>
      {countriesList.map((country: CountryType) => {
        const { name, region, area } = country;

        return <CountryEntry name={name} region={region} area={area} />;
      })}
    </div>
  );
};

export default CountryList;
