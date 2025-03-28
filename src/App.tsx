import { useEffect, useState } from "react";
import "./App.css";
import Search from "@/components/Search";
import Login from "@/components/Login";
import searchDogs from "@/api/searchDogs";
import fetchDogs from "@/api//fetchDogs";
import { Dog } from "@/types/Dog";
import authCheck from "@/api/authCheck";
import { LoginFormData } from "@/types/LoginFormData";
import authenticate from "@/api/authenticate";
import Loading from "./components/Loading";

import { SearchDogsOptions } from "./types/SearchDogsOptions";
import PageControls from "./components/PageControls";
import { SortField, SortOrder } from "./types/Sort";
import DogList from "./components/DogList";
import SortControls from "./components/SortControls";

function App() {
  const [dogs, setDogs] = useState<Dog[] | null>(null); // result from get dogs, for display
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nextPageQuery, setNextPageQuery] = useState<string | null>(null);
  const [prevPageQuery, setPrevPageQuery] = useState<string | null>(null);

  const [sortField, setSortField] = useState<SortField>("breed");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [options, setOptions] = useState<SearchDogsOptions>({
    sortField: 'breed',
    sortOrder: 'asc' // defaults to breed, asc
  }); // dog search options, updated by filters

  const doLogin = async (loginFormData: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authenticate(loginFormData);
      setIsAuthenticated(response);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const result = await authCheck();
      setIsAuthenticated(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDogs = async (query?: string) => {
    setIsLoading(true);
    try {
      const searchResult = await searchDogs(query ?? undefined, options);
      console.log("searchres", searchResult);
      const { resultIds, next, prev } = searchResult;
      setNextPageQuery(next);
      setPrevPageQuery(prev);

      const fetchResult = await fetchDogs([...resultIds]);
      console.log("fetchResult", fetchResult);
      if (!fetchResult) setDogs(null);
      setDogs(fetchResult);
    } catch (error) {
      console.log(error);
      setDogs(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth().then(() => loadDogs());
    // loadDogs();
  }, [options]);

  const handleSortOrder = (order: SortOrder) => {
    setSortOrder(order);
    setOptions((prev) => ({ ...prev, sortOrder: order }));
  };
  const handleSortField = (field: SortField) => {
    setSortField(field)
    setOptions((prev) => ({ ...prev, sortField: field }));
  };

  if (isLoading) return <Loading />;

  return isAuthenticated ? (
    <>
      <h1>Find Your Best Friend</h1>
      <Search />
      <div>
        {/* hold controls for age min, age max, breeds, zip code */}
        Search controls
        <SortControls
          handleSortOrder={handleSortOrder}
          handleSortField={handleSortField}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      </div>
      {/* Holds controls for sorting dogs  */}

      {/* Display dogs */}
      <DogList dogs={dogs} />
      {/* Pagination controls */}
      <PageControls
        nextPageQuery={nextPageQuery}
        prevPageQuery={prevPageQuery}
        loadDogs={loadDogs}
      />
    </>
  ) : (
    <Login doLogin={doLogin} />
  );
}

export default App;
