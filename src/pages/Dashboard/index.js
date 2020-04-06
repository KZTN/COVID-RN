import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Chart from "./chart";
import "./styles.css";
export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function handleAPI() {
      const response = await api.get("/");
      setData(response.data);
    }
    handleAPI();
  }, []);
  return (
    <div className="dashboard">
      <table class="rwd-table">
        <tr>
          <th>Casos</th>
          <th>Mortes</th>
          <th>Suspeitos</th>
          <th>Descartados</th>
        </tr>
        <tr>
          <td data-th="cases">{data.cases}</td>
          <td data-th="deaths">{data.deaths}</td>
          <td data-th="suspects">{data.suspects}</td>
          <td data-th="refuses">{data.refuses}</td>
        </tr>
      </table>
      <p>Data da última atualização: {data.datetime}</p>
    </div>
  );
}

