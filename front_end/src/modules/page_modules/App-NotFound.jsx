import React, { useEffect, useState } from "react";
import { getData, getDataRecords } from "../hooks/api_calls";
import { NavLink } from "react-router-dom";
import CountryCard from "./subcomp_zoek/Card";

const AppNotFound = () => {
  const [country, setCountry] = useState(null);

  const [countries, error, loading] = getDataRecords(
    "http://localhost:8080/api.php/records/gw2_land"
  );
  useEffect(() => {
    setCountry(countries[parseInt(Math.random() * countries.length, 10)]);
  }, [countries]);
  return (
    <>
      <section className="notfound">
        <h2 className="notfound__title">Missing & found</h2>
        <article>
          <h3>Beste bezoeker</h3>
          <p>Het lijkt er op dat U op een verkeerde pagina bent beland.</p>
          <p>Mogen wij U eventueel een land voorstellen?</p>
          {loading && (
            <p className="loading">Een momentje, wij laden een land is</p>
          )}
          {error && (
            <p className="error">
              Sorry momenteel is deze service buiten gebruik
            </p>
          )}
          {country && (
            <NavLink to={`/land/${country.lan_id}`}>
              <CountryCard country={country} className="shrink" />
            </NavLink>
          )}
        </article>
      </section>
    </>
  );
};

export default AppNotFound;
