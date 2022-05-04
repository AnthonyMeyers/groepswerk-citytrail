import { useState, useEffect } from "react";
import axios from "axios";

export default function getData(path) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("ok");
    (async () => {
      try {
        setLoading(true);
        setError(false);
        setData([]);
        const { data } = await axios(path);
        setLoading(false);
        setData(data);
      } catch (error) {
        setLoading(false);
        setError(true);
        setData([]);
      }
    })();
  }, []);

  return [data, error, loading];
}
