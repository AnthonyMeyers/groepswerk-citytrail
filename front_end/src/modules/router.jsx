import React from "react";
import { Route, Routes } from "react-router-dom";
import AppHome from "./page_modules/App-home";
import AppAdmin from "./page_modules/App-admin";
import AppTeam from "./page_modules/App-team";
import AppZoek from "./page_modules/App-zoekpagina";

import AppDetail from "./page_modules/App-details";
import AppStadDetail from "./page_modules/App-StadDetail";
import AppNotFound from "./page_modules/App-NotFound";

export default function Routing() {

  //Regelt alle routes in combinatie met navlink voor een vloeiende gebruikservaring
  return (
    <>
      <Routes>
        <Route exact path="fs_anthonym/groepswerk/admin" element={<AppAdmin />} />
        <Route exact path="fs_anthonym/groepswerk/landen" element={<AppZoek />} />
        <Route exact path="fs_anthonym/groepswerk/land/:id" element={<AppDetail />} />
        <Route
          exact
          path="fs_anthonym/groepswerk/land/:id/stad/:stadId"
          element={<AppStadDetail />}
        />
        <Route exact path="fs_anthonym/groepswerk/home" element={<AppHome />} />
        <Route exact path="fs_anthonym/groepswerk/team" element={<AppTeam />} />
        <Route exact path="fs_anthonym/groepswerk/" element={<AppHome />} />
        <Route path="fs_anthonym/groepswerk/*" element={<AppNotFound />} />
      </Routes>
    </>
  );
}
