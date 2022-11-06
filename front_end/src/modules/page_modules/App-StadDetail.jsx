import { useLayoutEffect, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"
import MonumentModal from "./subcomp_zoek/MonumentModal";
import { useParams, NavLink } from "react-router-dom";
import { Status, Messagebar } from "../hooks/main_functions";
import {
  useGetOneStadQuery,
  useAddOneMonumentMutation,
  useRemoveOneMonumentMutation,
  useUpdateOneCityMutation,
} from "../../data/landenApi";
import { useSelector } from "react-redux";

const AppStadDetail = () => {
  const { id: landId, stadId } = useParams();
  const { admin } = useSelector((state) => state.adminState);
  const [addMonument, setAddMonument] = useState("");
  const [cityName, setCityName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [photo, setPhoto] = useState("");
  const [searchMonument, setSearchMonument] = useState("");
  const [addOneMonument] = useAddOneMonumentMutation();
  const [removeOneMonument] = useRemoveOneMonumentMutation();
  const [updateCity] = useUpdateOneCityMutation();
  const [errorHandler, setErrorHandler] = useState("")

  //Laad een stad op
  const {
    data: stad,
    isLoading,
    isError: error,
    isSuccess,
  } = useGetOneStadQuery(stadId);

  //Voegt een monument toe
  function handleAddMonumentSubmit(e) {
    e.preventDefault();
    setErrorHandler("");
    if (addMonument.length >= 2 && addMonument.length <= 20) {
      addOneMonument({ cityId: stadId, name: addMonument });
      setAddMonument("");
    }else {setErrorHandler("Een monument kan 2 tot en met 20 tekens bevatten.")}
  }

  //Wijzig de data van een stad
  function handleCitySubmit(e) {
    e.preventDefault();
    setErrorHandler("");
    if(cityName.length >= 2 && cityName.length <= 20){
      if(latitude != isNaN && latitude.length >0 && longitude.length > 0 && latitude <= 90 && latitude >= -90 && longitude <= 180 && longitude >= -180){
        console.log(latitude)
    updateCity({
      id: stadId,
      name: cityName,
      latidude: latitude,
      longitude,
      img: photo,
    });
  }else {setErrorHandler("Latitude gaat van -90 tot en met 90 & longitude van -180 tot 180.")}
  } else{setErrorHandler("Een stad kan vanaf 2 tot en met 20 tekens bevatten. ")}
  }

  //Laad begindata in
  useEffect(() => {
    if (isSuccess) {
      setCityName(stad.name);
      if ("latidude" in stad) {
        setLatitude(stad.latidude);
      }
      if ("longitude" in stad) {
        setLongitude(stad.longitude);
      }
      if ("img" in stad) {
        setPhoto(stad.img);
      }
    }
  }, [isSuccess]);

  //Regel mapbox
  useLayoutEffect(() => {
    if (stad && "longitude" in stad && "latidude" in stad) {
      const longTest = parseFloat(stad.longitude) * 1;
      const latTest = parseFloat(stad.latidude) * 1;

      const long = isNaN(longTest)
        ? 0
        : longTest < -180
        ? -180
        : longTest > 180
        ? 180
        : longTest;
      const lat = isNaN(latTest)
        ? 0
        : latTest < -90
        ? -90
        : latTest > 90
        ? 90
        : latTest;

    mapboxgl.accessToken =
    "MAPBOX_ACCESS_TOKEN";
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center:  [ long,lat ],
        zoom: 9
    });
}}, [stad]);

  return (
    <>
      <section className="staddetail">
        <h2 className="staddetail__title">
          Detailpagina stad {stad && stad.name}
        </h2>
        <Status
          error={error}
          loading={isLoading}
          loader={"/fs_anthonym/groepswerk/images/loading.gif"}
        />

        {admin && (<>
          <div className="admin">
            <form onSubmit={handleCitySubmit} className="admin__form">
              <label className="admin__form__label">
                Stadnaam
                <input
                  type="text"
                  value={cityName}
                  onInput={(e) => setCityName(e.target.value)}
                  maxLength="30"
                  required
                  className="admin__form__label__input"
                />
              </label>
              <label className="admin__form__label">
                Longitude
                <input
                  type="text"
                  value={longitude}
                  onInput={(e) => setLongitude(e.target.value)}
                  className="admin__form__label__input"
                />
              </label>
              <label className="admin__form__label">
                Latitude
                <input
                  type="text"
                  value={latitude}
                  onInput={(e) => setLatitude(e.target.value)}
                  className="admin__form__label__input"
                />
              </label>
              <label className="admin__form__label">
                Url foto
                <input
                  type="text"
                  value={photo}
                  onInput={(e) => setPhoto(e.target.value)}
                  className="admin__form__label__input"
                />
              </label>
              <button type="submit" className="admin__form__button">
                Bewerk stad
              </button>
            </form>
            <form onSubmit={handleAddMonumentSubmit} className="admin__form">
              <label className="admin__form__label">
                Voeg een monument toe
                <input
                  type="text"
                  value={addMonument}
                  onInput={(e) => setAddMonument(e.target.value)}
                  maxLength="30"
                  className="admin__form__label__input"
                />
              </label>
              <button type="submit" className="admin__form__button">
                Monument toevoegen
              </button>
            </form>
          </div>
         {errorHandler.length > 0 && <Messagebar>{errorHandler}</Messagebar>}
         </>
        )}
        <div className="staddetail__imgholder">
          {isSuccess && "img" in stad && (
            <img
              src={stad.img}
              alt={stad.name}
              className="staddetail__imgholder__img"
            />
          )}
        <div id="map"  className="staddetail__imgholder__img"></div>
        </div>

        {stad && "monuments" in stad && stad.monuments.length > 0 && (
          <div className="monumenten">
            <h3 className="staddetail__monumenten__subtitle">Monumenten</h3>
            <label className="staddetail__monumenten__label">
              Zoek een monument
              <input
                type="text"
                value={searchMonument}
                onInput={(e) => setSearchMonument(e.target.value)}
                className="staddetail__monumenten__label__inputtext"
              />
            </label>
            <ul className="staddetail__monumenten__list">
              {stad.monuments
                .filter((monument) =>
                  monument.name.toLowerCase().startsWith(searchMonument)
                )
                .map(({ id, name }) => (
                  <li key={id} className="staddetail__monumenten__list__item">
                    <MonumentModal key={id} monumentId={id}>
                      {name}
                    </MonumentModal>
                    {admin && (
                      <a
                        className="staddetail__monumenten__list__item__remove"
                        onClick={() => removeOneMonument(id)}
                      ></a>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        )}
        <NavLink to={`/fs_anthonym/groepswerk/land/${landId}`}>
          <button>Ga terug</button>
        </NavLink>
      </section>
    </>
  );
};

export default AppStadDetail;


/*
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
        center: [long.toString(), lat.toString()], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
      map.on("load", () => {
        map.addLayer({
          id: "terrain-data",
          type: "line",
          source: {
            type: "jpg",
            url: "mapbox://mapbox.mapbox-terrain-v2",
          },
          "source-layer": "contour",
        });
      });
    }
  }, [stad]);*/
    /*{stad && stad.longitude != null && stad.latidude != null && (
          
        )}*/


        /*{isSuccess && "latidude" in stad && "longitude" in stad && (
          <img
            src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${stad.latidude},${stad.longitude},9,0/300x300?access_token=pk.eyJ1Ijoic3Rpam5neXNzZW5zIiwiYSI6ImNraGdkMDQ3NzA2bXcyc3A5dDBweTBmcmUifQ.Rlt-rT2CHiOts39bY7EyWw`}
            className="staddetail__imgholder__img"
          />
        )}*/
  
