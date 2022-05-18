import React, { useEffect, useState } from "react";
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
    if (countries && countries.length > 0) {
      setCountry(countries[Math.floor(Math.random() * countries.length)]);
      console.log(country);
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
          {country && country.id && (
            <CountryCard
              country={country.name}
              id={country.id}
              className="shrink"
            />
          )}
        </article>
      </section>
    </>
  );
};

export default AppNotFound;
