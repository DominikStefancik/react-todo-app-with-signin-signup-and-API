import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../styled/Title';
import { Button } from '../styled/Button';
import { LayoutProps } from '../types';
import { ErrorMessage, Form, Input } from './styled/Form';
import axios from '../../api/axios';
import { API_LOGIN_PATH } from '../../api/url';
import useAuth from '../../hooks/useAuth';
import { APP_DASHBOARD_PATH } from '../../url';

const SignInForm = ({ isSignInForm }: LayoutProps) => {
  // when we scuccessfully authenticate, we will set our new authUser state by calling the 'setAuthUser' function
  const { setAuthUser } = useAuth();

  const navigate = useNavigate();

  // it allows to get focus on the email input field when the components loads
  const emailInputRef = useRef<HTMLInputElement>(null);
  // it allows to get focus on a field with an error
  const errorRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState(''); // represents the email state
  const [password, setPassword] = useState(''); // represents the password state

  const [errorMessage, setErrorMessage] = useState(''); // represents a possible error message if an error exists

  // hook will be used to set the focus on the input field when the component loads
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []); // since the dependency array is empty, the effect will be used only when the component loads

  // hook will be used to the error message
  useEffect(() => {
    // anytime we change email or password field we want to remove a possible exiting error message
    setErrorMessage('');
  }, [email, password]);

  useEffect(() => {
    // whenever we switch the login form, set all fields to an empty string
    setEmail('');
    setPassword('');
    setErrorMessage('');
  }, [isSignInForm]);

  const isButtonDisabled = !email || !password;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // send request to the backend
      const response = await axios.post(
        API_LOGIN_PATH,
        JSON.stringify({
          email,
          password,
        })
      );

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      // if the login was successful, store user information and the token received for him in the global context
      setAuthUser!({ email, accessToken, refreshToken });

      // after the login was successful, clear out email and password fields
      setEmail('');
      setPassword('');

      // lastly, navigate away to the dashboard page
      navigate(APP_DASHBOARD_PATH, { replace: true });
    } catch (error: any) {
      // we haven't heard from the server at all (maybe we lost an Internet connection)
      if (!error?.response) {
        setErrorMessage('No Server Response');
        return;
      } else {
        setErrorMessage(error.response.data.detail);
      }
      // when an error occured after submitting the form we want a focus to be on the error
      errorRef.current?.focus();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage ref={errorRef} isVisible={!!errorMessage}>
        {errorMessage}
      </ErrorMessage>
      <Title>Sign in</Title>
      <Input
        type="text"
        id="email"
        ref={emailInputRef}
        placeholder="Email"
        autoComplete="off"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        required
      />
      <Input
        type="password"
        id="password"
        placeholder="Password"
        autoComplete="off"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <Button disabled={isButtonDisabled}>Sign In</Button>
    </Form>
  );
};

export default SignInForm;
