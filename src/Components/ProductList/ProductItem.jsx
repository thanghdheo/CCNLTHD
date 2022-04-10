import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import { client } from "../../APIs";
import {
  getCartByIdWithStatus,
  getCartDetail,
  getCarts,
} from "../../APIs/Cart";
import { getSingleProduct } from "../../APIs/Product";
import { addBills, addProduct } from "../../Redux/CartSlice";
function ProductItem(props) {
  const { id, img, price, title } = props;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cartId,setCartId] = useState()

  const navigate = useNavigate();

  const user = useSelector((state) => state.users);
  const cart = useSelector((state) => state.carts);

  useEffect(() => {
    getSingleProduct(id).then((data) => setProduct(...data));
  }, [id]);

  useEffect(() => {
    const res = cart?.bills?.find(
      (item) =>
        item.billStatus._id === "ac26c381-8d20-4077-831f-215239cdf61a" &&
        item.user._id === user.user._id
    );
    setCartId(res?._id)
  },[cart,user])

  const format = (n) => {
    return n.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const dispatch = useDispatch();

  // const handleCheckOut = () => {
  //   client.create(doc).then((res) => {
  //     console.log(`Bill was created, document ID is ${res._id}`)
  //   })
  // }

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
  bill:{
    _ref: cartId
  },
  price: price,
  product:{
    _ref: id
  },
  quantity: quantity
}

  const handleAddBuy = async () => {
    const exist = cart?.bills?.some(
      (item,index) =>
        item.billStatus._id === "ac26c381-8d20-4077-831f-215239cdf61a" &&
        item.user._id === user.user._id
    );
    if (!exist) {
      await client.create(bill).then((res) => {
        console.log(`Bill was created, document ID is ${res._id}`);
        dispatch(
          addProduct({
            ...product,
            quantity,
          })
        );
        dispatch(addBills({
          _id: res._id,
          billStatus:{
            _id: res.billStatus._ref
          },
          user:{
            _id: res.user._ref
          }
        }));
      });
    } else {
      // await client.create(billdetail).then((res) => {
      //   console.log(`Bill detail was created, document ID is ${res._id}`);
        dispatch(
          addProduct({
            ...product,
            quantity,
          })
        );
      // });
    }
  };

  const handleBuyStock = () => {};

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



// if (!isBuy) {
//   client.create(bill).then((res) => {
//     console.log(`Bill was created, document ID is ${res._id}`);
//     setCartId(res._id)
//   });
//   // dispatch(
//   //   addProduct({
//   //     ...product,
//   //     quantity,
//   //   })
//   // );
//   // client.create(billdetail).then((res) => {
//   //   console.log(`Bill detail was created, document ID is ${res._id}`)
//   // })
// } else {
//   // client.create(billdetail).then((res) => {
//   //   console.log(`Bill detail was created, document ID is ${res._id}`)
//   // })
//   swal("Thông báo", "Bạn có giỏ hàng chưa thanh toán", "error");

// }
