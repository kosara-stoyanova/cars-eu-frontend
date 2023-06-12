import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validate } from "email-validator";
import { auth } from "../../firebaseConfig";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: #1f1f1e;
`;

const FormContainer = styled.div`
  margin: auto;
  border-width: 0.2px;
  border-style: solid;
  border-radius: 20px;
  border-style: none;
  background-color: #e4e4e4;
  height: 600px;
  width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const StyledHeader = styled.h1`
  font-size: 50px;
  color: #1f1f1e;
`;

const StyledInput = styled.input`
  height: 40px;
  width: 350px;
  padding: 10px;
  padding-left: 16px;
  margin-bottom: 16px;
  border-radius: 20px;
  border-style: none;
  background-color: #fdfdfd;
`;

const StyledButton = styled.button`
  height: 40px;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 20px;
  border-style: none;
  background-color: #1f1f1e;
  font-weight: bold;
  color: #fdfdfd;
  font-size: 14px;
`;

const StyledText = styled.p`
  font-size: 14px;
`;

const LogIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/offers");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast(errorMessage, {
          type: "error",
        });
        console.error(errorCode, errorMessage);
      });
  };

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <Wrapper>
      <FormContainer>
        <StyledHeader>Log In</StyledHeader>
        <Form onSubmit={handleSubmit}>
          <StyledInput
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
          />
          <StyledInput
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
          <StyledButton type="submit">Log In</StyledButton>
          <StyledText>
            Don't have an account? <Link to="/register"> Register!</Link>
          </StyledText>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default LogIn;
