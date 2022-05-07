import { useState, useEffect } from "react";
import axios from "axios";

export function getData(path) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        setData([]);
        const { data } = await axios(path, {
          headers: { accept: "application/json" },
        });
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

export function getDataRecords(path) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        setData([]);
        const {
          data: { records },
        } = await axios(path, {
          headers: { accept: "application/json" },
        });
        setLoading(false);
        setData(records);
      } catch (error) {
        setLoading(false);
        setError(true);
        setData([]);
      }
    })();
  }, []);

  return [data, error, loading];
}
