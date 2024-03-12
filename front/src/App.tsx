import React from "react";
import { Routes, Route } from "react-router-dom";
import Card from "./components/card/Card";
import TopicBox from "./components/topic/TopicBox";

function App() {
  return (
    <>
      <div>Hello HyoDokebi</div>
      <Card />
      <TopicBox />
    </>
  );
}

export default App;
