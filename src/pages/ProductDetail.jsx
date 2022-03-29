import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getSingleProduct } from '../APIs/Product';
import Footer from '../Components/Footer';
import { addProduct } from '../Redux/CartSlice';

function ProductDetail() {
  const [product,setProduct] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const format = (n) => {
    return n?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const {id} = useParams()

  useEffect(() => {
    getSingleProduct(id).then(data => setProduct(...data))
  },[id])

  const handleBuyStock = () => {
    dispatch(
      addProduct({
        ...product,
        quantity: 1,
      })
    );
    navigate('/cart')
  }


  console.log(product)
    return (
        <>
          <Container>
            <Wrapper>
            <ProductInfo>
              <Title>THÔNG TIN</Title>
              <Desc>
                {product.description}
              </Desc>
              <Br/>
              <Desc>
              Sản phẩm được vận chuyển từ 2-3 ngày. 
              </Desc>
              <Br />
              <Desc>
              Thiết kế và sản xuất bởi Six Group Studio.
              </Desc>
              <Hr />
              <SubFooter>
              Six Group™ ✦ STREETWEAR
                BRAND LIMITED ✦ Copyright © 2021 Six Group. All rights reserved. 
              </SubFooter>
            </ProductInfo>
            <ProductImage src={product.image?.asset.url} />
            <ProductDesc>
                <DescTitleImage src="https://file.hstatic.net/1000306633/file/new_arrivals_283d7b8f2ab1443490b85f4c7732fcc5.svg" />
                <DescTitle>{product.name}</DescTitle>
                <DescSKU>SKU: T60122SB</DescSKU>
                <DescPrice>{format(product?.price)}</DescPrice>
               
                <ButtonContainer>
                    <ButtonBuy onClick={handleBuyStock}>MUA NGAY</ButtonBuy>
                    <ButtonCard >THÊM VÀO GIỎ</ButtonCard>
                </ButtonContainer>
            </ProductDesc>
            </Wrapper>
          </Container>
          <Hr />
          <Footer />
        </>
      );
    }
    
    const Container = styled.div` 
      margin-top: 60px;
      padding :50px;
    `;
    
    const Wrapper = styled.div`
      display: flex;
      justify-content: center;
    `
    
    const Title = styled.h4`
        padding: 20px 0; 
    `;
    
    const Desc = styled.p`
        font-size: 10px;
    `;
    
    const Br = styled.br`
    
    `
    
    const SubFooter = styled.div`
        font-size: 12px;
        color: #adacac;
    `;
    
    const ProductInfo = styled.div`
      flex: 1;
      padding-top:100px;
    `;
    
    const ProductImage = styled.img`
      flex: 2;
      width: 33.33333%;
      height: 100%;
      object-fit: cover;
    `;
    
    const ProductDesc = styled.div`
      flex: 1;
      border-left: 1px solid #000;
      padding: 80px;
    `;
    
    const Hr = styled.hr`
        border: 1px solid #ccc;
        margin: 12px;
    `;
    
    const DescTitleImage = styled.img`
        width: 100%;
    `
    const DescTitle = styled.h3`
      padding: 8px 0;
    `
    
    const DescSKU = styled.p`
      padding: 8px 0;
      color: #adacac;
      font-size: 13px;
    `
    
    const DescPrice = styled.p`
      padding: 8px 0;
      font-weight: 500;
      font-size: 18px;
      color: #5e5c5c;
    `
    
    const SizeContainer = styled.div`
      padding: 8px 0;
      display: flex;
    
    `
    
    const SizeItem = styled.div`
      padding:10px 0;
      /* border: 1px solid #585757; */
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    `
    
    const ButtonContainer = styled.div`
      padding: 8px 0;
      display: flex;
      flex-direction: column;
    `
    
    const ButtonCard = styled.button`
      margin-bottom: 12px;
      padding: 12px 0;
      font-weight: 600;
      background-color: #fff;
      color: #000;
      border: 1px solid #747373;
      font-size: 12px;
      cursor: pointer;
    
      &:hover{
        background-color: #000;
        color: #fff;
      transition: all 0.5s ease;
      }
    `
    
    const ButtonBuy = styled(ButtonCard)`
      margin-bottom: 12px;
      padding: 12px 0;
      font-weight: 600;
      color: #fff;
      background-color: #000;
      border: 1px solid #747373;
    `

export default ProductDetail