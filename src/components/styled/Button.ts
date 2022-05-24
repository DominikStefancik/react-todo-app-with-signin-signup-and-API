import styled from 'styled-components';

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  margin-top: 8px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active:enabled {
    transform: scale(0.9);
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: lightgrey;
    border: lightgrey;
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;
