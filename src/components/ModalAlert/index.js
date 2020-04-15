import React, {useState, useEffect} from 'react';
import './styles.css';
import mongodb from '../../services/mongodb';
export default function MOdalAlert() {
    const [show, setShow] = useState(true);
    const [msg, setMsg] = useState();
    useEffect(() => {
        async function getData() {
            const response = await mongodb.get('/msg');
            setMsg(response.data[0]);
        }
        getData();
    }, []);
    console.log(msg);

    const handleClose = () => setShow(false);
  
    return (
        <>
        {msg && (
            alert(msg.description)
        )}
      </>
    );
  }
  