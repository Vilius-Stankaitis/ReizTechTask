import { useState } from "react";
import CountryList from "./Components/CountryList";
import Pagination from "./Components/Pagination";
import { COUNTRIES_SIZE_PER_PAGE, COUNTRIES_URL } from "./common/constants";
import useSWR from "swr";
import { CountryType } from "./common/types";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

function App() {
  const [pageIndex, setPageIndex] = useState(1);

  const {
    data: countriesList,
    error,
    isLoading,
  } = useSWR<CountryType[]>(COUNTRIES_URL, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!countriesList?.length) return <div>No countries</div>;

  const startIndex = (pageIndex - 1) * COUNTRIES_SIZE_PER_PAGE;
  const endIndex = startIndex + COUNTRIES_SIZE_PER_PAGE;

  const totalPages = countriesList.length / COUNTRIES_SIZE_PER_PAGE;

  const filteredCountryList = countriesList.slice(startIndex, endIndex);

  return (
    <div className="App">
      <h1>Reiz Tech task</h1>

      <CountryList countriesList={filteredCountryList} />

      <Pagination
        pageIndex={pageIndex}
        totalPages={totalPages}
        totalCountriesNumber={countriesList.length}
        onChangePage={setPageIndex}
      />
    </div>
  );
}

export default App;
