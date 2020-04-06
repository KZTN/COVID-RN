import React, { useEffect, useState } from "react";
import api from '../services/api'
export default function DateTime() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function handleAPI() {
      const response = await api.get("/");
      setData(response.data);
    }
    handleAPI();
  }, []);
  return (
      <>
        <span>{data.datetime}</span>
      </>
  );
}

