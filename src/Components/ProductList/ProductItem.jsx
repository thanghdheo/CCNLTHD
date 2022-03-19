import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
function ProductItem(props) {
  const { id, img, price, title } = props;
  const format = (n) => {
    return n.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <Container>
      <Image src={img} alt="" />
      <IconContainer>
        <Button>
          mua <i className="wi wi-night-partly-cloudy"></i>
        </Button>
        <Button>thêm vào giỏ</Button>
      </IconContainer>
      <ProductInfo>
        <Title>{title}</Title>
        <Price>{format(price)}</Price>
      </ProductInfo>
    </Container>
  );
}

const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 90px;
  right: 0;
  left: 0;
  opacity: 0;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  width: 25%;
  position: relative;

  &:hover ${IconContainer} {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 70%;
  height: 250px;
  display: block;
  margin: auto;
  cursor: pointer;
`;

const Button = styled.button`
  text-transform: uppercase;
  background-color: #000;
  color: #fff;
  border: none;
  outline: none;
  width: 170px;
  padding: 12px 0;
  font-size: 10px;
  margin: 6px;
  cursor: pointer;
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
`;

const Title = styled.h5`
  font-size: 14px;
  cursor: pointer;
`;

const Price = styled.span`
  font-size: 14px;
  padding: 12px;
  font-weight: 500;
  color: #3d3c3c;
  cursor: pointer;
`;

export default ProductItem;
