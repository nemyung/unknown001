import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import Detail from "./detail/Detail";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:id" element={<Detail />} />
    </Routes>
  );
}

export default Pages;
