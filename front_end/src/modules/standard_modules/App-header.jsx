import { useState } from "react";
import AppNavbar from "./App-navbar";

export default function AppHeader() {
  const [menu, setMenu] = useState(false);

  const handleMobileClick = () => {
    setMenu(!menu);
  };

  const handleListitemClick = () => {
    setMenu(false);
  };
  return (
    <>
      <header className="header">
        <img src="/fs_anthonym/groepswerk/images/old_ruins.jpg" className="header__img" />
        <h1 className="header__title">Citytrail</h1>

        <a
          onClick={handleMobileClick}
          className={
            menu ? "header__mobile header__mobile-active" : "header__mobile "
          }
        ></a>
      </header>
      <AppNavbar
        className={menu ? "" : "mobile"}
        onClickItem={handleListitemClick}
      />
    </>
  );
}
