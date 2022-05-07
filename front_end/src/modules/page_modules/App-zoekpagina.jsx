import { getDataRecords } from "../hooks/api_calls";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Card from "./subcomp_zoek/Card";
import { useEffect, useContext } from "react";
import { AdminContext } from "../../Provider";

export default function AppZoek() {
  const [countries, error, loading] = getDataRecords(
    `http://localhost:8080/api.php/records/gw2_land`
  );

  const { admin } = useContext(AdminContext);

  useEffect(() => {}, [countries]);
  return (
    <>
      <section className="search">
        <h2 className="search__title">Landen</h2>
        {admin && (
          <div className="admin">
            <button className="admin__button">Land toevoegen</button>
          </div>
        )}
        {error && <h3 className="error">Geen data gevonden</h3>}
        {loading && <h3 className="loading">Landen aan het laden</h3>}
        {countries.length > 0 && (
          <ul className="search__list">
            {countries.length > 0 &&
              countries.map((country, i) => {
                return (
                  <li className="search__list__item" key={country.lan_id}>
                    <NavLink to={`/land/${country.lan_id}`}>
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
