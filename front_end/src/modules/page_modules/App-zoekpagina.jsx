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
    `http://127.0.0.1:8000/api/gw2_lands.json`
  );
  console.log(countries);
  return (
    <>
      <section className="search">
        <h2 className="search__title">Landen</h2>
        {error && <h3>Geen data gevonden</h3>}
        {loading && <h3>Landen aan het laden</h3>}
        {countries.length > 0 && (
          <ul className="search__list">
            {countries.length > 0 &&
              countries.map((country, i) => {
                return (
                  <li className="search__list__item" key={country.lanId}>
                    <NavLink to={`/landen/detail/${country.lanId}`}>
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
