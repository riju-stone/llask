import { useState } from "react";
import "./App.css";
import ResponseComponent from "./components/response/response";
import SearchComponent from "./components/search/search";

function App() {
  const [mode, setMode] = useState("off");
  const [model, setModel] = useState("gpt-3.5-turbo");

  return <div className="appWrapper">
    <SearchComponent mode={mode} setMode={setMode} currModel={model} />
    <ResponseComponent mode={mode} setModel={setModel} />
  </div>;
}

export default App;
