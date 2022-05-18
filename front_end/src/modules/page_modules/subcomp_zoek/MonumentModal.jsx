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

  const {
    data: monument,
    isLoading,
    isError,
    isSuccess,
  } = useGetOneMonumentQuery(monumentId);

  const [updateMonument] = useUpdateOneCityMutation();
  const [showModal, setShowModal] = useState(false);
  const [monumentName, setMonumentName] = useState("");
  const [description, setDescription] = useState("");
  const [monumentimg, setMonumentImg] = useState("");
  return (
    <div>
      <a id="myBtn" onClick={() => setShowModal(!showModal)}>
        {children}
      </a>

      {showModal && (
        <div id="myModal" class="modal">
          {admin && (
            <form>
              <label>
                <input type="text" />
              </label>
            </form>
          )}
          <div class="modal-content">
            <span class="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h3>{children}</h3>
            {isSuccess && (
              <>
                <p>{monument.description}</p>
                {isSuccess && monument.img && (
                  <img src={monument.img} alt={"foto van " + children} />
                )}
                {isSuccess &&
                  monument.img &&
                  monument.img.length ==
                    0(<img src={monument.img} alt={"foto van " + children} />)}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonumentModal;
