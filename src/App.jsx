import React, { useState } from "react";
import logo from "./logo.svg";
import "./style/App.scss";
import AppHeader from "./modules/App-header";
import AppNavbar from "./modules/App-navbar";
import AppFooter from "./modules/App-footer";
import AppHome from "./modules/App-home";

export default class App extends React.Component {
  render() {
    return (
      <>
        <AppHeader></AppHeader>
        <AppNavbar></AppNavbar>
        <AppHome></AppHome>
        <AppFooter></AppFooter>
      </>
    );
  }
}
