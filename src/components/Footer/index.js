import React from 'react'
import {FaEnvelope} from 'react-icons/fa'
import icon from '../../assets/icon.png'
import Emoji from '../../interfaces/emoji'
import './styles.css'
export default function Footer() {

    return (
        <footer>
    <div className="item" style={{marginTop: 20}}>
        <div className="box-madewith">
          <a href="https://github.com/KZTN" style={{color: "inherit"}}> Feito com <Emoji symbol="💙"/></a>
        </div> 
        <hr/>
    <div className="box-hashtag" style={{marginTop: 10}}>
        <div className="hashtag-item">#FIQUEEMCASA</div>
        <div className="hashtag-item">#RNNAQUARENTENA</div>
    </div>
    </div>
    <div className="item box-column">
      <img src={icon} alt="logomarca COVID-RN" style={{width: 64, height: 64}}/>
      <span>© 2020 COVID-RN</span>
      <span>Release v0.7156</span>
    </div>
  </footer>
    );
}