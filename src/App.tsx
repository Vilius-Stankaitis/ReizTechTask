import { useEffect, useState } from "react";
import CountryList from "./Components/CountryList";
import Pagination from "./Components/Pagination";
import {
  COUNTRIES_SIZE_PER_PAGE,
  COUNTRIES_URL,
  LITHUANIA_AREA,
} from "./common/constants";
import useSWR from "swr";
import { CountryType, FilterType } from "./common/types";
import { Button } from "react-bootstrap";
import FilterModal from "./Components/FilterModal";

const byAscendingOrder = (countryA: CountryType, countryB: CountryType) =>
  countryA["name"].localeCompare(countryB["name"]);

const byDescendingOrder = (countryA: CountryType, countryB: CountryType) =>
  countryB["name"].localeCompare(countryA["name"]);

const byOceaniaRegion = (country: CountryType) => country.region === "Oceania";

const bySmallerThanLithuania = (country: CountryType) =>
  country.area <= LITHUANIA_AREA;

const fetcher = (url: string) => fetch(url).then((response) => response.json());

function App() {
  const [pageIndex, setPageIndex] = useState(1);
  const [modalState, toggleFilter] = useState(false);

  const [activeFilter, setFilter] = useState<FilterType>({
    id: 1,
    type: "radio",
    label: "Sort: in ascending order",
    sortBy: "ascending",
  });

  const {
    data: countriesList,
    error,
    isLoading,
  } = useSWR<CountryType[]>(COUNTRIES_URL, fetcher);

  const [filteredCountries, setFilteredCountries] = useState(countriesList);

  const orginizeCountriesList = () => {
    let newCountriesList;

    if (!countriesList?.length) return;

    if (activeFilter.sortBy === "ascending") {
      newCountriesList = [...countriesList].sort(byAscendingOrder);
      setFilteredCountries(newCountriesList);
      return;
    }

    if (activeFilter.sortBy === "descending") {
      newCountriesList = [...countriesList].sort(byDescendingOrder);
      setFilteredCountries(newCountriesList);
    }

    if (activeFilter.sortBy === "oceania") {
      newCountriesList = countriesList
        .filter(byOceaniaRegion)
        .sort(byAscendingOrder);
      setFilteredCountries(newCountriesList);
    }

    if (activeFilter.sortBy === "lt") {
      newCountriesList = countriesList
        .filter(bySmallerThanLithuania)
        .sort(byAscendingOrder);
      setFilteredCountries(newCountriesList);
    }
  };
  useEffect(orginizeCountriesList, [countriesList, activeFilter, setFilter]);

  if (isLoading) return <div className="center">Loading...</div>;

  if (error) return <div className="center">Error: {error.message}</div>;

  if (!countriesList?.length || !filteredCountries?.length)
    return <div className="center">No countries</div>;

  const startIndex = (pageIndex - 1) * COUNTRIES_SIZE_PER_PAGE;
  const endIndex = startIndex + COUNTRIES_SIZE_PER_PAGE;

  const totalPages = countriesList.length / COUNTRIES_SIZE_PER_PAGE;
  const filteredCountryList = filteredCountries.slice(startIndex, endIndex);

  return (
    <div className="App">
      <div className="header">
        <h4 className="title">Reiz Tech task</h4>
      </div>

      <div>
        <Button variant="outline" onClick={() => toggleFilter(!modalState)}>
          <p>{activeFilter.label}</p>
        </Button>
      </div>

      <div className="content">
        <CountryList countriesList={filteredCountryList} />

        <Pagination
          pageIndex={pageIndex}
          totalPages={totalPages}
          totalCountriesNumber={countriesList.length}
          onChangePage={setPageIndex}
        />
      </div>

      <FilterModal
        modalState={modalState}
        toggleFilter={toggleFilter}
        activeFilter={activeFilter}
        onChangeFilter={setFilter}
      />
    </div>
  );
}

export default App;
