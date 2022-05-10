import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CountryCard from "./subcomp_zoek/Card";
import { Status } from "../hooks/main_functions";
import { useGetAllLandenQuery } from "../../data/landenApi";

const AppNotFound = () => {
  const [country, setCountry] = useState(null);

  const {
    data: countries,
    isError: error,
    isLoading: loading,
  } = useGetAllLandenQuery();

  useEffect(() => {
    if (countries) {
      setCountry(
        countries.records[
          parseInt(Math.random() * countries.records.length, 10)
        ]
      );
    }
  }, [countries]);
  return (
    <>
      <section className="notfound">
        <h2 className="notfound__title">Missing & found</h2>
        <article>
          <h3>Beste bezoeker</h3>
          <p>Het lijkt er op dat U op een verkeerde pagina bent beland.</p>
          <p>Mogen wij U eventueel een land voorstellen?</p>
          <Status error={error} loading={loading} />
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
