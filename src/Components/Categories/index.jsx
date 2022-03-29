import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getListCategory } from "../../APIs/Category";
import CategoryItem from "./CategoryItem";

function Categories() {
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    getListCategory().then((data) => setListCategory(data));
  }, []);

  return (
    <Container>
      {listCategory
        .filter((item, index) => index < 3)
        .map((item) => (
          <Link key={item._id} to={`/products/${item._id}`}>
            <Category key={item._id}>
              <CategoryItem img="/block_home_category3_new.webp" />
              <CategoryText>{item.name}</CategoryText>
            </Category>
          </Link>
        ))}
    </Container>
  );
}

export default Categories;

const Container = styled.div`
  display: flex;
  padding: 24px 0;
  cursor: pointer;
`;

const Category = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryText = styled.h1`
  color: #ffffff;
  background-color: #a09c9c;
  margin: 0 6px;
  text-align: center;
  position: absolute;
  opacity: 0.98;
  border: 3px solid #ccc;
  left: 0;
  right: 0;
  text-transform: uppercase;
`;
