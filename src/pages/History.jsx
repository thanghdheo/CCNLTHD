import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Components/Footer";

function History() {
  const user = useSelector((state) => state.users);
  const cart = useSelector((state) => state.carts);
  const [billSuccess, setBillSuccess] = useState();

  useEffect(() => {
    const res = cart?.bills?.filter(
      (item) =>
        item.billStatus._id === "752f5b81-1314-4e21-adce-3b39d4561fe4" &&
        item.user._id === user.user._id
    );
    setBillSuccess(res);
  }, [cart, user]);

  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Title>LỊCH SỬ THANH TOÁN ({billSuccess?.length})</Title>
        <Top>
          <TopButton onClick={() => navigate("/")}>Trang chủ</TopButton>
        </Top>
        <Bottom>
          <Info>
            {billSuccess?.map((item) => (
              <Product key={item._id}>
                <ProductDetail>
                  <Details>
                    <h2>Mã hoá đơn</h2>
                    <ProductName>{item._id}</ProductName>
                  </Details>
                </ProductDetail>
                <PriceDetail style={{ color: "green" }}>
                  Đã thanh toán
                </PriceDetail>
              </Product>
            ))}

            <Hr />
          </Info>
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
  font-weight: 500;
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
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
    transition: all 0.5s ease;
  }
`;

export default History;
