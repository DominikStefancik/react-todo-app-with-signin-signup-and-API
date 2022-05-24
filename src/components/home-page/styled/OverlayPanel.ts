import styled from 'styled-components';
import { LayoutProps } from '../../types';

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)<LayoutProps>`
  transform: translateX(-20%);
  ${(props) => (props.isSignInForm !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)<LayoutProps>`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.isSignInForm !== true ? `transform: translateX(20%);` : null)}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;
