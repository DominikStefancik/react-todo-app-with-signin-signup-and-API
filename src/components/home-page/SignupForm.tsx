import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LayoutProps } from '../types';
import { APP_SIGNUP_SUCCESS_PATH } from '../../url';
import { ErrorMessage, Form, Input, Instructions } from './styled/Form';
import { Title } from '../styled/Title';
import { Button } from '../styled/Button';
import axios from '../../api/axios';
import { API_REGISTER_PATH } from '../../api/url';
import { SpinnerIcon } from '../styled/Icon';

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_ ]{2,149}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpForm = ({ isSignInForm }: LayoutProps) => {
  const navigate = useNavigate();

  // it allows to get focus on the first name input field when the components loads
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  // it allows to get focus on a field with an error
  const errorRef = useRef<HTMLParagraphElement>(null);

  // states for the first name field
  const [firstName, setFirstName] = useState(''); // represents the first name state
  const [validFirstName, setValidFirstName] = useState(false); // says if the first name validates or not
  const [firstNameFocus, setFirstNameFocus] = useState(false); // says if we have a focus on the input field or not

  // states for the last name field
  const [lastName, setLastName] = useState(''); // represents the last name state
  const [validLastName, setValidLastName] = useState(false); // says if the last name validates or not
  const [lastNameFocus, setLastNameFocus] = useState(false); // says if we have a focus on the input field or not

  // states for the last name field
  const [email, setEmail] = useState(''); // represents the email state
  const [validEmail, setValidEmail] = useState(false); // says if the email validates or not
  const [emailFocus, setEmailFocus] = useState(false); // says if we have a focus on the input field or not

  // states for the password field
  const [password, setPassword] = useState(''); // represents the password state
  const [validPassword, setValidPassword] = useState(false); // says if the password validates or not
  const [passwordFocus, setPasswordFocus] = useState(false); // says if we have a focus on the input field or not

  // states for the confirmed password field
  const [confirmPassword, setConfirmPassword] = useState(''); // represents the confirmed password state
  const [validConfirmPassword, setValidConfirmPassword] = useState(false); // says if the confirmed password validates or not
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false); // says if we have a focus on the input field or not

  const [errorMessage, setErrorMessage] = useState(''); // represents a possible error message if an error exists

  // represents the state when a page is loading a data (e.g. the form is waiting for the response from a backend)
  const [isLoading, setIsLoading] = useState(false);

  // hook will be used to set the focus on the input field when the component loads
  useEffect(() => {
    firstNameInputRef.current?.focus();
  }, []); // since the dependency array is empty, the effect will be used only when the component loads

  // hook will be used to the first name for its validation
  useEffect(() => {
    const result = NAME_REGEX.test(firstName);
    setValidFirstName(result);
  }, [firstName]); // anytime a first name changes, the effect will run the validation of the field

  // hook will be used to the last name for its validation
  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    setValidLastName(result);
  }, [lastName]);

  // hook will be used to the email for its validation
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  // hook will be used to the password for its validation
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const isTheSame = password === confirmPassword;
    setValidConfirmPassword(isTheSame);
  }, [password, confirmPassword]);

  // hook will be used to the error message
  useEffect(() => {
    // anytime we change first name, last name, email, password or confirm password field we want to remove a possible exiting error message
    setErrorMessage('');
  }, [firstName, lastName, email, password, confirmPassword]);

  useEffect(() => {
    // whenever we switch to the registration form, set all fields to an empty string
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  }, [isSignInForm]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      // send request to the backend
      await axios.post(
        API_REGISTER_PATH,
        JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password2: confirmPassword,
        })
      );

      // lastly, navigate away from the login page
      navigate(APP_SIGNUP_SUCCESS_PATH, { replace: true });
    } catch (error: any) {
      // we haven't heard from the server at all (maybe we lost an Internet connection)
      if (!error?.response) {
        setErrorMessage('No Server Response');
      } else {
        // the API returns error when the given email already exists
        setErrorMessage(
          `A user with the email '${email}' already exists. Please enter another email.`
        );
      }

      // when an error occured after submitting the form we want a focus to be on the error
      errorRef.current?.focus();
    } finally {
      // set the loading state to false after we received a response from a backend
      setIsLoading(false);
    }
  };

  const isButtonDisabled =
    !validFirstName || !validLastName || !validEmail || !validPassword || !validConfirmPassword;

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage ref={errorRef} isVisible={!!errorMessage}>
        {errorMessage}
      </ErrorMessage>
      <Title>Create Account</Title>
      <Input
        type="text"
        id="firstName"
        ref={firstNameInputRef}
        placeholder="First Name"
        autoComplete="off"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        required
        onFocus={() => setFirstNameFocus(true)}
        onBlur={() => setFirstNameFocus(false)}
      />
      <Instructions id="firstnamenote" isVisible={firstNameFocus && !!firstName && !validFirstName}>
        <FontAwesomeIcon icon={faInfoCircle} />
        &nbsp; 3 to 150 characters <br />
        Must begin with a letter. <br />
        Letters, numbers, underscores, hyphens allowed.
      </Instructions>

      <Input
        type="text"
        id="lastName"
        placeholder="Last Name"
        autoComplete="off"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        required
        onFocus={() => setLastNameFocus(true)}
        onBlur={() => setLastNameFocus(false)}
      />
      <Instructions id="lastnamenote" isVisible={lastNameFocus && !!lastName && !validLastName}>
        <FontAwesomeIcon icon={faInfoCircle} />
        &nbsp; 3 to 150 characters <br />
        Must begin with a letter. <br />
        Letters, numbers, underscores, hyphens allowed.
      </Instructions>

      <Input
        type="text"
        id="email"
        placeholder="Email"
        autoComplete="off"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
      />
      <Instructions id="emailnote" isVisible={emailFocus && !!email && !validEmail}>
        <FontAwesomeIcon icon={faInfoCircle} />
        &nbsp; Must contain <span aria-label="at symbol">@</span> <br />
        Letters, numbers, underscores, hyphens allowed.
      </Instructions>

      <Input
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        onFocus={() => setPasswordFocus(true)}
        onBlur={() => setPasswordFocus(false)}
      />
      <Instructions id="passwordnote" isVisible={passwordFocus && !validPassword}>
        <FontAwesomeIcon icon={faInfoCircle} />
        &nbsp; 8 to 24 characters <br />
        Must include uppercase and lowercase letters, a number and a special character. <br />
        Allowed special characters: <span aria-label="exclamation mark">!</span>{' '}
        <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{' '}
        <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
      </Instructions>

      <Input
        type="password"
        id="confirmedPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        required
        onFocus={() => setConfirmPasswordFocus(true)}
        onBlur={() => setConfirmPasswordFocus(false)}
      />
      <Instructions id="confirmnote" isVisible={confirmPasswordFocus && !validConfirmPassword}>
        <FontAwesomeIcon icon={faInfoCircle} />
        &nbsp; Must match the first password input field.
      </Instructions>

      <Button disabled={isButtonDisabled}>Sign Up</Button>

      {isLoading && (
        <SpinnerIcon>
          <FontAwesomeIcon icon={faSpinner} pulse />
        </SpinnerIcon>
      )}
    </Form>
  );
};

export default SignUpForm;
