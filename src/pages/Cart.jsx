import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { getSingleProduct } from "../APIs/Product";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import styled from "styled-components";
import Footer from "../Components/Footer";
import { addProduct, deleteProduct, removeProduct } from "../Redux/CartSlice";
import { client } from "../APIs";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.carts);
  const user = useSelector((state) => state.users);

  const [cartId, setCartId] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const format = (n) => {
    return n.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    const res = cart?.bills?.find(
      (item) =>
        item.billStatus._id === "ac26c381-8d20-4077-831f-215239cdf61a" &&
        item.user._id === user.user._id
    );
    setCartId(res?._id);
  }, [cart, user]);

  console.log(cartId);

  const handleAddProduct = async (id, quantity) => {
    const product = await getSingleProduct(id);
    console.log(product);
    const check = cart.products.find((item) => item.product._id === id);
    await client
      .patch(check._id) // Document ID to patch
      .set({ quantity: quantity + 1 }) // Shallow merge\
      .commit() // Perform the patch and return a promise
      .then((updatedBike) => {
        dispatch(
          addProduct({
            _id: product[0]._id,
            price: product[0].price,
            product: {
              ...product[0],
            },
            quantity: 1,
          })
        );
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });

    await client
      .patch(id) // Document ID to patch
      .set({ quantity: product[0].quantity - 1 }) // Shallow merge\
      .commit() // Perform the patch and return a promise
      .then((updatedBike) => {
        console.log("success", updatedBike);
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });
  };
  const handleRemoveProduct = async (id, quantity) => {
    const product = await getSingleProduct(id);
    const check = cart.products.find((item) => item.product._id === id);
    await client
      .patch(check._id) // Document ID to patch
      .set({ quantity: quantity - 1 }) // Shallow merge\
      .commit() // Perform the patch and return a promise
      .then((updatedBike) => {
        dispatch(
          removeProduct({
            _id: product[0]._id,
            price: product[0].price,
            product: {
              ...product[0],
            },
            quantity: 1,
          })
        );
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });

    await client
      .patch(id) // Document ID to patch
      .set({ quantity: product[0].quantity + 1 }) // Shallow merge\
      .commit() // Perform the patch and return a promise
      .then((updatedBike) => {
        console.log("success", updatedBike);
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });
  };

  const handleDeleteProduct = async (id, price) => {
    const product = await getSingleProduct(id);
    dispatch(
      deleteProduct({
        ...product[0],
        price,
      })
    );
  };

  const handleCheckOut = async () => {
    await client
      .patch(cartId) // Document ID to patch
      .set({
        billStatus: {
          _ref: "752f5b81-1314-4e21-adce-3b39d4561fe4",
        },
      }) // Shallow merge\
      .commit() // Perform the patch and return a promise
      .then((updatedBike) => {
        console.log("success", updatedBike);
        swal("Thông báo", "Thanh toán thành công", "success");
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });

    cart.bills.map((item) =>
      item._id === cartId
        ? {
            ...item,
            billStatus: {
              ...item.billStatus,
              _id: "752f5b81-1314-4e21-adce-3b39d4561fe4",
            },
          }
        : item
    );

    navigate("/history")
  };

  return (
    <Container>
      <Wrapper>
        <Title>GIỎ HÀNG CỦA BẠN</Title>
        <Top>
          <TopButton onClick={() => navigate(-1)}>TIẾP TỤC MUA SẮM</TopButton>
          <TopTexts>
            <TopText>Giỏ hàng({cart.quantity})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart?.products.map((item) => (
              <Product>
                <ProductDetail>
                  <Image src={item?.product?.image?.asset?.url} />
                  <Details>
                    <ProductName>{item?.product?.name}</ProductName>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddIcon
                      onClick={() =>
                        handleAddProduct(item.product._id, item.quantity)
                      }
                      style={{ cursor: "pointer" }}
                    />
                    <ProductAmount>{item.quantity}</ProductAmount>
                    <RemoveIcon
                      onClick={
                        item.quantity > 1 &&
                        (() =>
                          handleRemoveProduct(item.product._id, item.quantity))
                      }
                      style={{ cursor: "pointer" }}
                    />
                    {/* <DeleteOutlineIcon
                      onClick={() =>
                        handleDeleteProduct(item.product._id, item.price)
                      }
                      style={{ color: "red", cursor: "pointer" }}
                    /> */}
                  </ProductAmountContainer>
                  <span
                    style={{
                      fontSize: "24px",
                      padding: "4px 0",
                      marginRight: "24px",
                    }}
                  >
                    X
                  </span>
                  <ProductPrice>{format(item.price)}</ProductPrice>
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
            <Button onClick={handleCheckOut}>THANH TOÁN NGAY</Button>
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
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
    transition: all 0.5s ease;
  }
`;

export default Cart;
