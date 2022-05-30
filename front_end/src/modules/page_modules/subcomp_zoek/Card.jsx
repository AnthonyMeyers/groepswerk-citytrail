import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useRemoveOneLandMutation } from "../../../data/landenApi";

export default function CountryCard({ country, id, flag }, className) {
  const { admin } = useSelector((state) => state.adminState);
  const [removeOneLand] = useRemoveOneLandMutation();

  return (
    <>
      <div className={className === "shrink" ? "card shrink" : "card"}>
        <div className="card__imgholder">
          <NavLink to={`/land/${id}`}>
            <img
              className="card__imgholder__img"
              alt="land foto"
              src=".\src\images\new_york.jpg"
            />
            <img className="card__imgholder__flag" alt="vlag land" src={flag} />
          </NavLink>
        </div>

        <div className="card__text">
          <NavLink to={`/land/${id}`} className="card__text__link">
            <h3 className="card__text__link__title">{country}</h3>
          </NavLink>
        </div>
        {admin && (
          <a className="card__remove" onClick={() => removeOneLand(id)}></a>
        )}
      </div>
    </>
  );
}
