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
  const directionDeg = [
    {
      facing: "NORTH",
      deg: 0,
    },
    {
      facing: "WEST",
      deg: 90,
    },
    {
      facing: "SOUTH",
      deg: 180,
    },
    {
      facing: "EAST",
      deg: 270,
    },
  ];

  const leftFunc = (action: string) => {
    const currentIndex = directionDeg.findIndex(
      (item) => item.facing === facing,
    );

    if (currentIndex !== -1) {
      const currentDeg = directionDeg[currentIndex].deg;
      let newDeg: number;
      if (action === "left") newDeg = (currentDeg + 360 + 90) % 360;
      else if (action === "right") newDeg = (currentDeg + 360 - 90) % 360;

      // Find the new facing direction based on the updated deg value
      const newFacing =
        directionDeg.find((item) => item.deg === newDeg)?.facing || facing;

      // Update the facing state
      setFacing(newFacing as FacingType);
    }
  };

  const [walls, setWalls] = useState<WallType>([
    {
      row: 0,
      column: 0,
    },
  ]);

  const reportFunc = () => {
    console.log(`${place.rowPosition}, ${place.columnPosition}, ${facing}`);
  };

  const placeFunc = () => {
    const isPositionOccupied = walls.some(
      (wall) => wall.row === vertical && wall.column === horizontal,
    );
    if (!isPositionOccupied) {
      setPlace((prevState) => ({
        ...prevState,
        rowPosition: vertical,
        columnPosition: horizontal,
        direction: facing,
      }));
    } else {
      console.log("Position is occupied. Cannot place robot.");
    }
  };

  console.log({ walls });
  console.log("VERT", place.columnPosition);
  console.log("hor", place.rowPosition);

  const moveFunc = () => {
    let nextRow = place.rowPosition;
    let nextColumn = place.columnPosition;

    if (facing === "SOUTH") {
      nextRow = place.rowPosition - 1;
    } else if (facing === "NORTH") {
      nextRow = place.rowPosition + 1;
    } else if (facing === "EAST") {
      nextColumn = place.columnPosition + 1;
    } else if (facing === "WEST") {
      nextColumn = place.columnPosition - 1;
    }

    const isPositionOccupied = walls.some(
      (wall) => wall.row === nextRow && wall.column === nextColumn,
    );

    if (!isPositionOccupied) {
      const currentIndex = directionDeg.findIndex(
        (item) => item.facing === facing,
      );
      if (currentIndex !== -1) {
        const currentDeg = directionDeg[currentIndex].deg;

        let newDeg;
        if (currentDeg > 360) newDeg = (currentDeg - 180) % 360;
        else newDeg = (currentDeg + 180) % 360;

        const newFacing =
          directionDeg.find((item) => item.deg === newDeg)?.facing || facing;

        if (nextRow > 5 || nextRow < 1 || nextColumn > 5 || nextColumn < 1) {
          // If next position is out of bounds, set direction to opoisute direction
          setFacing(newFacing);
          console.log("Value is greater or less");
        } else {
          setPlace((prevState) => ({
            ...prevState,
            rowPosition: nextRow,
            columnPosition: nextColumn,
            direction: newFacing,
          }));
        }
      } else {
        console.log("Current facing direction not found in directionDeg.");
      }
    } else {
      console.log("Position is occupied. Cannot move robot.");
    }
  };

  const placeWallFunc = () => {
    setWalls((prevState) => [
      ...prevState,
      { row: vertical, column: horizontal },
    ]);
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

  const handlers = {
    PLACE_ROBOT: () => placeFunc(),
    MOVE: () => moveFunc(),
    PLACE_WALL: () => placeWallFunc(),
    LEFT: () => leftFunc("left"),
    RIGHT: () => leftFunc("right"),
    REPORT: () => reportFunc(),
  };

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
                  // <S.RobotIcon size={30} facing={place["direction"]} />
                  <S.RobotIcon size={30} facing={facing} />
                )}
            </S.Field>
          );
        })}
      </S.Wrapper>
      <S.InputFields>
        {selectedAction !== "MOVE" &&
          selectedAction !== "RIGHT" &&
          selectedAction !== "LEFT" &&
          selectedAction !== "REPORT" && (
            <>
              <label htmlFor="vertical">Row</label>{" "}
              {/* here it has been reversed because of flip style so vertical is actually a row*/}
              <input
                value={vertical.toString()}
                id="vertical"
                onChange={(e) => setVertical(parseInt(e.target.value))}
              />
              <label htmlFor="horizontal">Column</label>
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

        {(selectedAction === "LEFT" || selectedAction === "RIGHT") && (
          <>
            <label htmlFor="facing">Facing</label>

            <input
              value={facing.toLocaleUpperCase()}
              id="facing"
              disabled
              onChange={(e) => setFacing(e.target.value)}
            />
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
