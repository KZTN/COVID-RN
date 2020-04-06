import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.css";
export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function handleAPI() {
      const response = await api.get("/");
      setData(response.data);
    }
    handleAPI();
  }, []);
  return (
 <ul>
      <li className="box-item">
    <header>
      <strong>{data.suspects}</strong>
    </header>
      <span>Suspeitos</span>
    </li>
    <li className="box-item">
    <header>
        <strong>{data.refuses}</strong>
    </header>
    <span>Descartados</span>
    </li>
    <li className="box-item">
    <header>
        <strong>{data.cases}</strong>
    </header>
    <span>Confirmados</span>
    </li>
    <li className="box-item">
    <header>
        <strong>{data.deaths}</strong>
    </header>
    <span>Óbitos</span>
    </li>
 </ul>
  );
}

