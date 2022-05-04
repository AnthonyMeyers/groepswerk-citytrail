import getData from "../hooks/api_calls";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import Card from "./subcomp_zoek/Card";

export default function AppZoek() {
  const [countries, error, loading] = getData(
    `http://localhost:8000/api/read.php`
  );

  return (
    <>
      <section className="search">
        <h2 className="search__title">Landen</h2>
        {countries.length > 0 && (
          <ul className="search__list">
            {countries.length > 0 &&
              countries.map((country, i) => {
                return (
                  <li className="search__list__item" key={i}>
                    <NavLink to={`/landen/detail/${country.lan_id}`}>
                      <Card country={country} />
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        )}
      </section>
    </>
  );
}
