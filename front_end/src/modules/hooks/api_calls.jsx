import { useState, useEffect } from "react";
import axios from "axios";

export default function getData(path) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const {
          data: { body: countrylist },
        } = await axios(path);
        setLoading(false);
        setCountries(countrylist);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    })();
  }, []);

  return [countries, error, loading];
}
