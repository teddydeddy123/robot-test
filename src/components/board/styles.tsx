import styled from "styled-components";
import { ArrowCircleDown } from "@styled-icons/fluentui-system-filled/ArrowCircleDown";

type GridPosition = {
  vertical: number;
  horizontal: number;
};

export const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
`;

export const CordinatesHorizontal = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export const CordinatesVertical = styled.div`
  display: grid;
  position: absolute;
  right: 105%;
  top: 8%;
  p {
    margin: 0.9em auto;
  }
`;

export const Wrapper = styled.div`
  transform: scale(1, -1);
  display: grid;
  max-width: fit-content;
  align-self: center;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  border: 1px solid #e5e5e5;
  margin-bottom: 30px;
`;

export const Field = styled.div<GridPosition & { isRed: boolean }>`
  border: 1px solid #e5e5e5;
  background: ${(props) => (props.isRed ? "red" : " #FCA311")};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-around;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  input {
    border: 2px solid black;
    background: #e5e5e5;
    color: black;
    padding: 5px;
    max-width: 65px;
    text-align: center;
  }
  label {
    text-align: left;
  }
`;

export const Button = styled.button`
  background: #9f8ee7;
  border-radius: 20px;
  border: 1px solid #e5e5e5;
  margin-top: 30px;
`;

export const Select = styled.select`
  text-align: center;
  padding: 7px 20px;
  background: white;
  color: black;
`;

export const Error = styled.p`
  color: #ff9200;
  font-weight: 500;
`;

export const Report = styled.div`
  color: white;
  font-weight: 500;
  margin-top: -30px;
`;
