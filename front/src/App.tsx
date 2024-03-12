import React from "react";
import { Routes, Route } from "react-router-dom";
import Input from "./components/common/Input";

function App() {
  return (
    <div>
      <Input
        id="nickname"
        label="닉네임"
        placeholder="영문 대소문자, 한글, 숫자 2글자 이상 10글자 이하"
      />
    </div>
  );
}

export default App;
