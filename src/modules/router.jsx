import React from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import AppHome from "./App-home";
import AppRegister from "./App-register";
import AppTeam from "./App-team";
import AppZoek from "./App-zoekpagina";
import AppNavbar from "./App-navbar";

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
