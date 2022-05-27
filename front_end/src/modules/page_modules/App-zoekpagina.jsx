import Card from "./subcomp_zoek/Card";
import { useState } from "react";
import {
  useGetAllLandenQuery,
  useAddOneLandMutation,
} from "../../data/landenApi";
import { Status } from "../hooks/main_functions";
import { useSelector } from "react-redux";

export default function AppZoek() {
  const [page, setPage] = useState(1);
  const {
    data: countryData,
    isError,
    isLoading,
    isSuccess,
  } = useGetAllLandenQuery(page);
  const [postLand] = useAddOneLandMutation();
  const [addLand, setAddland] = useState("");

  const { admin } = useSelector((state) => state.adminState);

  function handleLandSubmit(e) {
    e.preventDefault();
    postLand(addLand);
    setAddland("");
  }

  function handleBackClick() {
    setPage(countryData.lastPage);
  }

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
                  minLength="2"
                  maxLength="20"
                  required
                />
              </label>
              <button type="submit" className="admin__form__button">
                Land toevoegen
              </button>
            </form>
          </div>
        )}
        <Status
          error={isError}
          loading={isLoading}
          loader={"../src/images/loading.gif"}
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
