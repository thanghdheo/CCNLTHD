import React from 'react'
import styled from 'styled-components'
import Footer from '../Components/Footer'

function Register() {
    return (
        <Container>
            <Wrapper>
                <div>
                <Title>ĐĂNG KÝ</Title>
                <Form>
                    <Input placeholder="Họ" />
                    <Input placeholder="Tên" />
                    <Input placeholder ="dd/mm/yyyy"/>
                    <Input placeholder="Email" />
                    <Input placeholder="Mật khẩu" />
                    <Input placeholder="Nhập lại mật khẩu" />
                    <Button>Đăng ký</Button>
                </Form>
                <BackText>Quay lại trang chủ</BackText>
                </div>
            </Wrapper>
            <Footer />
        </Container>
      )
    }
    
    const Container = styled.div`
        margin-top: 60px;
    `
    const Wrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
    `
    
    const Title = styled.h4`
        text-align: center;
    `
    
    const Form = styled.form`
        display: flex;
        flex-direction: column;
    `
    
    const Input = styled.input`
        margin: 12px 0;
        width: 500px;
        padding: 18px 12px;
        border: none;
        outline: none;
        background-color: #dddbdb;
    `
    
    const BackText = styled.span`
        font-size: 14px;
        text-decoration: underline;
        cursor: pointer;
    `
    
    const Button = styled.button`
        outline: none;
        border: none;
        padding: 12px 24px;
        background-color: #000;
        color:#fff;
        font-weight: 700;
        margin-bottom: 12px;
    `
export default Register