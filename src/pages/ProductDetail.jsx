import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { client } from "../APIs";
import { getSingleProduct } from "../APIs/Product";
import Footer from "../Components/Footer";
import { addBills, addProduct } from "../Redux/CartSlice";
import swal from "sweetalert";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cartId, setCartId] = useState();
  const [productQuantity, setProductQuantity] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.carts);
  const user = useSelector((state) => state.users);

  useEffect(() => {
    const res = cart?.bills?.find(
      (item) =>
        item.billStatus._id === "ac26c381-8d20-4077-831f-215239cdf61a" &&
        item.user._id === user.user._id
    );
    setCartId(res?._id);
  }, [cart, user]);

  useEffect(() => {
    setProductQuantity(product?.product?.quantity);
  }, [product]);

  const format = (n) => {
    return n?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const { id } = useParams();

  const bill = {
    _type: "bill",
    billStatus: {
      _ref: "ac26c381-8d20-4077-831f-215239cdf61a",
    },
    user: {
      _ref: user.user._id,
    },
  };

  const billdetail = {
    _type: "bill-detail",
    bill: {
      _ref: cartId,
    },
    price: product.price,
    product: {
      _ref: id,
    },
    quantity: quantity,
  };

  useEffect(() => {
    getSingleProduct(id).then((data) =>
      setProduct({
        _id: data[0]._id,
        price: data[0].price,
        product: {
          ...data[0],
        },
      })
    );
  }, [id]);

  const handleBuyStock = async () => {
    if (productQuantity > 0) {
      if (JSON.parse(localStorage.getItem("token"))) {
        const exist = cart?.bills?.some(
          (item, index) =>
            item.billStatus._id === "ac26c381-8d20-4077-831f-215239cdf61a" &&
            item.user._id === user.user._id
        );
        if (!exist) {
          //Create bill

          await client.create(bill).then((res) => {
            dispatch(
              addBills({
                _id: res._id,
                billStatus: {
                  _id: res.billStatus._ref,
                },
                user: {
                  _id: res.user._ref,
                },
              })
            );
          });

          //Add

          await client.create(billdetail).then((res) => {
            dispatch(
              addProduct({
                ...product,
                _id: res._id,
                quantity,
              })
            );
          });

          await client
            .patch(id) // Document ID to patch
            .set({ quantity: productQuantity - 1 }) // Shallow merge\
            .commit() // Perform the patch and return a promise
            .then((updatedBike) => {
              console.log("success", updatedBike);
            })
            .catch((err) => {
              console.error("Oh no, the update failed: ", err.message);
            });

          setProductQuantity(productQuantity - 1);
        } else {
          const check = cart.products.find(
            (item) => item.product._id === product._id
          );
          if (!check) {
            await client.create(billdetail).then((res) => {
              dispatch(
                addProduct({
                  ...product,
                  _id: res._id,
                  quantity,
                })
              );
            });

            await client
              .patch(id) // Document ID to patch
              .set({ quantity: productQuantity - 1 }) // Shallow merge\
              .commit() // Perform the patch and return a promise
              .then((updatedBike) => {
                console.log("success", updatedBike);
              })
              .catch((err) => {
                console.error("Oh no, the update failed: ", err.message);
              });

            setProductQuantity(productQuantity - 1);

            navigate("/cart");
          } else {
            await client
              .patch(check._id)
              .set({ quantity: check.quantity + 1 })
              .commit()
              .then((updatedBike) => {
                dispatch(
                  addProduct({
                    ...product,
                    quantity,
                  })
                );
                navigate("/cart");
              })
              .catch((err) => {
                console.error("Oh no, the update failed: ", err.message);
              });

            await client
              .patch(id) // Document ID to patch
              .set({ quantity: productQuantity - 1 }) // Shallow merge\
              .commit() // Perform the patch and return a promise
              .then((updatedBike) => {
                console.log("success", updatedBike);
              })
              .catch((err) => {
                console.error("Oh no, the update failed: ", err.message);
              });

            setProductQuantity(productQuantity - 1);
          }
        }
      } else {
        navigate("/login");
      }
    } else {
      swal("Thông báo", "Sản phẩm đã hết hàng", "warning");
    }
  };
  const handleAddBuy = async () => {
    if (productQuantity > 0) {
      if (JSON.parse(localStorage.getItem("token"))) {
        const exist = cart?.bills?.some(
          (item, index) =>
            item.billStatus._id === "ac26c381-8d20-4077-831f-215239cdf61a" &&
            item.user._id === user.user._id
        );
        if (!exist) {
          await client.create(bill).then((res) => {
            dispatch(
              addBills({
                _id: res._id,
                billStatus: {
                  _id: res.billStatus._ref,
                },
                user: {
                  _id: res.user._ref,
                },
              })
            );
          });

          await client.create(billdetail).then((res) => {
            dispatch(
              addProduct({
                ...product,
                _id: res._id,
                quantity,
              })
            );
          });

          await client
            .patch(id) // Document ID to patch
            .set({ quantity: productQuantity - 1 }) // Shallow merge\
            .commit() // Perform the patch and return a promise
            .then((updatedBike) => {
              console.log("success", updatedBike);
            })
            .catch((err) => {
              console.error("Oh no, the update failed: ", err.message);
            });

          setProductQuantity(productQuantity - 1);
        } else {
          const check = cart.products.find(
            (item) => item.product._id === product._id
          );
          if (!check) {
            await client.create(billdetail).then((res) => {
              dispatch(
                addProduct({
                  ...product,
                  _id: res._id,
                  quantity,
                })
              );
            });

            await client
              .patch(id) // Document ID to patch
              .set({ quantity: productQuantity - 1 }) // Shallow merge\
              .commit() // Perform the patch and return a promise
              .then((updatedBike) => {
                console.log("success", updatedBike);
              })
              .catch((err) => {
                console.error("Oh no, the update failed: ", err.message);
              });

            setProductQuantity(productQuantity - 1);
          } else {
            await client
              .patch(check._id) // Document ID to patch
              .set({ quantity: check?.quantity + 1 }) // Shallow merge\
              .commit() // Perform the patch and return a promise
              .then((updatedBike) => {
                console.log("Update success", updatedBike);
                dispatch(
                  addProduct({
                    ...product,
                    quantity,
                  })
                );
              })
              .catch((err) => {
                console.error("Oh no, the update failed: ", err.message);
              });

            await client
              .patch(id) // Document ID to patch
              .set({ quantity: productQuantity - 1 }) // Shallow merge\
              .commit() // Perform the patch and return a promise
              .then((updatedBike) => {
                console.log("success", updatedBike);
              })
              .catch((err) => {
                console.error("Oh no, the update failed: ", err.message);
              });

            setProductQuantity(productQuantity - 1);
          }
        }
      } else {
        navigate("/login");
      }
    } else {
      swal("Thông báo", "Sản phẩm đã hết hàng", "warning");
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <ProductInfo>
            <Title>THÔNG TIN</Title>
            <Desc>{product?.product?.description}</Desc>
            <Br />
            <Desc>Sản phẩm được vận chuyển từ 2-3 ngày.</Desc>
            <Br />
            <Desc>Thiết kế và sản xuất bởi Six Group Studio.</Desc>
            <Hr />
            <SubFooter>
              Six Group™ ✦ STREETWEAR BRAND LIMITED ✦ Copyright © 2021 Six
              Group. All rights reserved.
            </SubFooter>
          </ProductInfo>
          <ProductImage src={product?.product?.image?.asset.url} />
          <ProductDesc>
            <DescTitleImage src="https://file.hstatic.net/1000306633/file/new_arrivals_283d7b8f2ab1443490b85f4c7732fcc5.svg" />
            <DescTitle>{product?.product?.name}</DescTitle>
            <DescSKU>SKU: T60122SB</DescSKU>
            <DescPrice>{format(product?.product?.price)}</DescPrice>

            <ButtonContainer>
              <ButtonBuy onClick={handleBuyStock}>MUA NGAY</ButtonBuy>
              <ButtonCard onClick={handleAddBuy}>THÊM VÀO GIỎ</ButtonCard>
            </ButtonContainer>
          </ProductDesc>
        </Wrapper>
      </Container>
      <Hr />
      <Footer />
    </>
  );
}

const Container = styled.div`
  margin-top: 60px;
  padding: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h4`
  padding: 20px 0;
`;

const Desc = styled.p`
  font-size: 10px;
`;

const Br = styled.br``;

const SubFooter = styled.div`
  font-size: 12px;
  color: #adacac;
`;

const ProductInfo = styled.div`
  flex: 1;
  padding-top: 100px;
`;

const ProductImage = styled.img`
  flex: 2;
  width: 33.33333%;
  height: 100%;
  object-fit: cover;
`;

const ProductDesc = styled.div`
  flex: 1;
  border-left: 1px solid #000;
  padding: 80px;
`;

const Hr = styled.hr`
  border: 1px solid #ccc;
  margin: 12px;
`;

const DescTitleImage = styled.img`
  width: 100%;
`;
const DescTitle = styled.h3`
  padding: 8px 0;
`;

const DescSKU = styled.p`
  padding: 8px 0;
  color: #adacac;
  font-size: 13px;
`;

const DescPrice = styled.p`
  padding: 8px 0;
  font-weight: 500;
  font-size: 18px;
  color: #5e5c5c;
`;

const SizeContainer = styled.div`
  padding: 8px 0;
  display: flex;
`;

const SizeItem = styled.div`
  padding: 10px 0;
  /* border: 1px solid #585757; */
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
`;

const ButtonCard = styled.button`
  margin-bottom: 12px;
  padding: 12px 0;
  font-weight: 600;
  background-color: #fff;
  color: #000;
  border: 1px solid #747373;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #000;
    color: #fff;
    transition: all 0.5s ease;
  }
`;

const ButtonBuy = styled(ButtonCard)`
  margin-bottom: 12px;
  padding: 12px 0;
  font-weight: 600;
  color: #fff;
  background-color: #000;
  border: 1px solid #747373;
  &:hover {
    background-color: #fff;
    color: #000;
    transition: all 0.5s ease;
  }
`;

export default ProductDetail;
