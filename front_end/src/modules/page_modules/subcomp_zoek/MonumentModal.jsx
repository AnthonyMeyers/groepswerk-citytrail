import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetOneMonumentQuery,
  useUpdateOneMonumentMutation,
} from "../../../data/landenApi";
import React from "react";
import { Status, Messagebar } from "../../hooks/main_functions";

const MonumentModal = ({ children, monumentId }) => {
  const { admin } = useSelector((state) => state.adminState);
  const [updateMonument] = useUpdateOneMonumentMutation();
  const [errorHandler, setErrorHandler] = useState("")
  const {
    data: monument,
    isLoading,
    isError,
    isSuccess,
  } = useGetOneMonumentQuery(monumentId);

  const [showModal, setShowModal] = useState(false);
  const [monumentName, setMonumentName] = useState("");
  const [description, setDescription] = useState("");
  const [monumentImg, setMonumentImg] = useState("");

  useEffect(() => {
    if (monument && "name" in monument && monument.name.length > 0) {
      setMonumentName(monument.name);
    }
    if (monument && "description" in monument) {
      setDescription(monument.description);
    }
    if (monument && "img" in monument) {
      setMonumentImg(monument.img);
    }
  }, [monument]);

  function handleSubmitClick(e) {
    e.preventDefault();
    setErrorHandler("");
    if(monumentName.length >=2 && monumentName.length <= 20){
      if(description.length >= 5 && description.length <=500){
    updateMonument({
      id: monument.id,
      name: monumentName,
      description,
      img: monumentImg,
    });
  } else{setErrorHandler("Een beschrijving kan vanaf 5 tot en met 500 tekens bevatten.")}
  }  else{setErrorHandler("Een monument kan vanaf 2 tot en met 20 tekens bevatten.")}
  }
  return (
    <>
      <a
        id="myBtn"
        onClick={() => setShowModal(!showModal)}
        className="staddetail__list__item__link"
      >
        {children}
      </a>

      {showModal && (
        <div id="myModal" className="modal">
          <div className="modal__content">
            {admin && (<>
              <div className="admin">
                <form onSubmit={handleSubmitClick} className="admin__form">
                  <label className="admin__form__label">
                    Monument naam
                    <input
                      type="text"
                      value={monumentName}
                      onInput={(e) => setMonumentName(e.target.value)}
                      maxLength="30"
                      required
                      className="admin__form__label__input"
                    />
                  </label>
                  <label className="admin__form__label">
                    Foto
                    <input
                      type="text"
                      value={monumentImg}
                      onInput={(e) => setMonumentImg(e.target.value)}
                      className="admin__form__label__input"
                    />
                  </label>
                  <label className="admin__form__label admin__form__label-textarea">
                    Beschrijving
                    <textarea
                      value={description}
                      onInput={(e) => setDescription(e.target.value)}
                      maxLength="500"
                      className="admin__form__label__textarea"
                    />
                  </label>

                  <button type="submit" className="admin__form__button">
                    Wijzig monument
                  </button>
                </form>
                
              </div>
              {errorHandler.length > 0 && <Messagebar>{errorHandler}</Messagebar>}
            </>)}
            <span
              className="modal__content__close"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <Status
            loading={isLoading}
            error={isError}
            loader={"/fs_anthonym/groepswerk/images/loading.gif"}
          />
            {isSuccess && "name" in monument && (
              <h3 className="modal__content__title">{monument.name}</h3>
            )}
            {isSuccess && (
              <>
                <p className="modal__content__description">
                  {monument.description}
                </p>
                {isSuccess && "img" in monument && monument.img.length > 0 && (
                  <img
                    src={monument.img}
                    alt={"foto van " + children}
                    className="modal__content__photo"
                  />
                )}

              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MonumentModal;
