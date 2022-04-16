import React from "react";

export default class AppNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleScrollEvent() {
    console.log("hi");
  }
  render() {
    return (
      <div className="scroll-container" onScroll={this.handleScrollEvent}>
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
    );
  }
}
