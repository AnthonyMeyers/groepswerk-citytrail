import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

export default function AppNavbar() {
  const [topbar, setTopbar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollBar);
    return () => window.removeEventListener("scroll", handleScrollBar);
  }, []);
  function handleScrollBar() {
    window.scrollY > 47.5 ? setTopbar(true) : setTopbar(false);
  }

  return (
    <>
      <div className={topbar ? "scroll-container topbar" : "scroll-container"}>
        <ul className="navbar">
          <li className="navbar__listitem">
            <NavLink to={"/home"} className="navbar__listitem__link">
              Home
            </NavLink>
          </li>
          <li className="navbar__listitem">
            <NavLink to={"/zoek"} className="navbar__listitem__link">
              Zoek
            </NavLink>
          </li>
          <li className="navbar__listitem">
            <NavLink to={"/register"} className="navbar__listitem__link">
              Register
            </NavLink>
          </li>
          <li className="navbar__listitem">
            <NavLink to={"/team"} className="navbar__listitem__link">
              Team
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
