import styled from 'styled-components';
import { PanelProps } from '../../types';

export const Panel = styled.div<PanelProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 5px 25px 5px 25px;
  top: 0;
  width: ${(props) => props.width || '95%'};
  height: ${(props) => props.height};
  transform: ${(props) => `translate(${props.positionX || '10px'}, ${props.positionY || '55%'})`};
  right: 0;
`;

export const TodoListPanel = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
