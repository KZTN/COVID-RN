import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import './styles.css';

export default function Form({ onSubmit }) {
    const [inputfield, setInputfield] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('estou enviando: ' + inputfield);
        setInputfield('');
        window.blur();
        await onSubmit({
            inputfield,
        });
    }

    return (
        <section id="form">
            <form className="box-form" onSubmit={handleSubmit}>
                <div className="icon">
                    {isMobile ? (
                        <FaSearch
                            className="icon-search"
                            size={26}
                            color="#6a6a6a"
                        />
                    ) : (
                        <FaSearch
                            className="icon-search"
                            size={30}
                            color="#6a6a6a"
                        />
                    )}
                </div>
                <input
                    id="input"
                    type="text"
                    value={inputfield}
                    onChange={(e) => setInputfield(e.target.value)}
                    placeholder="Busque por sua cidade"
                />
            </form>
        </section>
    );
}
