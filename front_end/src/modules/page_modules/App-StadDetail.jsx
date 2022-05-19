import { useLayoutEffect, useState, useEffect } from "react";
import MonumentModal from "./subcomp_zoek/MonumentModal";
import { useParams, NavLink } from "react-router-dom";
import { Status } from "../hooks/main_functions";
import {
  useGetOneStadQuery,
  useAddOneMonumentMutation,
  useRemoveOneMonumentMutation,
  useUpdateOneCityMutation,
} from "../../data/landenApi";
import { useSelector } from "react-redux";
import placeholderCity from "../../images/placeholder_city.webp";

const AppStadDetail = () => {
  const { id: landId, stadId } = useParams();
  const { admin } = useSelector((state) => state.adminState);
  const [addMonument, setAddMonument] = useState("");
  const [addOneMonument] = useAddOneMonumentMutation();
  const [removeOneMonument] = useRemoveOneMonumentMutation();
  const [cityName, setCityName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [photo, setPhoto] = useState("");
  const [updateCity] = useUpdateOneCityMutation();

  const {
    data: stad,
    isLoading,
    isError: error,
    isSuccess,
  } = useGetOneStadQuery(stadId);

  function handleAddMonumentSubmit(e) {
    e.preventDefault();
    if (addMonument.length >= 2) {
      addOneMonument({ cityId: stadId, name: addMonument });
      setAddMonument("");
    }
  }

  function handleCitySubmit(e) {
    e.preventDefault();
    const longTest = parseFloat(longitude) * 1;
    const latTest = parseFloat(latitude) * 1;

    const long = isNaN(longTest)
      ? 0
      : longTest < 0
      ? 0
      : longTest > 90
      ? 90
      : longTest;
    const lat = isNaN(latTest)
      ? 0
      : latTest < 0
      ? 0
      : latTest > 90
      ? 90
      : latTest;
    setLatitude(lat);
    setLongitude(long);
    updateCity({
      id: stadId,
      name: cityName,
      latidude: latitude,
      longitude,
      img: photo,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setCityName(stad.name);
      setLatitude(stad.latidude);
      setLongitude(stad.longitude);
      setPhoto(stad.img);
    }
  }, [isSuccess]);

  useLayoutEffect(() => {
    if (stad && stad.id > 0 && stad.longitude && stad.latidude) {
      const longTest = parseFloat(stad.longitude) * 1;
      const latTest = parseFloat(stad.latidude) * 1;

      const long = isNaN(longTest)
        ? 0
        : longTest < 0
        ? 0
        : longTest > 90
        ? 90
        : longTest;
      const lat = isNaN(latTest)
        ? 0
        : latTest < 0
        ? 0
        : latTest > 90
        ? 90
        : latTest;
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
          Detailpagina stad {stad && stad.name}
        </h2>
        <Status error={error} loading={isLoading} />
        {admin && (
          <div className="admin">
            <form onSubmit={handleCitySubmit}>
              <label>
                Stadnaam
                <input
                  type="text"
                  value={cityName}
                  onInput={(e) => setCityName(e.target.value)}
                  minLength="2"
                  maxlength="20"
                  required
                />
              </label>
              <label>
                Latitude
                <input
                  type="text"
                  value={longitude}
                  onInput={(e) => setLongitude(e.target.value)}
                />
              </label>
              <label>
                Longitude
                <input
                  type="text"
                  value={latitude}
                  onInput={(e) => setLatitude(e.target.value)}
                />
              </label>
              <label>
                Url foto
                <input
                  type="text"
                  value={photo}
                  onInput={(e) => setPhoto(e.target.value)}
                />
              </label>
              <button type="submit">Bewerk stad</button>
            </form>

            <form onSubmit={handleAddMonumentSubmit}>
              <label>
                Voeg een monument toe
                <input
                  type="text"
                  value={addMonument}
                  onInput={(e) => setAddMonument(e.target.value)}
                  minLength="2"
                  maxlength="20"
                />
              </label>
              <button className="admin__button">Monument toevoegen</button>
            </form>
          </div>
        )}
        {isSuccess && stad.img && (
          <img src={stad.img} alt={stad.name} className="staddetail__img" />
        )}
        {(isSuccess && !stad.img) ||
          (stad?.img === "" && (
            <img
              src={placeholderCity}
              alt="placeholder city"
              className="staddetail__img"
            />
          ))}
        {stad && stad.longitude != null && stad.latidude != null && (
          <div id="map"></div>
        )}
        {stad && stad.monuments.length > 0 && (
          <ul className="staddetail__list">
            {stad.monuments.map(({ id, name }) => (
              <li key={id} className="staddetail__list__item">
                <MonumentModal key={id} monumentId={id}>
                  {name}
                </MonumentModal>
                {admin && (
                  <a
                    className="staddetail__list__item__remove"
                    onClick={() => removeOneMonument(id)}
                  ></a>
                )}
              </li>
            ))}
          </ul>
        )}

        <NavLink to={`/land/${landId}`}>
          <button>Ga terug</button>
        </NavLink>
      </section>
    </>
  );
};

export default AppStadDetail;
