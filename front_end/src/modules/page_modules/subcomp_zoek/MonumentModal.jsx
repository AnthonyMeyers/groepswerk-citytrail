import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetOneMonumentQuery,
  useUpdateOneCityMutation,
  useUpdateOneMonumentMutation,
} from "../../../data/landenApi";
import React from "react";

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
    if (monument && monument.name != null && monument.name.length > 0) {
      setMonumentName(monument.name);
    }
    if (monument && monument.description != null) {
      setDescription(monument.description);
    }
    if (monument && monument.img != null) {
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
    <div>
      <a id="myBtn" onClick={() => setShowModal(!showModal)}>
        {children}
      </a>

      {showModal && (
        <div id="myModal" class="modal">
          <div class="modal-content">
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
                      maxlength="20"
                      required
                      className="admin__form__label__input"
                    />
                  </label>
                  <label className="admin__form__label">
                    Beschrijving
                    <textarea
                      value={description}
                      onInput={(e) => setDescription(e.target.value)}
                      maxlength="500"
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
                  <button type="submit" className="admin__form__button">
                    Wijzig monument
                  </button>
                </form>
              </div>
            )}
            <span class="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h3>{monument.name}</h3>
            {isSuccess && (
              <>
                <p>{monument.description}</p>
                {isSuccess && monument.img && monument.img.length > 0 && (
                  <img src={monument.img} alt={"foto van " + children} />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonumentModal;
