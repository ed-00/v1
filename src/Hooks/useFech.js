import { useCallback, useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [data, setData] = useState(null);


  const fetchGeoData = useCallback(() => {
    setIsLoading(true);
    axios(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setHasError(err);
      });
    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    fetchGeoData();
    return () => {};
  }, [fetchGeoData]);

  return {
    isLoading,
    hasError,
    data,
    setData,
  };
};

export default useFetch;
