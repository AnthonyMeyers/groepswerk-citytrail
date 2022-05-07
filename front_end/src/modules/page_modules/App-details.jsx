import { useEffect, useState, useLayoutEffect, useContext } from "react";
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
  console.log(steden);
  /*
  useLayoutEffect(() => {
    if (
      steden.filter(
        ({ stdLan }) => stdLan.substr(stdLan.lastIndexOf("/") + 1) === id
      ).length > 0
    ) {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic3Rpam5neXNzZW5zIiwiYSI6ImNraGdkMDQ3NzA2bXcyc3A5dDBweTBmcmUifQ.Rlt-rT2CHiOts39bY7EyWw";
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [4.34878, 50.85045], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
      map.on("load", () => {
        map.addLayer({
          id: "terrain-data",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://mapbox.mapbox-terrain-v2",
          },
          "source-layer": "contour",
        });
      });
    }
  }, [steden]);
*/
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
      {error && (
        <h3 className="error">Woops foutje, de data is onbereikbaar</h3>
      )}
      {loading && <h3 className="loading">Land aan het laden</h3>}
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
      {[steden].length > 0 && <div id="map"></div>}
      <NavLink to={`/landen`}>
        <button class="detail__button">Go back</button>
      </NavLink>
    </section>
  );
};

export default AppDetail;
