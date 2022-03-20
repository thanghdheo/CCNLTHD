import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getSingleProduct } from "../../APIs/Product";
import { addProduct } from "../../Redux/CartSlice";
function ProductItem(props) {
  const { id, img, price, title } = props;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getSingleProduct(id).then((data) => setProduct(...data));
  }, [id]);

  const format = (n) => {
    return n.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const dispatch = useDispatch();

  const handleAddBuy = () => {
    dispatch(
      addProduct({
        ...product,
        quantity,
      })
    );
  };
  return (
    <Container>
      <Link to={`/product/${id}`}>
        <Image src={img} alt="" />
      </Link>
      <IconContainer>
          <Link to={`/product/${id}`} style={{color:'#fff',textDecoration:'none'}}>
        <Button>
            mua ngay <i className="wi wi-night-partly-cloudy"></i>
        </Button>
          </Link>
        <Button onClick={handleAddBuy}>thêm vào giỏ</Button>
      </IconContainer>
      <ProductInfo>
        <Link to={`/product/${id}`}>
          <Title>{title}</Title>
        </Link>
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
  padding: 12 px;
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
