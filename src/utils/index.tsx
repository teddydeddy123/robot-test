export type FacingType = "SOUTH" | "NORTH" | "EAST" | "WEST";
export type WallType = { row: number; column: number }[];
type PlaceType = {
  rowPosition: number;
  columnPosition: number;
  direction: string;
};
type CoordinatesType = number | null;

export const restrictedFields = ["MOVE", "RIGHT", "LEFT", "REPORT"];
export const directionDeg = [
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

export const placeWallFunc = (
  place: PlaceType,
  vertical: CoordinatesType,
  horizontal: CoordinatesType,
  setWalls: React.Dispatch<React.SetStateAction<WallType>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
) => {
  if (place.rowPosition !== vertical || place.columnPosition !== horizontal) {
    setWalls((prevState) => [
      ...prevState,
      { row: vertical!, column: horizontal! },
    ]);
  } else setError("Position is occupied by robot. Cannot place wall.");
};

export const moveFunc = (
  place: PlaceType,
  setPlace: React.Dispatch<React.SetStateAction<PlaceType>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  walls: WallType,
  facing: FacingType,
) => {
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
    setPlace((prevState) => ({
      ...prevState,
      rowPosition: nextRow < 1 ? 5 : nextRow > 5 ? 1 : nextRow,
      columnPosition: nextColumn < 1 ? 5 : nextColumn > 5 ? 1 : nextColumn,
      direction: facing,
    }));
  } else {
    setError("Position is occupied. Cannot move robot.");
  }
};

export const rotateFunc = (
  action: string,
  facing: FacingType,
  setFacing: React.Dispatch<React.SetStateAction<FacingType>>,
  setPlace: React.Dispatch<React.SetStateAction<PlaceType>>,
) => {
  const currentIndex = directionDeg.findIndex((item) => item.facing === facing);

  if (currentIndex !== -1) {
    const currentDeg = directionDeg[currentIndex].deg;
    let newDeg: number;
    if (action === "left") newDeg = (currentDeg + 360 + 90) % 360;
    else if (action === "right") newDeg = (currentDeg + 360 - 90) % 360;

    const newFacing =
      directionDeg.find((item) => item.deg === newDeg)?.facing || facing;

    setPlace((prevState) => ({
      ...prevState,
      rowPosition: prevState.rowPosition,
      columnPosition: prevState.columnPosition,
      direction: newFacing,
    }));
    setFacing(newFacing as FacingType);
  }
};

export const placeFunc = (
  setPlace: React.Dispatch<React.SetStateAction<PlaceType>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  walls: WallType,
  facing: FacingType,
  vertical: CoordinatesType,
  horizontal: CoordinatesType,
) => {
  const isPositionOccupied = walls.some(
    (wall) => wall.row === vertical && wall.column === horizontal,
  );
  if (
    !isPositionOccupied &&
    directionDeg.some((item) => item.facing === facing.toLocaleUpperCase())
  ) {
    if (vertical !== null && horizontal !== null)
      if (vertical > 5 || vertical < 1 || horizontal > 5 || horizontal < 1)
        setError("Position is out of range");
      else {
        setPlace((prevState) => ({
          ...prevState,
          rowPosition: vertical!,
          columnPosition: horizontal!,
          direction: facing,
        }));
      }
  } else {
    setError("Position is occupied or invalid. Cannot place robot.");
  }
};

export const reportFunc = (
  place: PlaceType,
  facing: FacingType,
  setReport: React.Dispatch<React.SetStateAction<string>>,
) => {
  setReport(`${place.rowPosition}, ${place.columnPosition}, ${facing}`);
};
