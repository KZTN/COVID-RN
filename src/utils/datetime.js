import React, { useEffect, useState } from "react";
import * as moment from 'moment';
import 'moment/locale/pt-br';
import mongodb from '../services/mongodb'
export default function DateTime() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function handleAPI() {
      const response = await mongodb.get("/uf/RN");
      const formatedDate = moment(response.data.date[0]).utcOffset("-03:00").format("HH DD MMMM", 'pt-BR');
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

