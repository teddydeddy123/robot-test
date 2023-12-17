import { useState } from "react";
import * as S from "./styles";

type FacingType = "SOUTH" | "NORTH" | "EAST" | "WEST" | "";
type WallType = { row: number; column: number }[];

const Board = () => {
  const [horizontal, setHorizontal] = useState(0);
  const [vertical, setVertical] = useState(0);
  const [facing, setFacing] = useState<FacingType>("SOUTH");
  const [selectedAction, setSelectedAction] = useState("PLACE_ROBOT");
  const [place, setPlace] = useState({
    rowPosition: 0,
    columnPosition: 0,
    direction: "",
  });
  const [walls, setWalls] = useState<WallType>([
    {
      row: 0,
      column: 0,
    },
  ]);

  const placeFunc = () => {
    const isPositionOccupied = walls.some(
      (wall) => wall.row === vertical && wall.column === horizontal
    );
      if (!isPositionOccupied) {
      setPlace((prevState) => ({
        ...prevState,
        rowPosition: vertical,
        columnPosition: horizontal,
        direction: facing,
      }));
    } else {

      console.log('Position is occupied. Cannot place robot.');
    }
  };

  const moveFunc = () => {
    if (facing === "SOUTH" || facing === "NORTH")
      // setPlace((prevState) => ({ ...prevState, direction: facing })),
      setPlace((prevState) => ({
        ...prevState,
        rowPosition: prevState["rowPosition"] + 1,
        direction: facing,
      }));
    else if (facing === "EAST" || facing === "WEST")
      // setPlace((prevState) => ({ ...prevState, direction: facing })),
      setPlace((prevState) => ({
        ...prevState,
        columnPosition: prevState["columnPosition"] + 1,
        direction: facing,
      }));

    // setPlace(prevState=> ({...prevState, rowPosition: prevState['rowPosition'] + 1}))
  };

  const placeWallFunc = () => {
    setWalls((prevState) => [
      ...prevState,
      { row: vertical, column: horizontal },
    ]);
  };

  console.log({ walls });

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

  const handlers = {
    PLACE_ROBOT: () => placeFunc(),
    MOVE: () => moveFunc(),
    PLACE_WALL: () => placeWallFunc(),
  };

  // console.log("facing:", facing);
  // console.log("direction:", place["direction"]);
  // console.log(`row:`, horizontal, "column:", vertical);
  // console.log(
  //   `rowPos:`,
  //   place["rowPosition"],
  //   "columnPos:",
  //   place["columnPosition"],
  // );
  console.log(walls[0]["row"]);
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
              isRed={walls.some(
                (wall) => wall.row === row && wall.column === col,
              )}
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
        {selectedAction !== "MOVE" && (
          <>
            <label htmlFor="vertical">Column</label>
            <input
              value={vertical.toString()}
              id="vertical"
              onChange={(e) => setVertical(parseInt(e.target.value))}
            />
            <label htmlFor="horizontal">Row</label>

            <input
              value={horizontal.toString()}
              id="horizontal"
              onChange={(e) => setHorizontal(parseInt(e.target.value))}
            />

            {selectedAction !== "PLACE_WALL" && (
              <>
                <label htmlFor="facing">Facing</label>

                <input
                  value={facing.toLocaleUpperCase()}
                  id="facing"
                  onChange={(e) => setFacing(e.target.value)}
                />
              </>
            )}
          </>
        )}
        <label htmlFor="action">Action</label>

        <select
          id="action"
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
        >
          {options.map((option, y) => (
            <option key={y}>{option}</option>
          ))}
        </select>
      </S.InputFields>
      <button onClick={handlers[selectedAction]}>Generate</button>
    </S.OuterWrapper>
  );
};

export default Board;
