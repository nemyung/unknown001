import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { Main, Detail } from ".";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:id" element={<Detail />} />
    </Routes>
  );
}

export default Pages;
