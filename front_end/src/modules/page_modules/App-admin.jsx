import { changeState } from "../../data/admin";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import {
  useAddOneLanguageMutation,
  useRemoveOneLanguageMutation,
  useGetAllLanguagesQuery,

} from "../../data/landenApi";

export default function AppAdmin() {
  const { admin } = useSelector((state) => state.adminState);
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("");
  const [deleteLanguage, setToDeleteLanguage] = useState("");
  const [addLanguage] = useAddOneLanguageMutation();
  const [removeLanguage] = useRemoveOneLanguageMutation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  const {
    data: languages,
    isError,
    isLoading,
    isSuccess,
  } = useGetAllLanguagesQuery();

  //Voegt een land toe
  function handleLanguageSubmit(e) {
    e.preventDefault();
    addLanguage(language);
    setLanguage("");
  }

  //Verwijderd een land volledig
  function handleLanguageRemove(e) {
    e.preventDefault();
    if (deleteLanguage.length > 0) {
      removeLanguage(deleteLanguage);
      setToDeleteLanguage("");
    }
  }

  //Doet een post naar de databank om login voor admin na te kijken
  function handleLoginSubmit(e) {
e.preventDefault();
    axios
      .post("https://wdev2.be/fs_stijn/eindwerk/api/login_check", {
        username: name,
        password: password,
      })
      .then((response) => dispatch(changeState({key: response.data.token})))
      .catch((error) => {
        console.error(error);
      });


  }
  return (
    <>
    <div className="admin">
     <form onSubmit={handleLoginSubmit} className="admin__form">
       <label className="admin__form__label">Gebruikersnaam
        <input value={name} onInput={(e)=>setName(e.target.value)}type="text" className="admin__form__label__input"/></label>
        <label className="admin__form__label">Paswoord
        <input type="password" value={password} onInput={(e)=>setPassword(e.target.value)} className="admin__form__label__input"/></label>
      <button>login</button>
      </form>
      </div>
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
                maxLength="20"
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
                <option defaultValue="">Verwijder taal</option>
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
