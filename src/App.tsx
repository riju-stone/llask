import "./App.css";
import ResponseComponent from "./components/response/response";
import SearchComponent from "./components/search/search";

function App() {
  return <div className="appWrapper">
    <SearchComponent />
    <ResponseComponent />
  </div>;
}

export default App;
