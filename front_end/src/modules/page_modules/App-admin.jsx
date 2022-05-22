import { changeState } from "../../data/admin";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  useAddOneLanguageMutation,
  useRemoveOneLanguageMutation,
  useGetAllLanguagesQuery,
} from "../../data/landenApi";

export default function AppAdmin() {
  const { admin } = useSelector((state) => state.adminState);
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("");
  const [deleteLanguage, setToDeleteLanguage] = useState(null);
  const [addLanguage] = useAddOneLanguageMutation();
  const [removeLanguage] = useRemoveOneLanguageMutation();
  const {
    data: languages,
    isError,
    isLoading,
    isSuccess,
  } = useGetAllLanguagesQuery();
  function handleLanguageSubmit(e) {
    e.preventDefault();
    addLanguage(language);
    setLanguage("");
  }

  function handleLanguageRemove(e) {
    e.preventDefault();
    console.log(deleteLanguage);
    if (deleteLanguage && deleteLanguage != 0) {
      removeLanguage(deleteLanguage);
      setToDeleteLanguage(0);
    }
  }
  return (
    <>
      <p>set admin</p>
      <button onClick={() => dispatch(changeState())}>
        activate admin {admin ? "on" : "off"}
      </button>
      {admin && (
        <div className="admin">
          <form className="admin__form" onSubmit={handleLanguageSubmit}>
            <label className="admin__form__label">
              Taal toevoegen
              <input
                type="text"
                value={language}
                className="admin__form__label__input"
                onInput={(e) => setLanguage(e.target.value)}
                minLength="2"
                maxlength="20"
                required
              />
            </label>
            <button type="submit" className="admin__form__button">
              Toevoegen aan database
            </button>
          </form>

          {languages && languages.length > 0 && (
            <form className="admin__form" onSubmit={handleLanguageRemove}>
              <label className="admin__form__label">
                Taal definitief verwijderen
              </label>
              <select
                value={deleteLanguage}
                onChange={(e) => setToDeleteLanguage(e.target.value)}
              >
                <option value="0"></option>
                {languages.length > 0 &&
                  languages.map(({ id, name }) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
              </select>
              <button className="admin__form__button">Taal verwijderen</button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
