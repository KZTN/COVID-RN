import React, {useEffect, useState, Component} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import styled from 'styled-components'
import './styles.css';
import mongodb from '../../services/mongodb';

const Wrapper = styled.div`
    width: 50%;
    margin: 30px auto 30px auto;
`;
const Page = styled.div`
`;

export default class Top10 extends Component {
    render() {
        return(
            <Wrapper>
                <Slider
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    infinite={false}
                    dots={true}
                    adaptiveHeight={true}
                    arrows={false}
                >
                    <Page>Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1</Page>
                    <Page>Page 2Page 2Page 2Page 2Page 2Page 2Page 2Page 2Page 2Page 2Page 2Page 2Page 2Page 2Page 2Page 2Page 2Page 2Page 2</Page>
                    <Page>Page 3Page 3Page 3Page 3Page 3Page 3Page 3Page 3Page 3Page 3Page 3Page 3Page 3Page 3Page 3Page 3Page 3Page 3Page 3</Page>

                    
                </Slider>
            </Wrapper>
        );
    }
}