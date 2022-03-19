import React, { useEffect, useState } from "react";
import './style.css'
import styled from "styled-components";
import { client } from "../../APIs";
import { getListCategory } from "../../APIs/Category";

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const [listCategory,setListCategory] =  useState([])
  
  const changeBackground = () => {
    console.log(window.scrollY)
    if (window.scrollY >= 60) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    changeBackground()
    window.addEventListener("scroll", changeBackground)
  },[navbar])

  useEffect(() => {
    getListCategory().then(data => setListCategory(data))
  },[])

  return (
    <Container  bg={navbar? '#fff' : 'transparent'}>
      <Wrapper>
        <LeftWrapper>
          <Logo>SIX GROUP</Logo>
          <NavMenu>
            {
              listCategory.map(item =>   <MenuItem key={item._id}>{item.name}</MenuItem>)
            }
          </NavMenu>
        </LeftWrapper>
        <RightWrapper>
          <SubMenu>
            <MenuItem>Đăng nhập</MenuItem>
            <MenuItem>Đăng ký</MenuItem>
            <MenuItem>Tìm kiếm</MenuItem>
            <MenuItem>Giỏ hàng</MenuItem>
          </SubMenu>
        </RightWrapper>
      </Wrapper>
    </Container>
  );
}

export default NavBar;

const Container = styled.div`
  height: 60px;
  padding: 0 24px;
  background-color: ${props => props.bg} ;
  position: fixed ;
  top:0 ;
  left:0 ;
  right:0 ;
  z-index: 2 ;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height:60px ;
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
