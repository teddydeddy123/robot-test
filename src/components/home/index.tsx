import Board from "../board";
import * as S from "./styles";

export const Home = () => {
  return (
    <S.Wrapper>
      <S.Sidebar />
      <Board />
    </S.Wrapper>
  );
};
