import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { getSingleProduct } from "../APIs/Product";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import styled from "styled-components";
import Footer from "../Components/Footer";
import { addProduct, deleteProduct, removeProduct } from "../Redux/CartSlice";
import { client } from "../APIs";

function Cart() {
  const cart = useSelector((state) => state.carts);
  const dispatch = useDispatch()

  const format = (n) => {
    return n.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const  handleAddProduct = async (id) => {
    const product = await getSingleProduct(id)
    dispatch(
      addProduct({
        ...product[0],
        quantity :1,
      })
    );
  }
  const  handleRemoveProduct = async (id) => {
    const product = await getSingleProduct(id)
    dispatch(
      removeProduct({
        ...product[0],
        quantity :1,
      })
    );
  }

  const  handleDeleteProduct = async (id,price) => {
    const product = await getSingleProduct(id)
    dispatch(
      deleteProduct({
        ...product[0],
        price
      })
    );
  }

  const doc = {
    _type: "role",
    name: "Test",
  }

  const handleCheckOut = () => {
    client.create(doc).then((res) => {
      console.log(`Bill was created, document ID is ${res._id}`)
    })
  }

  return (
    <Container>
      <Wrapper>
        <Title>GIỎ HÀNG CỦA BẠN</Title>
        <Top>
          <TopButton>TIẾP TỤC MUA SẮM</TopButton>
          <TopTexts>
            <TopText>Giỏ hàng({cart.quantity})</TopText>
            <TopText>Danh sách đợi (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart?.products.map((item) => (
              <Product>
                <ProductDetail>
                  <Image src={item?.image?.asset?.url} />
                  <Details>
                    <ProductName>{item.name}</ProductName>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddIcon onClick={() =>  handleAddProduct(item._id)}  style={{cursor: 'pointer'}} />
                    <ProductAmount>{item.quantity}</ProductAmount>
                    <RemoveIcon onClick={item.quantity > 1 && ( () =>  handleRemoveProduct(item._id))} style={{cursor: 'pointer'}}/>
                    <DeleteOutlineIcon onClick={() =>  handleDeleteProduct(item._id,item.price)} style={{color:'red',cursor: 'pointer'}} />
                  </ProductAmountContainer>
                  <ProductPrice>{format(item.price)}
                  </ProductPrice>
                  
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>TÓM TẮT ĐẶT HÀNG</SummaryTitle>
            <SummaryItem>
              <SummaryText>Tổng cộng tạm thời</SummaryText>
              <SummaryPrice>{cart.total}đ </SummaryPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryText>Phí giao hàng</SummaryText>
              <SummaryPrice>18.000đ</SummaryPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryText>Giảm giá thanh toán</SummaryText>
              <SummaryPrice>-18.000đ</SummaryPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryText>Tổng cộng</SummaryText>
              <SummaryPrice>{format(cart.total)} </SummaryPrice>
            </SummaryItem>

            {/* <StripeCheckout
                  name="SREEL"
                  image="https://avatars.githubusercontent.com/u/1486366?v=4"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${cart.total}`}
                  amount={cart.total * 100}
                  stripeKey={"pk_test_51KRGNrKyG1K6atfRya9NVyO2Hb6qEDKSu3OZI4ybO01UGnp0Z4PkYe09TGKPivtEzX3gJeZmu2fRU05mzhpsteb800vfAH7TY6"}
                > */}
            <Button onClick = {handleCheckOut}>THANH TOÁN NGAY</Button>
            {/* </StripeCheckout> */}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 60px;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  font-weight: 700;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 18px;
  margin: 5px;
  border: 1px solid #000;
  padding: 4px 12px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  padding: 20px;
  border-radius: 10px;
  height: 50vh;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryPrice = styled.span``;

const SummaryText = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: #fff;
  font-weight: 600;
`;

export default Cart;
