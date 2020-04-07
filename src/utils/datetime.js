import React, { useEffect, useState } from "react";
import * as moment from 'moment';
import 'moment/locale/pt-br';
import api from '../services/api'
export default function DateTime() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function handleAPI() {
      const response = await api.get("/");
      const formatedDate = moment(response.data.datetime).utcOffset("-03:00").format("HH DD MMMM", 'pt-BR');
      const formatedDateArr = formatedDate.split(' ');
      setData(formatedDateArr);
    }
    handleAPI();
  }, []);
  return (
      <>
        Até às {data[0]}h do dia {data[1]} de {data[2]}
      </>
  );
}

