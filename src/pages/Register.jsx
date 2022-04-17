import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUsernames } from "../APIs/User";
import Footer from "../Components/Footer";
import swal from "sweetalert";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../Redux/UserSlice";

function Register() {
  const [username, setUsernames] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      passWord: "",
      address: "",
      email: "",
      fullName: "",
      phone: "",
    },
  });

  useEffect(() => {
    getUsernames().then((res) => setUsernames(res));
  }, []);

  console.log(username);

  const handleRegister = async (values) => {
    const valid = username.find((item) => item.username === values.userName);

    if (!valid) {
      dispatch(loginStart());
      try {
        const res = await axios.post(
          "https://velzon-authenticate.herokuapp.com/auth/local/register",
          {
            username: values.userName,
            password: values.passWord,
            address: values.address,
            email: values.email,
            fullName: values.fullName,
            phone: values.phone,
          }
        );
        dispatch(
          loginSuccess({
            currentUser: res.data,
            user: res.data.user,
          })
        );
        swal("Thông báo !", "Đăng ký thành công !", "success");
        localStorage.setItem("token", JSON.stringify(res.data));
        navigate(-1);
      } catch (err) {
        dispatch(loginFailure());
        console.log(err.message);
        swal("Lỗi !", "Kiểm tra lại thông tin đăng ký!", "error");
      }
    } else {
      swal("Thông báo", "Đã tồn tại username", "error");
    }
  };
  return (
    <Container>
      <Wrapper>
        <div>
          <Title>ĐĂNG KÝ</Title>
          <Form onSubmit={handleSubmit(handleRegister)} noValidate>
            <Controller
              name="fullName"
              rules={{
                required: "Họ và tên không được để trống",
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="fullName"
                  label="Họ và tên"
                  autoFocus
                  style={{ width: "500px" }}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />
            <Controller
              name="userName"
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
                  id="userName"
                  label="Tên đăng nhập"
                  style={{ width: "500px" }}
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                />
              )}
            />
            <Controller
              name="passWord"
              rules={{
                required: "Mật khẩu không được để trống",
                minLength: {
                  value: 5,
                  message: "Mật khẩu ít nhẩt 5 kí tự",
                },
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="passWord"
                  label="Mật khẩu"
                  type="password"
                  style={{ width: "500px" }}
                  error={!!errors.passWord}
                  helperText={errors.passWord?.message}
                />
              )}
            />

            <Controller
              name="email"
              rules={{
                required: "Email không được để trống",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không hợp lệ ",
                },
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  style={{ width: "500px" }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="phone"
              rules={{
                required: "Số điện thoại không được để trống",
                pattern: {
                  value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/g,
                  message: "Số điện thoại không hợp lệ",
                },
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Số điện thoại"
                  style={{ width: "500px" }}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
            <Controller
              name="address"
              rules={{
                required: "Địa chỉ không được để trống",
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Địa chỉ"
                  type="text"
                  style={{ width: "500px" }}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
            <Button type="submit">Đăng ký</Button>
          </Form>
          <BackText>Quay lại trang chủ</BackText>
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
  border: none;
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
export default Register;
