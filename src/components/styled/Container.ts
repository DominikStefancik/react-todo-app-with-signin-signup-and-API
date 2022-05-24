import styled from 'styled-components';
import { ContainerProps } from '../types';

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) => props.backgroundColor || '#fff'};
  color: ${(props) => props.color || null};
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: ${(props) => props.width || '878px'};
  max-width: 100%;
  min-height: 600px;
`;
