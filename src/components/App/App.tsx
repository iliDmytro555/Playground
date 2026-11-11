import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Parallax } from "../Parallax/Parallax";
import { TokenStorage } from "../TokenStorage/TokenStorage";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Parallax />} />
        <Route path="/tokens" element={<TokenStorage />} />
      </Routes>
      <Link to="/tokens">Tokens</Link>
    </BrowserRouter>
  );
};
