import { useContext, useLayoutEffect, useState, useEffect } from "react";
import { AdminContext } from "../../Provider";
import { useParams, NavLink } from "react-router-dom";
import { getData, getDataRecords } from "../hooks/api_calls";
import { Status } from "../hooks/main_functions";
const AppStadDetail = () => {
  const { admin } = useContext(AdminContext);
  const { id, stadId } = useParams();
  const [stad, error, loading] = getData(
    "http://localhost:8080/api.php/records/gw2_stad/" + stadId
  );

  useLayoutEffect(() => {
    if (stad && stad.std_id > 0) {
      const long = parseFloat(stad.std_long);
      const lat = parseFloat(stad.std_lat) * 1;
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic3Rpam5neXNzZW5zIiwiYSI6ImNraGdkMDQ3NzA2bXcyc3A5dDBweTBmcmUifQ.Rlt-rT2CHiOts39bY7EyWw";
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [long, lat], // starting position [lng, lat]
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
  }, [stad]);
  return (
    <>
      <section className="staddetail">
        <h2 className="staddetail__title">
          Detailpagina stad {stad && stad.std_naam}
        </h2>
        <Status error={error} loading={loading} />
        {admin && (
          <div className="admin">
            <button className="admin__button">Stad bewerken</button>
            <button className="admin__button">Stad verwijderen</button>
            <button className="admin__button">Monument toevoegen</button>
          </div>
        )}
        {stad && <div id="map"></div>}
        <NavLink to={`/land/${id}`}>
          <button>Ga terug</button>
        </NavLink>
      </section>
    </>
  );
};

export default AppStadDetail;
