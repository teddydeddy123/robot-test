import styled, { keyframes } from "styled-components";
import { ArrowCircleDown } from "@styled-icons/fluentui-system-filled/ArrowCircleDown";

type GridPosition = {
  vertical: number;
  horizontal: number;
};

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const CordinatesHorizontal = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export const CordinatesVertical = styled.div`
  display: grid;
  position: absolute;
  left: -10%;
  top: 11%;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  color: green;
  border: 1px solid black;
`;

export const Field = styled.div<GridPosition & { isBlue: boolean }>`
  border: 1px solid black;
  background: ${(props) => (props.isBlue ? "blue" : "green")};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: ${(props) =>
    `${props.horizontal} / ${props.vertical} / span 1 / span 1`};
`;

export const RobotIcon = styled(ArrowCircleDown)`
  color: white;
  /* animation: ${rotateAnimation} 2s linear infinite; Adjust the duration and timing function as needed */
`;
