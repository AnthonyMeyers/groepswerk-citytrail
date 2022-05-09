import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Card from "./subcomp_zoek/Card";

import { useGetAllLandenQuery } from "../../data/landenApi";
import { Status } from "../hooks/main_functions";
import { useSelector } from "react-redux";

export default function AppZoek() {
  const { data: countryData, isError, isLoading } = useGetAllLandenQuery();

  const { admin } = useSelector((state) => state.adminState);

  return (
    <>
      <section className="search">
        <h2 className="search__title">Landen</h2>
        {admin && (
          <div className="admin">
            <button className="admin__button">Land toevoegen</button>
          </div>
        )}
        <Status error={isError} loading={isLoading} />
        {countryData && countryData.records.length > 0 && (
          <ul className="search__list">
            {countryData.records.length > 0 &&
              countryData.records.map((country, i) => {
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
