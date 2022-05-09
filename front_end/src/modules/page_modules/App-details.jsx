import { Status } from "../hooks/main_functions";
import { NavLink, useParams } from "react-router-dom";
import {
  useGetOneLandQuery,
  useGetStedenLandQuery,
} from "../../data/landenApi";
import { useSelector } from "react-redux";

const AppDetail = () => {
  const { id } = useParams();

  const { admin } = useSelector((state) => state.adminState);

  const {
    data: land,
    isError: errorLand,
    isLoading: loadingLand,
  } = useGetOneLandQuery(id);

  const {
    data: steden,
    isError: errorSteden,
    IsLoading: loadingSteden,
  } = useGetStedenLandQuery(id);

  return (
    <section className="detail">
      <h2 className="search__title">
        Detailpagina {land && land.lan_naam + ` (${land.lan_id})`}
      </h2>
      {admin && (
        <div className="admin">
          <button className="admin__button">Land bewerken</button>
          <button className="admin__button">Land verwijderen</button>
          <button className="admin__button">Stad toevoegen</button>
        </div>
      )}
      <Status error={errorLand} loading={loadingLand} />
      {errorSteden && <h3 className="error">Geen steden gevonden</h3>}
      {loadingSteden && <h3 className="loading">Zoekt steden</h3>}
      {land &&
        steden &&
        steden.length > 0 &&
        steden
          .filter((value) => value != null)
          .map(({ std_naam, std_id }, i) => (
            <div key={std_id}>
              <NavLink to={`/land/${land.lan_id}/stad/${std_id}`}>
                <h3>{std_naam}</h3>
              </NavLink>
            </div>
          ))}

      <NavLink to={`/landen`}>
        <button className="detail__button">Ga terug</button>
      </NavLink>
    </section>
  );
};

export default AppDetail;
