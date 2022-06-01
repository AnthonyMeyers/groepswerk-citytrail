import { Status, Messagebar } from "../hooks/main_functions";
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
import { useSelector } from "react-redux";

const AppDetail = () => {
  const { id } = useParams();
  const [addCity, setAddCity] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editFlag, setEditFlag] = useState("");
  const { admin} = useSelector((state) => state.adminState);

  const [removeCity] = useRemoveOneCityMutation();
  const [addOneCity] = useAddOneStadMutation();
  const [updateLand] = useUpdateOneLandMutation();
  const [inactiveLanguages, setInactiveLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [changeLanguages] = useChangeLanguagesCityMutation();
  const [searchCity, setSearchCity] = useState("");
  const [errorHandler, setErrorHandler] = useState("")

  //Laad het land
  const {
    data: land,
    isError: errorLand,
    isLoading: loadingLand,
    isSuccess,
  } = useGetOneLandQuery(id);

  //Laad alle talen
  const {
    data: languages,
    isLoading: loadingLanguage,
    isError: errorLanguage,
    isSuccess: successLanguage,
  } = useGetAllLanguagesQuery();

  useEffect(() => {
    //als land is geladen
    if (isSuccess) {

        //als land en alle talen zijn geladen vergelijk
        if (isSuccess && successLanguage) {
        if("languages" in land){
        setInactiveLanguages(languages.filter(({id}) => land.languages.reduce((present, listitem)=> {
        if(present === false)
        {return false}
        if(listitem.id === id)
        {
          return false
        } else return true;
        }, true)))}
      }
    }
  }, [isSuccess, successLanguage, land]);

  //Voeg een taal toe aan een land
  function handleLanguageSubmit(e) {
    e.preventDefault();
    if (language && language.length > 0 ) {
      const targetLanguages = [...land.languages.map(({ id }) => id), language];
      changeLanguages({
        id: land.id,
        languages: targetLanguages.map((id) => `/api/languages/${id}`),
      });
      setLanguage("");
    }
  }

  //Als een land is geladen, vul de data in
  useEffect(()=>{
    if (isSuccess && "name" in land) {
    setEditCountry(land.name);
    setEditFlag(land?.flag || "");
  }},[isSuccess])

  //Voeg een stad toe aan een land
  function handleCitySubmit(e) {
    e.preventDefault(e);
    if (addCity.length >= 2 && addCity.length <= 20) {
      addOneCity({ countryId: id, name: addCity });
      setAddCity("");
      setErrorHandler("");
    }
    else{setErrorHandler("Een stad kan vanaf 2 tot en met 20 tekens bevatten.")}
  }

  //Wijzigt de gegevens van een land
  function handleCountrySubmit(e) {
    e.preventDefault();
    if (editCountry.length >= 2 && editCountry.length <= 20) {
    updateLand({ id, name: editCountry, flag: editFlag });
    errorHandler("")
    }else{setErrorHandler("Een land kan vanaf 2 tot en met 20 tekens bevatten.")}

  }

  //koppel een taal van een land los
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
    setLanguage("");
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
                  maxLength="30"
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
                  maxLength="30"
                  className="admin__form__label__input"
                />
              </label>
              <button className="admin__form__button">Stad toevoegen</button>
            </form>

            {successLanguage && inactiveLanguages && (
              <form onSubmit={handleLanguageSubmit} className="admin__form">
                <label className="admin__form__label">Taal toevoegen</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="0">selecteer een taal</option>
                  {inactiveLanguages.length > 0 && 
                    inactiveLanguages.map(({ id, name }) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                </select>
                <button className="admin__form__button">Taal toevoegen</button>
              </form>
            )}
           {errorHandler.length > 0 && <Messagebar>{errorHandler}</Messagebar>}
          </div>
        </>
      )}
      <Status
        error={errorLand}
        loading={loadingLand}
        loader={"/fs_anthonym/groepswerk/images/loading.gif"}
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
              {"languages" in land && land.languages.length > 0 &&
                land.languages.map(({ id, name }) => (
                  <li
                    key={id}
                    className="detail__country__languages__list__item"
                  >
                    <span>{name}</span>
                    {admin && <a
                      className="detail__country__languages__list__item__remove"
                      onClick={() => handleRemoveLanguageClick(id)}
                    ></a>}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {land && "cities" in land && land.cities.length > 0 && (
        <div className="detail__cities">
          <h3 className="detail__cities__title">Geregistreerde steden</h3>
          <label className="detail__cities__label">
            Zoek een stad
            <input
              type="text"
              value={searchCity}
              onInput={(e) => setSearchCity(e.target.value)}
              className="detail__cities__label__inputtext"
            />
          </label>
          <ul className="detail__cities__citylist">
            {land.cities
              .filter((city) => city.name.toLowerCase().startsWith(searchCity))
              .map(({ id, name }) => (
                <li key={id} className="detail__cities__citylist__city">
                  <NavLink
                    to={`/fs_anthonym/groepswerk/land/${land.id}/stad/${id}`}
                    className="detail__cities__citylist__city__link"
                  >
                    <h4 className="detail__cities__citylist__city__link__title">
                      {name}
                    </h4>
                  </NavLink>
                  {admin && (
                    <a
                      className="detail__cities__citylist__city__remove"
                      onClick={() => removeCity(id)}
                    ></a>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
      {!loadingLand && (
        <NavLink to={`/fs_anthonym/groepswerk/landen`}>
          <button className="detail__button">Ga terug</button>
        </NavLink>
      )}
    </section>
  );
};

export default AppDetail;
