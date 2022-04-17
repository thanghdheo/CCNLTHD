import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import Footer from "../Components/Footer";
import { loginFailure, loginStart, loginSuccess } from "../Redux/UserSlice";

function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async ({ username, password }) => {
    dispatch(loginStart());
    try {
      const res = await axios.post(
        "https://velzon-authenticate.herokuapp.com/auth/local/login",
        { username, password }
      );
      dispatch(
        loginSuccess({
          currentUser: res.data,
          user: res.data.user,
        })
      );
      swal("Thông báo !", "Đăng nhập thành công !", "success");
      localStorage.setItem("token", JSON.stringify(res.data));
      navigate(-1);
    } catch (err) {
      dispatch(loginFailure());
      swal("Lỗi !", "Kiểm tra lại tên đăng nhập hoặc mật khẩu !", "error");
    }
  };
  return (
    <Container>
      <Wrapper>
        <div>
          <Title>ĐĂNG NHẬP</Title>
          <Form onSubmit={handleSubmit(handleLogin)} noValidate>
            <Controller
              name="username"
              rules={{
                required: "Tên đăng nhập không được để trống",
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Tên đăng nhập"
                  autoFocus
                  style={{ width: "500px" }}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              name="password"
              rules={{
                required: "Mật khẩu không được để trống",
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Mật khẩu"
                  type="password"
                  style={{ width: "500px" }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Button type="submit">Đăng nhập</Button>
          </Form>
          <BackText>Quên mật khẩu ?</BackText>
          <BackText>Đăng ký</BackText>
        </div>
      </Wrapper>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 60px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

const Title = styled.h4`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 12px 0;
  width: 500px;
  padding: 18px 12px;
  border: none;
  outline: none;
  background-color: #dddbdb;
`;

const BackText = styled.span`
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

const Button = styled.button`
  outline: none;
  border: 1px solid #000;
  padding: 12px 24px;
  background-color: #000;
  color: #fff;
  font-weight: 700;
  margin-bottom: 12px;
  &:hover {
    background-color: #fff;
    color: #000;
    transition: all 0.5s ease;
  }
`;

export default Login;
