import { Status } from "../hooks/main_functions";
import { NavLink, useParams } from "react-router-dom";
import {
  useGetOneLandQuery,
  useRemoveOneCityMutation,
  useAddOneStadMutation,
  useUpdateOneLandMutation,
} from "../../data/landenApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AppDetail = () => {
  const { id } = useParams();
  const [addCity, setAddCity] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editFlag, setEditFlag] = useState("");
  const { admin } = useSelector((state) => state.adminState);
  const [removeCity] = useRemoveOneCityMutation();
  const [addOneCity] = useAddOneStadMutation();
  const [updateLand] = useUpdateOneLandMutation();
  const {
    data: land,
    isError: errorLand,
    isLoading: loadingLand,
    isSuccess,
  } = useGetOneLandQuery(id);

  useEffect(() => {
    if (isSuccess) {
      console.log(land);
      setEditCountry(land.name);
      setEditFlag(land.flag);
    }
  }, [isSuccess]);

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
                  maxlength="20"
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
                  maxlength="20"
                  className="admin__form__label__input"
                />
              </label>
              <button className="admin__form__button">Stad toevoegen</button>
            </form>
          </div>
        </>
      )}
      <Status
        error={errorLand}
        loading={loadingLand}
        loader={"../src/images/loading.gif"}
      />
      {isSuccess && land.flag && <img src={land.flag} alt={land.name} />}
      {land &&
        land.cities.length > 0 &&
        land.cities.map(({ id, name }, i) => (
          <div key={id} className="detail__city">
            <NavLink
              to={`/land/${land.id}/stad/${id}`}
              className="detail__city__link"
            >
              <h3 className="detail__city__link__title">{name}</h3>
            </NavLink>
            {admin && (
              <a
                class="detail__city__remove"
                onClick={() => removeCity(id)}
              ></a>
            )}
          </div>
        ))}
      {land && land.languages.length > 0 && (
        <ul>
          {land.languages.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      )}
      {!loadingLand && (
        <NavLink to={`/landen`}>
          <button className="detail__button">Ga terug</button>
        </NavLink>
      )}
    </section>
  );
};

export default AppDetail;
