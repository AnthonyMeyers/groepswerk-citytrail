import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  useRemoveOneLandMutation,
  useRemoveOneCityMutation,
  useRemoveOneMonumentMutation,
} from "../../../data/landenApi";

export default function CountryCard({ country, id }, className) {
  const { admin } = useSelector((state) => state.adminState);
  const [removeOneLand] = useRemoveOneLandMutation();

  return (
    <>
      <div className={className === "shrink" ? "card shrink" : "card"}>
        <NavLink to={`/land/${id}`}>
          <div className="card__imgholder">
            <img
              className="card__imgholder__img"
              alt="land foto"
              src=".\src\images\new_york.jpg"
            />
            <img
              className="card__imgholder__flag"
              alt="vlag land"
              src=".\src\images\america.png"
            />
          </div>
        </NavLink>
        <div className="card__text">
          <NavLink to={`/land/${id}`}>
            <h3 className="card__text__title">{country}</h3>
          </NavLink>
        </div>
        {admin && (
          <a className="card__remove" onClick={() => removeOneLand(id)}></a>
        )}
      </div>
    </>
  );
}
