import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import 'moment/locale/pt-br';
export default function DateTime({ date }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function handleAPI() {
            const formatedDate = moment(date)
                .utcOffset('-03:00')
                .format('HH DD MMMM', 'pt-BR');
            const formatedDateArr = formatedDate.split(' ');
            setData(formatedDateArr);
        }
        handleAPI();
    }, [date]);
    return (
        <>
            Até às {data[0]}h do dia {data[1]} de {data[2]}
        </>
    );
}
