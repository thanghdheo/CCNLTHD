import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import { client } from "../../APIs";
import { getSingleProduct } from "../../APIs/Product";
import { addBills, addProduct } from "../../Redux/CartSlice";
function ProductItem(props) {
  const { id, img, price, title } = props;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [productQuantity, setProductQuantity] = useState();
  const [cartId, setCartId] = useState();

  const navigate = useNavigate();

  const user = useSelector((state) => state.users);
  const cart = useSelector((state) => state.carts);

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

  useEffect(() => {
    setProductQuantity(product?.product?.quantity);
  }, [product]);

  useEffect(() => {
    const res = cart?.bills?.find(
      (item) =>
        item.billStatus._id === "ac26c381-8d20-4077-831f-215239cdf61a" &&
        item.user._id === user.user._id
    );
    setCartId(res?._id);
  }, [cart, user]);

  const format = (n) => {
    return n.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const dispatch = useDispatch();

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
    price: price,
    product: {
      _ref: id,
    },
    quantity: quantity,
  };

  console.log(cartId);

  const handleAddBuy = async () => {
    console.log(id);

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
            console.log(res);
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
          console.log("Check : ", check);
          if (!check) {
            await client.create(billdetail).then((res) => {
              console.log(res);

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
              .set({ quantity: check.quantity + 1 }) // Shallow merge\
              .commit() // Perform the patch and return a promise
              .then((updatedBike) => {
                console.log("success", updatedBike);
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

  const handleBuyStock = async () => {
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
            navigate("/cart");
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
            await client.create(billdetail).then((res) => {
              dispatch(
                addProduct({
                  ...product,
                  _id: res._id,
                  quantity,
                })
              );
              navigate("/cart");
            });
          } else {
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
    <Container>
      <Link to={`/product/${id}`}>
        <Image src={img} alt="" />
      </Link>
      <IconContainer>
        <Button onClick={handleBuyStock}>
          mua ngay <i className="wi wi-night-partly-cloudy"></i>
        </Button>
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

  &:hover {
    opacity: 0.8;
    transition: all 0.5s ease;
  }

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

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transition: all 0.5s ease;
  }
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
