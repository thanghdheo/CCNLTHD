import { TextField } from "@material-ui/core";
import { Button } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom"
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import ProductList from "../Components/ProductList";

const options = [
  "Giá: Tăng dần",
  "Giá: Giảm dần",
  "Cũ nhất",
  "Mới nhất",
];

function Products() {
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");

  const {category} = useParams()


  return (
    <Container>
      <Wrapper>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="combo-box-demo"
          options={options}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} type="text" />}
        />
      </Wrapper>
      <ProductList category={category} value={value} />
      <Announcement />
      <Footer />
    </Container>
  );
}

export default Products;

const Container = styled.div`
  margin-top: 60px;
`;

const Wrapper =  styled.div`
    padding: 28px ;
    display: flex;
    justify-content: flex-end;
`
