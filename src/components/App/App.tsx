import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MainPage } from "../../pages/mainPage/MainPage";
import { TokensPage } from "../../pages/tokensPage/TokensPage";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="/tokens" element={<TokensPage />} />
      </Routes>
      <Link to="/tokens">Tokens</Link>
    </BrowserRouter>
  );
};
