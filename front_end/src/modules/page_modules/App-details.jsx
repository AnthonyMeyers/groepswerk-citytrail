import { Status } from "../hooks/main_functions";
import { NavLink, useParams } from "react-router-dom";
import {
  useGetOneLandQuery,
  useRemoveOneCityMutation,
  useAddOneStadMutation,
  useUpdateOneLandMutation,
  useGetAllLanguagesQuery,
  useChangeLanguagesCityMutation,
} from "../../data/landenApi";
import { useEffect, useState } from "react";

const AppDetail = () => {
  const { id } = useParams();
  const [addCity, setAddCity] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editFlag, setEditFlag] = useState("");
  const admin = true;
  //const { admin } = useSelector((state) => state.adminState);
  const [removeCity] = useRemoveOneCityMutation();
  const [addOneCity] = useAddOneStadMutation();
  const [updateLand] = useUpdateOneLandMutation();
  const [languageList, setLanguageList] = useState(".");
  const [activeLanguages, setActiveLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [changeLanguages] = useChangeLanguagesCityMutation();

  const {
    data: land,
    isError: errorLand,
    isLoading: loadingLand,
    isSuccess,
  } = useGetOneLandQuery(id);

  const {
    data: languages,
    isLoading: loadingLanguage,
    isError: errorLanguage,
    isSuccess: successLanguage,
  } = useGetAllLanguagesQuery();

  useEffect(() => {
    if (isSuccess) {
      setEditCountry(land.name);
      setEditFlag(land.flag);

      if (land && land.languages) {
        setLanguageList(
          land.languages.map((language) => language.name).join(", ")
        );
        if (isSuccess && successLanguage) {
          setActiveLanguages(
            languages.filter(({ name }) => !languageList.includes(name))
          );
        }
      }
    }
  }, [isSuccess, successLanguage]);

  function handleCitySubmit(e) {
    e.preventDefault(e);

    if (addCity.length >= 2) {
      addOneCity({ countryId: id, name: addCity });
      setAddCity("");
    }
  }

  function handleCountrySubmit(e) {
    e.preventDefault();
    updateLand({ id, name: editCountry, flag: editFlag });
  }

  function handleLanguageSubmit(e) {
    e.preventDefault();
    if (language && language != 0) {
      const targetLanguages = [...land.languages.map(({ id }) => id), language];
      changeLanguages({
        id: land.id,
        languages: targetLanguages.map((id) => `/api/languages/${id}`),
      });
      setLanguage(0);
    }
  }

  function handleRemoveLanguageClick(toRemoveId) {
    const targetLanguages = [
      ...land.languages
        .filter(({ id }) => id != toRemoveId)
        .map(({ id }) => id),
    ];

    changeLanguages({
      id: land.id,
      languages: targetLanguages.map((id) => `/api/languages/${id}`),
    });
    setLanguage(0);
  }

  return (
    <section className="detail">
      <h2 className="detail__title">Detailpagina {land && land.name}</h2>
      {admin && (
        <>
          <div className="admin">
            <form onSubmit={handleCountrySubmit} className="admin__form">
              <label className="admin__form__label">
                Naam Land
                <input
                  type="text"
                  value={editCountry}
                  onInput={(e) => setEditCountry(e.target.value)}
                  minLength="2"
                  maxLength="20"
                  required
                  className="admin__form__label__input"
                />
              </label>
              <label className="admin__form__label">
                Link vlag
                <input
                  type="text"
                  value={editFlag}
                  onInput={(e) => setEditFlag(e.target.value)}
                  className="admin__form__label__input"
                />
              </label>
              <button className="admin__form__button">Land bewerken</button>
            </form>

            <form onSubmit={handleCitySubmit} className="admin__form">
              <label className="admin__form__label">
                Stad toevoegen
                <input
                  type="text"
                  value={addCity}
                  onInput={(e) => setAddCity(e.target.value)}
                  minLength="2"
                  maxLength="20"
                  className="admin__form__label__input"
                />
              </label>
              <button className="admin__form__button">Stad toevoegen</button>
            </form>

            {successLanguage && activeLanguages && (
              <form onSubmit={handleLanguageSubmit} className="admin__form">
                <label className="admin__form__label">Taal toevoegen</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="0">selecteer een taal</option>
                  {activeLanguages.length > 0 &&
                    activeLanguages.map(({ id, name }) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                </select>
                <button className="admin__form__button">Taal toevoegen</button>
              </form>
            )}
          </div>
        </>
      )}
      <Status
        error={errorLand}
        loading={loadingLand}
        loader={"../src/images/loading.gif"}
      />
      <div className="detail__country">
        {isSuccess && land.flag && (
          <>
            <img
              src={land.flag}
              alt={land.name}
              className="detail__country__img"
            />
          </>
        )}
        {land && (
          <div className="detail__country__languages">
            <h3 className="detail__country__languages__title">
              Deze talen worden gesproken in {land.name}:
            </h3>
            <ul className="detail__country__languages__list">
              {land.languages.length > 0 &&
                land.languages.map(({ id, name }) => (
                  <li
                    key={id}
                    className="detail__country__languages__list__item"
                  >
                    <span>{name}</span>
                    <a
                      className="detail__country__languages__list__item__remove"
                      onClick={() => handleRemoveLanguageClick(id)}
                    ></a>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <h3>Geregistreerde steden</h3>
      <div className="detail__cities">
        {land &&
          land.cities.length > 0 &&
          land.cities.map(({ id, name }, i) => (
            <div key={id} className="detail__cities__city">
              <NavLink
                to={`/land/${land.id}/stad/${id}`}
                className="detail__cities__city__link"
              >
                <h4 className="detail__cities__city__link__title">{name}</h4>
              </NavLink>
              {admin && (
                <a
                  className="detail__cities__city__remove"
                  onClick={() => removeCity(id)}
                ></a>
              )}
            </div>
          ))}
      </div>
      {!loadingLand && (
        <NavLink to={`/landen`}>
          <button className="detail__button">Ga terug</button>
        </NavLink>
      )}
    </section>
  );
};

export default AppDetail;
