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
  gap: 12px;
`;

export const CordinatesHorizontal = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 259px;
  position: absolute;
  transform: scale(1, -1);
  bottom: -20%;
`;

export const CordinatesVertical = styled.div`
  display: grid;
  position: absolute;
  right: 105%;
  transform: scale(1, -1);
  p {
    margin: 0.9em auto;
  }
`;

export const Wrapper = styled.div`
  transform: scale(1, -1);
  display: grid;
  max-width: fit-content;
  align-self: center;
  position: relative;
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
  /* margin-top: 25px; */
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-around;
  align-items: center;
  max-width: 260px;
  align-self: center;
  gap: 12px;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  input {
    border: none;
    background: #e5e5e5;
    color: black;
    border-radius: 20px;
    padding: 5px;
    max-width: 65px;
    text-align: center;
    &:focus {
      outline: none;
    }
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
  &:hover {
    background: #765fdd;
  }
`;

export const Select = styled.select`
  text-align: center;
  padding: 7px 20px;
  background: white;
  color: black;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

export const Error = styled.p`
  color: #ff9200;
  font-weight: 500;
`;

export const Report = styled.div`
  color: white;
  font-weight: 500;
  margin-bottom: 70px;
`;
