import styled from 'styled-components';
import { LayoutProps } from '../../types';

export const SignInContainer = styled.div<LayoutProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) => (props.isSignInForm !== true ? `transform: translateX(100%);` : null)}
`;
