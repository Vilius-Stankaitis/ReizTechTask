import { Ruler, MapPin } from "lucide-react";
import { CountryType } from "../../common/types";

import "./styles.css";

const CountryEntry = ({ name, region, area }: CountryType) => {
  return (
    <div key={name} className="country-entry">
      <div className="country-wrapper">
        <h6>{name}</h6>

        <div className="country-metadata">
          <div>
            <MapPin color="#737373" />
            <p>Region: {region}</p>
          </div>

          {area && (
            <div>
              <Ruler color="#737373" />
              <p className="area">Area: {area} km²</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryEntry;
