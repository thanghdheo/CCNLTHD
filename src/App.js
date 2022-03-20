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
import Register from "./pages/Register"

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
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
