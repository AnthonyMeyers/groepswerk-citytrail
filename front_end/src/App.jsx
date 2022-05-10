import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./style/App.scss";
import AppHeader from "./modules/standard_modules/App-header";
import AppNavbar from "./modules/standard_modules/App-navbar";
import AppFooter from "./modules/standard_modules/App-footer";
import AppHome from "./modules/page_modules/App-home";
import Routing from "./modules/router";
/*import { useGetAllLandenQuery } from "./data/landenApi";*/

export default function App() {
  return (
    <>
      <AppHeader></AppHeader>
      <main className="container">
        <Routing></Routing>
      </main>

      <AppFooter></AppFooter>
    </>
  );
}
