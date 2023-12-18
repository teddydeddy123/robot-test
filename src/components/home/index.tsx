import { useState } from "react";
import Board from "../board";
import * as S from "./styles";
import { Sidebar } from "../sidebar";

export const Home = () => {
  const [instructions, setInstructions] = useState(false);
  return (
    <S.Wrapper>
      <Sidebar
        instructions={instructions}
        onClick={() => setInstructions((prevState) => !prevState)}
      />
      <Board />
    </S.Wrapper>
  );
};
