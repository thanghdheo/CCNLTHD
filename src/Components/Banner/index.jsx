import React from 'react'
import Slider from 'react-slick';
import styled from 'styled-components';

function Banner() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
      };
      return (
        <Carousel {...settings}>
          <Wrap>
            <img src="/slideshow_1.jpeg" alt="" />
          </Wrap>
          <Wrap>
            <img src="/slideshow_2.webp" alt="" />
          </Wrap>
        </Carousel>
      );
    }
    
    const Carousel = styled(Slider)`
      ul li button {
        &:before {
          font-size: 10px;
          color: rgb(150, 158, 171);
        }
      }
    
      li.slick-active button:before {
        color: #fff;
      }
    
      .slick-list {
        overflow: visible;
      }
    
      button {
        z-index: 1;
      }
    `;
    const Wrap = styled.div`
        cursor: pointer;
        img{
            border: 4px solid transparent;
            border-radius : 4px;
            width: 100%;
            height: 100%;
            box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
            rgb(0 0 0 / 73%) 0px 16px 10px -10px;
            transition-duration: 300ms;
        }
    
        &:hover{
            border: 4px solid rgba(249,249,249,0.8);
        }
    `;

export default Banner