import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

export default function AppNavbar({ className, onClickItem }) {
  function handleGeneralClick(e) {
    console.log(e);
  }
  return (
    <>
      <div
        id="navbar"
        className={
          className === "mobile"
            ? "scroll-container hidden"
            : "scroll-container"
        }
      >
        <ul className="navbar">
          <li className="navbar__listitem">
            <NavLink
              to={"/home"}
              onClick={onClickItem}
              className="navbar__listitem__link"
            >
              Home
            </NavLink>
          </li>
          <li className="navbar__listitem">
            <NavLink
              to={"/zoek"}
              onClick={onClickItem}
              className="navbar__listitem__link"
            >
              Zoek
            </NavLink>
          </li>
          <li className="navbar__listitem">
            <NavLink
              to={"/admin"}
              onClick={onClickItem}
              className="navbar__listitem__link"
            >
              admin
            </NavLink>
          </li>
          <li className="navbar__listitem">
            <NavLink
              to={"/team"}
              onClick={onClickItem}
              className="navbar__listitem__link"
            >
              Team
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

/*
  useEffect(() => {
    window.addEventListener("scroll", handleScrollBar);
    return () => window.removeEventListener("scroll", handleScrollBar);
  }, []);
  function handleScrollBar() {
    window.scrollY > 47.5 ? setTopbar(true) : setTopbar(false);
  }
*/
