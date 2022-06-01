import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

export default function AppNavbar({ className, onClickItem }) {
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
              to={"fs_anthonym/groepswerk/home"}
              onClick={onClickItem}
              className="navbar__listitem__link"
            >
              Home
            </NavLink>
          </li>
          <li className="navbar__listitem">
            <NavLink
              to={"fs_anthonym/groepswerk/landen"}
              onClick={onClickItem}
              className="navbar__listitem__link"
            >
              landen
            </NavLink>
          </li>
          <li className="navbar__listitem">
            <NavLink
              to={"fs_anthonym/groepswerk/admin"}
              onClick={onClickItem}
              className="navbar__listitem__link"
            >
              admin
            </NavLink>
          </li>
          <li className="navbar__listitem">
            <NavLink
              to={"fs_anthonym/groepswerk/team"}
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
