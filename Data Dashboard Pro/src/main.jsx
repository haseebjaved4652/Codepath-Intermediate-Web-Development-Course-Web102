import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CharacterDetail from "../Components/CharacterDetail";
import "./index.css";
import Layout from "../routes/Layout";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        {/* ... other routes */}
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
