import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./main/Main";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default Pages;
