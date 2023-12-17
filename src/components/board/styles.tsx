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
  left: 100%;
  top: 11%;
  transform: scale(1, -1) rotate(270deg);
  writing-mode: vertical-rl;
  text-orientation: upright;
`;

export const Wrapper = styled.div`
  transform: scale(1, -1);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  color: green;
  border: 1px solid black;
`;

export const Field = styled.div<
  GridPosition & { isBlue: boolean; isRed: boolean }
>`
  border: 1px solid black;
  background: ${(props) =>
    props.isBlue ? "blue" : props.isRed ? "red" : "green"};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: ${(props) =>
    `${props.horizontal} / ${props.vertical} / span 1 / span 1`};
`;

export const RobotIcon = styled(ArrowCircleDown)<{ facing: string }>`
  color: white;
  transform: ${(props) =>
    `rotate(${
      props.facing === "SOUTH"
        ? "180deg"
        : props.facing === "NORTH"
          ? "0deg"
          : props.facing === "WEST"
            ? "90deg"
            : props.facing === "EAST"
              ? "270deg"
              : "0deg" // Default to 0deg if none of the conditions match
    })`};
`;

export const InputFields = styled.div`
  display: flex;
  margin-top: 25px;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
  justify-content: center;
  margin-bottom: 20px;
`;
