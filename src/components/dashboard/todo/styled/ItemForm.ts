import styled from 'styled-components';
import image from '../assets/crumpled-yellow-paper-background.webp';

export const Form = styled.form`
  display: flex;
  width: 45%;
  border-radius: 5px;
  padding: 20px;
  margin-top: 15px;
  color: black;
  background-image: url(${image});
`;

export const Input = styled.input`
  flex: 1;
  padding: 5px;
  border: none;
  font-size: 20px;
  &:focus {
    outline: none;
  }
`;

export const EditableText = styled.span`
  flex: 1;
  padding: 5px;
  border: none;
  font-size: 20px;
`;

export const NonEditableText = styled.s`
  flex: 1;
  padding: 5px;
  border: none;
  font-size: 20px;
`;
