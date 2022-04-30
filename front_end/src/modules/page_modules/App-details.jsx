import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  useParams,
} from "react-router-dom";
import axios from "axios";

const AppDetail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios(
        `http://localhost:8000/api/single_read.php/?lan_id=${id}`
      );
      setCountry(data);
      console.log(data);
    })();
  }, []);
  return (
    <div>
      <h1>
        {country.lan_id} - {country.lan_naam}
      </h1>
      <NavLink to={`/landen`}>
        <button>Go back</button>
      </NavLink>
    </div>
  );
};

export default AppDetail;
