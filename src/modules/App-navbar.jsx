import React, { useEffect, useState } from "react";
import { from, fromEvent } from "rxjs";
import { map, throttleTime } from "rxjs/operators";

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
    <div className={topbar ? "scroll-container topbar" : "scroll-container"}>
      <div className="container">
        <ul className="navbar">
          <li className="navbar__listitem">
            <a className="navbar__listitem__link" href="index.html">
              Home
            </a>
          </li>
          <li className="navbar__listitem">
            <a className="navbar__listitem__link" href="index.html">
              Zoekpagina
            </a>
          </li>
          <li className="navbar__listitem">
            <a className="navbar__listitem__link" href="index.html">
              Register
            </a>
          </li>
          <li className="navbar__listitem">
            <a className="navbar__listitem__link" href="index.html">
              Team
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
