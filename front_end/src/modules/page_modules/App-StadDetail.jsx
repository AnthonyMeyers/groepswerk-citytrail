import { useContext } from "react";
import { AdminContext } from "../../Provider";

const AppStadDetail = () => {
  const { admin } = useContext(AdminContext);
  return (
    <>
      <section className="staddetail">
        <h2 className="staddetail__title">Details stad</h2>
        {admin && (
          <div className="admin">
            <button className="admin__button">Stad bewerken</button>
            <button className="admin__button">Stad verwijderen</button>
            <button className="admin__button">Monument toevoegen</button>
          </div>
        )}
      </section>
    </>
  );
};

export default AppStadDetail;
