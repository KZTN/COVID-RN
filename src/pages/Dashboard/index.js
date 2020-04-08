import React, { useEffect, useState } from "react";
import {FaSearch} from 'react-icons/fa';
import mongodb from '../../services/mongodb';
import "./styles.css";
import DateTime from '../../utils/datetime';
import SpinnerPage from '../../utils/SpinnerPage'
import {capitalize} from '../../utils/capitalize'

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [boxname, setBoxname] = useState('Rio Grande do Norte');
  const [boxsuspects, setBoxsuspects] = useState('-');
  const [boxrefuses, setBoxrefuses] = useState('-');
  const [boxcases, setBoxcases] = useState('-');
  const [boxdeaths, setBoxdeaths] = useState('-');

  const [surname, setSurname] = useState('o');
  const [name, setName] = useState('');

  
  useEffect(() => {
    async function handleAPI() {
      const response = await mongodb.get("/estado");
      setBoxsuspects(response.data.suspects);
      setBoxrefuses(response.data.refuses);
      setBoxcases(response.data.cases);
      setBoxdeaths(response.data.deaths);
    }
    handleAPI();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await mongodb.post('/cidade', {name: capitalize(name)});
      setBoxname(response.data.name);
      setBoxsuspects(response.data.suspects);
      setBoxrefuses(response.data.refuses);
      setBoxcases(response.data.cases);
      setBoxdeaths(response.data.deaths);
      setSurname('e');    
    } catch (error) {
        alert("Cidade não encontrada, digite novamente");

    }
    setLoading(false);
    window.scrollTo(0, 0)
    setName('');
  }

  return (
<>
<div className="box-situation">
        <p>Situação d{surname}</p>
          <div className="box-rn">
            <h1><strong><mark>{boxname}</mark></strong></h1>
          </div>
      </div>
      <div className="box-datetime">
        <span><DateTime/></span>
      </div> 
<form onSubmit={handleSubmit}>
  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Busque por sua cidade"/>
  <button type="submit" disabled={name === ''? true : false}><FaSearch size={24} color="#a277f6"/></button>
</form>
<div className="box-loading">
{loading ? <SpinnerPage/> : null}
</div>
<ul>
      <li className="box-item">
    <header>
      <strong>{boxsuspects}</strong>
    </header>
      <span>Suspeitos</span>
    </li>
    <li className="box-item">
    <header>
        <strong>{boxrefuses}</strong>
    </header>
    <span>Descartados</span>
    </li>
    <li className="box-item">
    <header>
        <strong>{boxcases}</strong>
    </header>
    <span>Confirmados</span>
    </li>
    <li className="box-item">
    <header>
        <strong>{boxdeaths}</strong>
    </header>
    <span>Óbitos</span>
    </li>
 </ul>
 </>
  );
}

