import React from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import AppHome from "./page_modules/App-home";
import AppAdmin from "./page_modules/App-admin";
import AppTeam from "./page_modules/App-team";
import AppZoek from "./page_modules/App-zoekpagina";
import AppNavbar from "./standard_modules/App-navbar";
import AppDetail from "./page_modules/App-details";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AppAdmin />} />
        <Route path="/landen" element={<AppZoek />} />
        <Route exact path="/landen/detail/:id" element={<AppDetail />} />
        <Route path="/home" element={<AppHome />} />
        <Route path="/team" element={<AppTeam />} />
        <Route exact path="/" element={<AppHome />} />
      </Routes>
    </>
  );
}
