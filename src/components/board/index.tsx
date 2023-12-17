import { useState } from "react";
import * as S from "./styles";

type FacingType = "SOUTH" | "NORTH" | "EAST" | "WEST" | "";

const Board = () => {
  const [horizontal, setHorizontal] = useState(0);
  const [vertical, setVertical] = useState(0);
  const [facing, setFacing] = useState<FacingType>("SOUTH");
  const [place, setPlace] = useState({
    rowPosition: 0,
    columnPosition: 0,
    direction: "",
  });

  const moveFunc = () => {
    setPlace((prevState) => ({
      ...prevState,
      rowPosition: horizontal,
      columnPosition: vertical,
      direction: facing,
    }));
  };

  const array = Array.from({ length: 25 });
  const cordinatesArray = Array.from({ length: 5 });
  //maybe add a switch case function

  const options = [
    "MOVE",
    "PLACE_ROBOT",
    "PLACE_WALL",
    "LEFT",
    "RIGHT",
    "REPORT",
  ];

  // const handlers = {
  // move: moveFunc,
  // }

  return (
    <S.OuterWrapper>
      <S.CordinatesHorizontal>
        {cordinatesArray.map((_, k) => (
          <p key={k}>{k + 1}</p>
        ))}
      </S.CordinatesHorizontal>
      <S.CordinatesVertical>
        {cordinatesArray.map((_, k) => (
          <p key={k}>{k + 1}</p>
        ))}
      </S.CordinatesVertical>
      <S.Wrapper>
        {array.map((_, i) => {
          const row = Math.floor(i / 5) + 1;
          const col = (i % 5) + 1;

          return (
            <S.Field
              key={i}
              vertical={col}
              horizontal={row}
              isBlue={
                row === place["rowPosition"] && col === place["columnPosition"]
              }
            >
              {row === place["rowPosition"] &&
                col === place["columnPosition"] && (
                  <S.RobotIcon size={30} facing={place["direction"]} />
                )}
            </S.Field>
          );
        })}
      </S.Wrapper>
      <S.InputFields>
        <label htmlFor="vertical">Vertical</label>
        <input
          value={vertical.toString()}
          id="vertical"
          onChange={(e) => setVertical(parseInt(e.target.value))}
        />
        <label htmlFor="horizontal">Horizontal</label>

        <input
          value={horizontal.toString()}
          id="horizontal"
          onChange={(e) => setHorizontal(parseInt(e.target.value))}
        />

        <label htmlFor="facing">Facing</label>

        <input
          value={facing.toLocaleUpperCase()}
          id="facing"
          onChange={(e) => setFacing(e.target.value)}
        />

        <label htmlFor="action">Action</label>

        <select id="action">
          {options.map((option, y) => (
            <option key={y}>{option}</option>
          ))}
        </select>
      </S.InputFields>
      <button onClick={moveFunc}>Generate</button>
    </S.OuterWrapper>
  );
};

export default Board;
