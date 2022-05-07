import { useEffect, useState, useContext } from "react";
import { Status } from "../hooks/main_functions";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  useParams,
} from "react-router-dom";
import { getData, getDataRecords } from "../hooks/api_calls";
import { AdminContext } from "../../Provider";

const AppDetail = () => {
  const { id } = useParams();

  const { admin } = useContext(AdminContext);

  const [land, error, loading] = getData(
    `http://localhost:8080/api.php/records/gw2_land/${id}`
  );

  const [steden, errorSteden, loadingSteden] = getData(
    `http://localhost:8080/api.php/records/gw2_stad/1`
  );

  return (
    <section className="detail">
      <h2 className="search__title">
        Detailpagina {land.lan_naam && land.lan_naam + ` (${land.lan_id})`}
      </h2>
      {admin && (
        <div className="admin">
          <button className="admin__button">Land bewerken</button>
          <button className="admin__button">Land verwijderen</button>
          <button className="admin__button">Stad toevoegen</button>
        </div>
      )}
      <Status error={error} loading={loading} />
      {errorSteden && <h3 className="error">Geen steden gevonden</h3>}
      {loadingSteden && <h3 className="loading">Zoekt steden</h3>}
      {[steden].length > 0 &&
        [steden].map(({ std_naam, std_id }) => (
          <div>
            <NavLink to={`/land/${land.lan_id}/stad/${std_id}`}>
              <h3>{std_naam}</h3>
            </NavLink>
          </div>
        ))}

      <NavLink to={`/landen`}>
        <button class="detail__button">Ga terug</button>
      </NavLink>
    </section>
  );
};

export default AppDetail;
