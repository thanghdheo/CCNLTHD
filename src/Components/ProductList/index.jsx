import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllProduct, getProductHome } from "../../APIs/Product";
import ProductItem from "./ProductItem";

function ProductList(props) {
  const {count,category} = props
  const [products, setProducts] = useState([]);
  useEffect(() => {
    category ? (
      getAllProduct(category).then((data) => setProducts(data))
    ):
    (
      getProductHome().then((data) => setProducts(data))
    )
   
  }, [category]);

  console.log(category)
  return (
    <Container>
      <Wrapper>
        {
          count ? (
            products?.slice(0,12).map((product) => (
              <ProductItem
                id={product._id}
                img={product.image.asset.url}
                key={product._id}
                title={product.name}
                price={product.price}
              />
            ))
          ):
          (
            products?.map((product) => (
              <ProductItem
                id={product._id}
                img={product.image.asset.url}
                key={product._id}
                title={product.name}
                price={product.price}
              />
            ))
          )
        }
      
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 32px;
`;

export default ProductList;
