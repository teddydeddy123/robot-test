import { useState } from "react";
import * as S from "./styles";

const Board = () => {
  const [horizontal, setHorizontal] = useState(0);
  const [vertical, setVertical] = useState(0);

  const array = Array.from({ length: 25 });
  const cordinatesArray = Array.from({ length: 5 });
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
              isBlue={row === horizontal && col === vertical}
            >
              {row === horizontal && col === vertical && (
                <S.RobotIcon size={30} />
              )}
            </S.Field>
          );
        })}
      </S.Wrapper>
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
    </S.OuterWrapper>
  );
};

export default Board;
