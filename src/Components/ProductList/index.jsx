import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllProduct, getProductHome } from "../../APIs/Product";
import ProductItem from "./ProductItem";
import moment from "react-moment";

function ProductList(props) {
  const { count, category, value } = props;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    category
      ? getAllProduct(category).then((data) => setProducts(data))
      : getProductHome().then((data) => setProducts(data));
  }, [category]);

  console.log(products);
  return (
    <Container>
      <Wrapper>
        {count
          ? products
              ?.slice(0, 12)
              .map((product) => (
                <ProductItem
                  id={product._id}
                  img={product.image.asset.url}
                  key={product._id}
                  title={product.name}
                  price={product.price}
                />
              ))
          : products
              ?.sort((a, b) => {
                if (value === "Giá: Tăng dần") {
                  return parseInt(a.price) - parseInt(b.price);
                } else if (value === "Giá: Giảm dần") {
                  return parseInt(b.price) - parseInt(a.price);
                } else if (value === "Cũ nhất") {
                  return (
                    new Date(a._createdAt).getTime() -
                    new Date(b._createdAt).getTime()
                  );
                } else if (value === "Mới nhất") {
                  return (
                    new Date(b._createdAt).getTime() -
                    new Date(a._createdAt).getTime()
                  );
                }
              })
              .map((product) => (
                <ProductItem
                  id={product._id}
                  img={product.image.asset.url}
                  key={product._id}
                  title={product.name}
                  price={product.price}
                />
              ))}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 32px;
`;

export default ProductList;
