import React, { useEffect, useState } from "react";
import "./style.css";
import styled from "styled-components";
import { client } from "../../APIs";
import { getListCategory } from "../../APIs/Category";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { getProductHome } from "../../APIs/Product";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const { username } = props;
  const [navbar, setNavbar] = useState(false);
  const [toogleSearch, setToogleSearch] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listProductSearch, setListProductSearch] = useState([]);
  const [show404, setShow404] = useState(true);
  const navigate = useNavigate()

  const cart = useSelector((state) => state.carts);
  const user = useSelector((state) => state.users);

  const format = (n) => {
    return n.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const changeBackground = () => {
    if (window.scrollY >= 60) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const handleSearch = (e) => {
    if (e.target.value !== "") {
      const res = listProduct.filter((item) =>
        item.name
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      );
      setShow404(res.length === 0 ? false : true);
      setListProductSearch(res);
    } else {
      setListProductSearch([]);
      setShow404(true);
    }
  };

  const logOut =  () => {
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload(false)
  }

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  }, [navbar]);

  useEffect(() => {
    getListCategory().then((data) => setListCategory(data));
    getProductHome().then((data) => setListProduct(data));
  }, []);

  return (
    <Container bg={navbar ? "#fff" : "transparent"}>
      <Wrapper>
        <LeftWrapper>
          <Link style={{ textDecoration: "none" }} to="/">
            <Logo>SIX GROUP</Logo>
          </Link>
          <NavMenu>
            {listCategory.map((item) => (
              <Link key={item._id} to={`/products/${item._id}`}>
                <MenuItem key={item._id}>{item.name}</MenuItem>
              </Link>
            ))}
          </NavMenu>
        </LeftWrapper>
        <RightWrapper>
          <SubMenu>
            {user.user ? (
              <>
                <MenuItem>{user.user.fullName}</MenuItem>
                <MenuItem onClick={logOut}>????ng xu???t</MenuItem>
              </>
            ) : (
              <>
                <Link to={`/login`}>
                  <MenuItem>????ng nh???p</MenuItem>
                </Link>
                <Link to={`/register`}>
                  <MenuItem>????ng k??</MenuItem>
                </Link>
              </>
            )}
            <MenuItem onClick={() => setToogleSearch(!toogleSearch)}>
              T??m ki???m
            </MenuItem>
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={cart.quantity} color="primary">
                  <ShoppingCartIcon color="action" />
                </Badge>
              </MenuItem>
            </Link>
          </SubMenu>
        </RightWrapper>
      </Wrapper>
      {toogleSearch && (
        <SearchContainer show={toogleSearch} >
          <SearchWrapper>
            <SearchHeader>
              <h4>T??M KI???M</h4>
              <CloseIcon
                style={{ cursor: "pointer" }}
                onClick={() => setToogleSearch(!toogleSearch)}
              />
            </SearchHeader>
            <SearchInput
              placeholder="T??m ki???m s???n ph???m ..."
              onChange={(e) => handleSearch(e)}
            />
            <SearchResult>
              {listProductSearch.map((item) => (
                <ResultItem>
                  <ResultRight>
                    <Link
                      to={`/product/${item._id}`}
                      onClick={() => {
                        setToogleSearch(false);
                        setListProductSearch([]);
                      }}
                    >
                      <ResultName>{item.name}</ResultName>
                    </Link>
                    <ResultPrice>{format(item.price)}</ResultPrice>
                  </ResultRight>
                  <ResultLeft>
                    <ResultImage src={item.image.asset.url} />
                  </ResultLeft>
                </ResultItem>
              ))}
              {!show404 && <ResultItem>Kh??ng c?? k???t qu??? t??m ki???m</ResultItem>}
            </SearchResult>
          </SearchWrapper>
        </SearchContainer>
      )}
    </Container>
  );
}

export default NavBar;

const Container = styled.div`
  height: 60px;
  padding: 0 24px;
  font-size: 14.5px;
  background-color: ${(props) => props.bg};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RightWrapper = styled(LeftWrapper)`
  cursor: pointer;
`;

const Logo = styled.h1`
  --x-offset: -0.0625em;
  --y-offset: 0.0625em;
  --stroke: 0.025em;
  --background-color: white;
  --stroke-color: lightblue;

  text-shadow: var(--x-offset) var(--y-offset) 0px var(--background-color),
    calc(var(--x-offset) - var(--stroke)) calc(var(--y-offset) + var(--stroke))
      0px var(--stroke-color);
`;

const NavMenu = styled.ul`
  list-style: none;
  display: flex;
`;

const MenuItem = styled.li`
  padding: 0 12px;
  display: inline-block;
  word-wrap: normal;
  position: relative;
  &::before {
    content: " ";
    height: 2px;
    left: 0;
    right: 0;
    bottom: -6px;
    background-color: #000;
    position: absolute;
    opacity: 0;
    transform-origin: left center;
    transition: all 260ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    transform: scaleX(0);
  }

  &:hover {
    :before {
      transform: scaleX(1);
      opacity: 1;
    }
  }
`;

const SubMenu = styled(NavMenu)``;

const SearchContainer = styled.div`
  background-color: #fff;
  height: 100vh;
  width: calc(100% / 3);
  z-index: 100;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  border-left: 1px solid #ccc;
  transform-origin: right center;
  animation: scale 0.5s linear;
`;

const SearchHeader = styled.div`
  display: flex;
  justify-content: space-between;

  h6 {
    font-size: 24px;
  }
`;
const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 18px;
  padding: 12px;
  margin: 0 auto;
  background-color: #ccc;
  margin-top: 24px;
`;

const SearchWrapper = styled.div`
  padding: 48px 32px;
`;

const SearchResult = styled.ul`
  list-style: none;
`;
const ResultItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 12px 0;
`;
const ResultRight = styled.div``;
const ResultName = styled.p`
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  padding: 4px 0;
`;
const ResultPrice = styled.p`
  font-size: 13px;
`;
const ResultLeft = styled.div``;
const ResultImage = styled.img`
  height: 50px;
`;
