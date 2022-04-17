import React from "react";
import styled from "styled-components";

function CategoryItem(props) {
  const { img } = props;
  return (
    <Container>
      <Image src={img} />
    </Container>
  );
}

const Container = styled.div`
    padding : 6px;
    cursor: pointer;

    &:hover{
      opacity: 0.8 ;
      padding: 4px ;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default CategoryItem;
