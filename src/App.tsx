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
import DogCard from "./components/DogCard";
import { SearchDogsOptions } from "./types/SearchDogsOptions";

function App() {
  const [dogs, setDogs] = useState<Dog[]>(); // result from get dogs, for display
  const [options, setOptions] = useState<SearchDogsOptions>({}); // dog search options, updated by filters
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nextPageQuery, setNextPageQuery] = useState<string | null>(null);
  const [prevPageQuery, setPrevPageQuery] = useState<string | null>(null);

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

      setDogs(fetchResult);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  

  useEffect(() => {
    checkAuth().then(() => loadDogs());
    // loadDogs();
  }, [options]);

  if (isLoading) return <Loading />;

  return isAuthenticated ? (
    <>
      <h1>Find Your Best Friend</h1>
      <Search />
      <div>
        {/* hold controls for age min, age max, breeds, zip code */}
        Search controls
      </div>
      <div>
        {/* Holds controls which  */}
        Sort controls to change how dogs is sorted
      </div>
      {/* Display dogs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dogs && dogs.map((dog) => <DogCard key={dog.id} dog={dog} />)}
      </div>
      <div className="flex justify-between mt-4">
        <button
          disabled={!prevPageQuery}
          onClick={() => prevPageQuery && loadDogs(prevPageQuery)}
        >
          Previous
        </button>
        <button
          disabled={!nextPageQuery}
          onClick={() => nextPageQuery && loadDogs(nextPageQuery)}
        >
          Next
        </button>
      </div>
    </>
  ) : (
    <Login doLogin={doLogin} />
  );
}

export default App;
