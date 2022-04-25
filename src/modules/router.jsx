import React from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import AppHome from "./page_modules/App-home";
import AppRegister from "./page_modules/App-register";
import AppTeam from "./page_modules/App-team";
import AppZoek from "./page_modules/App-zoekpagina";
import AppNavbar from "./standard_modules/App-navbar";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<AppRegister />} />
        <Route path="/zoek" element={<AppZoek />} />
        <Route path="/home" element={<AppHome />} />
        <Route path="/team" element={<AppTeam />} />
        <Route exact path="/" element={<AppHome />} />
      </Routes>
    </>
  );
}
