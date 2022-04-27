import axios from "axios";
import { useState } from "react";
const usePost = ({ url, method }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);

  const post = ({ path, data }) => {
    setIsUploading(true);
    axios({ method, url: url + path, data })
      .then((res) => {
        if (!res.OK)
          throw new Error(
            `Somthing went wring with your request ${res.status}`
          );
        setData(res.json());
      })
      .catch((err) => setErr(err.message));
    setIsUploading(false);
  };
  return {
    post,
    isUploading,
    err,
    data,
  };
};

export default usePost;
