import React from 'react'
import {FaEnvelope, FaGlobe} from 'react-icons/fa'
import icon from '../../assets/icon.png'
import Emoji from '../../interfaces/emoji'
import './styles.css'
export default function Footer() {

    return (
        <footer>
          <div className="item">
            <div className="box-column">
              <div className="box-reference">
                <div className="box-madewith">
                  <a href="https://github.com/KZTN" target="_blank" rel="noopener noreferrer" style={{color: "inherit", fontWeight: "bold", fontSize: 15}}> Feito com <Emoji symbol="💙"/></a>
                </div> 
              </div>
              <div className="box-reference">
                <div className="reference-msg"><a href="http://www.saude.rn.gov.br/" target="_blank" rel="noopener noreferrer" style={{color: "inherit"}}>Fonte de dados: SESAP</a></div>
                <div className="reference-icon"><a href="http://www.saude.rn.gov.br/" target="_blank" rel="noopener noreferrer" style={{color: "inherit"}}><FaGlobe size={14} color="#353244"/></a></div>
              </div>
              <div className="box-reference">
                <div className="reference-msg"><a href="mailto: oicovidrn@gmail.com" style={{color: "inherit"}}>Contato: EMAIL</a></div>
                <div className="reference-icon"><a href="mailto: oicovidrn@gmail.com" style={{color: "inherit"}}><FaEnvelope size={14} color="#353244"/></a></div>
              </div>
            </div>
          </div>
    <div className="item">
        <hr/>
    <div className="box-hashtag">
        <div className="hashtag-item">#FIQUEEMCASA</div>
        <div className="hashtag-item">#RNNAQUARENTENA</div>
    </div>
    </div>
    <div className="item">
      <div className="box-column">
        <img src={icon} alt="logomarca COVID-RN" style={{width: 64, height: 64}}/>
        <div className="box-info">
        <span>© 2020 COVID-RN</span>
        <span>Release v0.7178</span>
        </div>

      </div>
    </div>
  </footer>
    );
}