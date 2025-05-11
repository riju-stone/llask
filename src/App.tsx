import { useState } from "react";
import "./App.css";
import ResponseComponent from "./components/response/response";
import SearchComponent from "./components/search/search";

function App()
{
  const [search, setSearching] = useState(false)
  return <div className="appWrapper">
    <SearchComponent searching={search} setSearching={setSearching} />
    <ResponseComponent searching={search} />
  </div>;
}

export default App;
