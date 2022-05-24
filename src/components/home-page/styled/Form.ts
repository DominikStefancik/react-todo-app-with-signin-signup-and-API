import styled from 'styled-components';
import { ParagraphProps } from '../../types';

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const Instructions = styled.p<ParagraphProps>`
  width: 100%;
  text-align: left;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  background: #000;
  color: #fff;
  padding: 0.5rem;
  position: relative;
  top: -10px;
  margin-bottom: -8px;
  ${(props) => (!props.isVisible ? `display: none;` : null)}
`;

export const ErrorMessage = styled.p<ParagraphProps>`
  width: 100%;
  text-align: left;
  background-color: lightpink;
  color: firebrick;
  font-weight: bold;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  ${(props) => (!props.isVisible ? `display: none;` : null)}
`;
