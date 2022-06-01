import Card from "./subcomp_zoek/Card";
import { useState, useEffect } from "react";
import {
  useGetAllLandenQuery,
  useAddOneLandMutation,
} from "../../data/landenApi";
import { Status, Messagebar } from "../hooks/main_functions";
import { useSelector } from "react-redux";

export default function AppZoek() {
  //De standaardpagina die alle landen laat zien
  //pagination vanaf 20 landen
  const [page, setPage] = useState(1);
  const {
    data: countryData,
    isError,
    isLoading,
    isSuccess,
  } = useGetAllLandenQuery(page);
  const [postLand] = useAddOneLandMutation();
  const [addLand, setAddland] = useState("");

  const { admin} = useSelector((state) => state.adminState);
  const [errorHandler, setErrorHandler] = useState("")

  //Voeg en land toe
  function handleLandSubmit(e) {
    e.preventDefault();
    if(addLand.length >= 2 && addLand.length <= 20){
    postLand(addLand);
    setAddland("");
    setErrorHandler("");
  }
  else{setErrorHandler("Een land kan vanaf 2 tot en met 20 tekens bevatten.")}
  }

  //Ga naar vorige pagina
  function handleBackClick() {
    setPage(countryData.lastPage);
  }

  //Ga naar volgende pagina
  function handleNextClick() {
    setPage(countryData.nextPage);
  }
  return (
    <>
      <section className="search">
        <h2 className="search__title">
          Landen pagina{" "}
          {isSuccess && "isPage" in countryData && countryData.isPage}
        </h2>
        {admin && (
          <div className="admin">
            
            <form className="admin__form" onSubmit={handleLandSubmit}>
              <label className="admin__form__label">
                Land toevoegen
                <input
                  type="text"
                  value={addLand}
                  className="admin__form__label__input"
                  onInput={(e) => setAddland(e.target.value)}
                  maxLength="30"
                  required
                />
              </label>

              <button type="submit" className="admin__form__button">
                Land toevoegen
              </button>
              {errorHandler.length > 0 && <Messagebar>{errorHandler}</Messagebar>}
            </form>
          </div>
        )
        }
        <Status
          error={isError}
          loading={isLoading}
          loader={"/fs_anthonym/groepswerk/images/loading.gif"}
        />
        {isSuccess && ["isPage"] in countryData && countryData.isPage != 0 && (
          <div className="search__pagination">
            <a
              className="search__pagination__left"
              onClick={handleBackClick}
            ></a>
            <a
              className="search__pagination__right"
              onClick={handleNextClick}
            ></a>
          </div>
        )}
        {isSuccess && ["list"] in countryData && countryData.list.length > 0 && (
          <ul className="search__list">
            {countryData.list.map(({ id, name, flag }) => {
              return (
                <li className="search__list__item" key={id}>
                  <Card country={name} id={id} flag={flag} />
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
