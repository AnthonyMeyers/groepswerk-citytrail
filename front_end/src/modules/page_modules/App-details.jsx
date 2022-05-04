import { useEffect, useState, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  useParams,
} from "react-router-dom";
import getData from "../hooks/api_calls";

const AppDetail = () => {
  const { id } = useParams();

  const [land, error, loading] = getData(
    `http://127.0.0.1:8000/api/gw2_lands/${id}.json`
  );

  const [steden, errorSteden, loadingSteden] = getData(
    `http://127.0.0.1:8000/api/gw2_stads.json`
  );

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

  return (
    <section className="detail">
      <h2 className="search__title">
        Detailpagina {land.lanNaam && land.lanNaam + ` (${land.lanId})`}
      </h2>
      {steden.length > 0 && <div id="map"></div>}
      {error && <h3>Woops foutje, de data is onbereikbaar</h3>}
      {loading && <h3>Land aan het laden</h3>}
      {errorSteden && <h3>Geen steden gevonden</h3>}
      {loadingSteden && <h3>Zoekt steden</h3>}
      {steden.length > 0 &&
        steden
          .filter(
            ({ stdLan }) => stdLan.substr(stdLan.lastIndexOf("/") + 1) === id
          )
          .map(({ stdId, stdNaam, stdLat, stdLong }) => (
            <div>
              <h3>{stdNaam}</h3>
              <p>Latitude: {stdLat}</p>
              <p>Longitude: {stdLong}</p>
            </div>
          ))}
      <NavLink to={`/landen`}>
        <button>Go back</button>
      </NavLink>
    </section>
  );
};

export default AppDetail;
