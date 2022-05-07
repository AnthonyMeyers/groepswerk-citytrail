import React from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import AppHome from "./page_modules/App-home";
import AppAdmin from "./page_modules/App-admin";
import AppTeam from "./page_modules/App-team";
import AppZoek from "./page_modules/App-zoekpagina";
import AppNavbar from "./standard_modules/App-navbar";
import AppDetail from "./page_modules/App-details";
import AppStadDetail from "./page_modules/App-StadDetail";
import AppNotFound from "./page_modules/App-NotFound";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route exact path="/admin" element={<AppAdmin />} />
        <Route exact path="/landen" element={<AppZoek />} />
        <Route exact path="/land/:id" element={<AppDetail />} />
        <Route
          exact
          path="/land/:id/stad/:stadId"
          element={<AppStadDetail />}
        />

        <Route exact path="/home" element={<AppHome />} />
        <Route exact path="/team" element={<AppTeam />} />
        <Route exact path="/" element={<AppHome />} />
        <Route path="*" element={<AppNotFound />} />
      </Routes>
    </>
  );
}
