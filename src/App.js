import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./pages/Home";
import BarLoader from "react-spinners/BarLoader";
import { Zoom } from "react-reveal";
import styled from "styled-components";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "./Redux/UserSlice";
import { getCartByIdWithStatus, getCartDetail, getCarts } from "./APIs/Cart";
import { setBillDetail, setBills } from "./Redux/CartSlice";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);
  const cart = useSelector((state) => state.carts);

  console.log(cart.products)

  useEffect(() => {
    getCarts().then((res) => {dispatch(setBills(res))});
  }, [dispatch]);

  useEffect(() => {
    const res = cart?.bills.find(
      (item) =>
        item.billStatus?._id === "ac26c381-8d20-4077-831f-215239cdf61a" &&
        item.user?._id === user.user._id
    );
    getCartDetail(res?._id).then(res => dispatch(setBillDetail(res)))
  }, [user,cart,dispatch]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    if (JSON.parse(localStorage.getItem("token"))) {
      console.log(JSON.parse(localStorage.getItem("token"))?.user?.fullName);
      dispatch(setUsername(JSON.parse(localStorage.getItem("token"))?.user));
    }
  }, [dispatch]);

  return (
    <div className={loading ? "App" : ""}>
      {loading ? (
        <>
          <Zoom top>
            <Title>SIX GROUP</Title>
          </Zoom>
          <BarLoader
            color={"#36A4D7"}
            loading={loading}
            width={500}
            height={15}
            size={650}
          />
        </>
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;

const Title = styled.h5`
  text-align: center;
  font-size: calc(1em + 25vmin);
  font-weight: 900;
  padding: 24px 0;

  --x-offset: -0.0625em;
  --y-offset: 0.0625em;
  --stroke: 0.025em;
  --background-color: white;
  --stroke-color: lightblue;

  text-shadow: var(--x-offset) var(--y-offset) 0px var(--background-color),
    calc(var(--x-offset) - var(--stroke)) calc(var(--y-offset) + var(--stroke))
      0px var(--stroke-color);
`;
