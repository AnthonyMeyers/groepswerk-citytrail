import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetOneMonumentQuery,
  useUpdateOneMonumentMutation,
} from "../../../data/landenApi";
import React from "react";
import { Status } from "../../hooks/main_functions";

const MonumentModal = ({ children, monumentId }) => {
  const { admin } = useSelector((state) => state.adminState);
  const [updateMonument] = useUpdateOneMonumentMutation();

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
    updateMonument({
      id: monument.id,
      name: monumentName,
      description,
      img: monumentImg,
    });
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
          <Status
            loading={isLoading}
            error={isError}
            loader={"../src/images/loading.gif"}
          />
          <div className="modal__content">
            {admin && (
              <div className="admin">
                <form onSubmit={handleSubmitClick} className="admin__form">
                  <label className="admin__form__label">
                    Monument naam
                    <input
                      type="text"
                      value={monumentName}
                      onInput={(e) => setMonumentName(e.target.value)}
                      minLength="2"
                      maxLength="20"
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
            )}
            <span
              className="modal__content__close"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            {isSuccess && "name" in monument && (
              <h3 className="modal__content__title">{monument.name}</h3>
            )}
            {isSuccess && (
              <>
                {isSuccess && "img" in monument && monument.img.length > 0 && (
                  <img
                    src={monument.img}
                    alt={"foto van " + children}
                    className="modal__content__photo"
                  />
                )}
                <p className="modal__content__description">
                  {monument.description}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MonumentModal;
