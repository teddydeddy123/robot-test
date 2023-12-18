import { useEffect, useState } from "react";
import * as S from "./styles";
import {
  CoordinatesType,
  FacingType,
  WallType,
  moveFunc,
  placeFunc,
  placeWallFunc,
  reportFunc,
  restrictedFields,
  rotateFunc,
} from "../../utils";

const Board = () => {
  const [horizontal, setHorizontal] = useState<CoordinatesType>(null);
  const [vertical, setVertical] = useState<CoordinatesType>(null);
  const [facing, setFacing] = useState<FacingType>("SOUTH");
  const [selectedAction, setSelectedAction] = useState("PLACE_ROBOT");
  const [error, setError] = useState("");
  const [report, setReport] = useState("");
  const [place, setPlace] = useState({
    rowPosition: 0,
    columnPosition: 0,
    direction: "",
  });
  const [walls, setWalls] = useState<WallType>([]);

  const array = Array.from({ length: 25 });

  const cordinatesArray = Array.from({ length: 5 });

  const options =
    place.columnPosition === 0 || place.rowPosition === 0
      ? ["PLACE_ROBOT", "PLACE_WALL"]
      : ["MOVE", "PLACE_ROBOT", "PLACE_WALL", "LEFT", "RIGHT", "REPORT"];

  const handlers: Record<string, () => void> = {
    PLACE_ROBOT: () =>
      placeFunc(setPlace, setError, walls, facing, vertical, horizontal),
    MOVE: () => moveFunc(place, setPlace, setError, walls, facing),
    PLACE_WALL: () =>
      placeWallFunc(place, vertical, horizontal, setWalls, setError),
    LEFT: () => rotateFunc("left", facing, setFacing, setPlace),
    RIGHT: () => rotateFunc("right", facing, setFacing, setPlace),
    REPORT: () => reportFunc(place, facing, setReport),
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
      clearInterval(timeout);
    }, 3000);
  }, [error]);

  useEffect(() => {
    setReport("");
  }, [place]);

  const op = ["SOUTH", "NORTH", "EAST", "WEST"];
  return (
    <S.OuterWrapper>
      <S.Report>{report}</S.Report>
      <S.Wrapper>
        <S.CordinatesHorizontal>
          {cordinatesArray.map((_, k) => (
            <p key={k}>{k + 1}</p>
          ))}
        </S.CordinatesHorizontal>
        <S.CordinatesVertical>
          {cordinatesArray.reverse().map((_, k) => (
            <p key={k}>{5 - k}</p>
          ))}
        </S.CordinatesVertical>
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
            >
              {row === place["rowPosition"] &&
                col === place["columnPosition"] && (
                  <S.RobotIcon
                    size={30}
                    facing={place["direction"].toLocaleUpperCase()}
                  />
                )}
            </S.Field>
          );
        })}
      </S.Wrapper>
      {!restrictedFields.includes(selectedAction) && (
        <S.InputFields>
          <S.InputField>
            <label htmlFor="vertical">Row</label>{" "}
            {/* here it has been reversed because of flip (scale 1, -1) style so vertical is actually a row*/}
            <input
              value={(vertical ?? "").toString()}
              id="vertical"
              onChange={(e) => {
                const value = e.target.value.trim(); // Trim otherwise throws NAN
                setVertical(value !== "" ? parseInt(value) : null);
              }}
            />
          </S.InputField>
          <S.InputField>
            <label htmlFor="horizontal">Column</label>
            <input
              value={(horizontal ?? "").toString()}
              id="horizontal"
              onChange={(e) => {
                const value = e.target.value.trim();
                setHorizontal(value !== "" ? parseInt(value) : null);
              }}
            />
          </S.InputField>
          {selectedAction !== "PLACE_WALL" && (
            <S.InputField>
              <label htmlFor="facing">Facing</label>

              <S.Select
                value={facing.toLocaleUpperCase()}
                id="facing"
                onChange={(e) => setFacing(e.target.value as FacingType)}
              >
                {op.map((face, h) => (
                  <option key={h}>{face}</option>
                ))}
              </S.Select>
            </S.InputField>
          )}
        </S.InputFields>
      )}
      <S.InputField>
        <label htmlFor="action">Action</label>
        <S.Select
          id="action"
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
        >
          {options.map((option, y) => (
            <option key={y}>{option}</option>
          ))}
        </S.Select>
      </S.InputField>
      <S.Button onClick={handlers[selectedAction]}>Generate</S.Button>
      <S.Error>{error}</S.Error>
    </S.OuterWrapper>
  );
};

export default Board;
