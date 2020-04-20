import React, {useEffect, useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import styled from 'styled-components'
import './styles.css';
import mongodb from '../../services/mongodb';
import {isMobile} from 'react-device-detect';




export default function Top10() {
const [boxdeathrate, setBoxdeathrate] = useState("-");
const [boxcountcities, setBoxcountcities] = useState("-");
const [boxaffectedcities, setBoxaffectedcities] = useState("-");
const [boxaffectedcitiesbypercentage, setBoxaffectedcitiesbypercentage] = useState("-");
const [boxmostcasecity, setBoxmostcasecity] = useState("-");
const [boxCountsamples, setboxCountsamples] = useState("-");
useEffect(() => {
    async function getDeathrate() {
        const deathrateResponse = await mongodb.post('/stateshow', {name: "Rio Grande do Norte"});
        setBoxdeathrate(((deathrateResponse.data.deaths[0]*100)/(deathrateResponse.data.cases[0])).toFixed(1));
        setboxCountsamples(deathrateResponse.data.date.length);
    };
    async function getCountcities() {
        const countcitiesResponse = await mongodb.get('/cidades');
        setBoxcountcities(countcitiesResponse.data.length);
    };
    async function getAffectedcities() {
        const affectedcitiesResponse = await mongodb.get('/maps');
        setBoxaffectedcities(affectedcitiesResponse.data.length)
    };

    async function getMostcasecity() {
        const mostcasecityResponse = await mongodb.post('/rank/1', {criteria: "cases"});
        setBoxmostcasecity(mostcasecityResponse.data[0].name);
    }
    function calculateAffectedcitiesbypercentage() {
        setBoxaffectedcitiesbypercentage(((boxaffectedcities*100)/167).toFixed(1));
    }
    getDeathrate();
    getCountcities();
    getAffectedcities();
    getMostcasecity();
    calculateAffectedcitiesbypercentage();
}, [boxaffectedcities]);
const Wrapper = styled.div`
width: 100%;
margin: 30px auto 30px auto;
display: flex,
flex-direction: column;
    
`;
const Page = styled.div`
height: 180px;
height: 180px;
`;
const Content = styled.div`
box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.2);
background: #f5f5f2;
border-radius: 8px;
height: 100%;

display: flex;
flex-direction: column;
align-items: center;
`;
        return(
            <Wrapper>
                <Slider
                    centerMode={isMobile?true:false}
                    infinite={false}
                    speed={500}
                    slidesToShow={isMobile?1:3}
                    slidesToScroll={isMobile?1:3}
                    dots={true}
                    adaptiveHeight={true}
                    arrows={false}
                >
                    <Page><Content className={isMobile?"top-content-mobile":"top-content"}><strong>{boxcountcities}</strong><span>Cidades sob monitoramento</span></Content></Page>
                    <Page><Content className={isMobile?"top-content-mobile":"top-content"}><strong>{boxaffectedcities}</strong><span>Cidades afetadas</span></Content></Page>
                    <Page>
                        <Content className={isMobile?"top-content-mobile":"top-content"}>
                            <div classname="box-rank" style={{display: "flex", flexDirection: "row"}}>
                                <strong style={{fontSize: 78}}>{boxaffectedcitiesbypercentage}</strong>
                                <div class="small-percentage" style={{fontSize: 48, margin: "58px 0 0 0", color: "#666"}}>%</div>
                            </div>
                            <span>índice de cidades afetadas</span></Content></Page>
                    <Page><Content className={isMobile?"top-content-mobile":"top-content"}><strong>{boxCountsamples}</strong><span>Amostras coletadas</span></Content></Page>
                    <Page><Content className={isMobile?"top-content-mobile":"top-content"}><strong>{boxmostcasecity}</strong><span>Cidade com mais casos</span></Content></Page>
                    <Page>
                        <Content className={isMobile?"top-content-mobile":"top-content"} style={{background: "#000"}}>
                            <div classname="box-rank" style={{display: "flex", flexDirection: "row"}}>
                                <strong style={{fontSize: 78, color: "#fff"}}>{boxdeathrate}</strong>
                                <div class="small-percentage" style={{fontSize: 48, margin: "58px 0 0 0", color: "#fff"}}>%</div>
                            </div>
                            <span style={{color: "#fff"}}>Índice de casos fatais</span></Content></Page>

                    
                </Slider>
            </Wrapper>
        );
}