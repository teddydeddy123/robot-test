import * as S from "./styles";

type Props = {
  instructions: boolean;
  onClick: () => void;
};

export const Sidebar = ({ instructions, onClick }: Props) => {
  const textData = [
    {
      action: "MOVE",
      instructions:
        "The MOVE command moves the robot 1 space forward in the direction it is currently facing",
    },
    {
      action: "MOVE",
      instructions:
        "The MOVE command moves the robot 1 space forward in the direction it is currently facing",
    },
    {
      action: "MOVE",
      instructions:
        "The MOVE command moves the robot 1 space forward in the direction it is currently facing",
    },
    {
      action: "MOVE",
      instructions:
        "The MOVE command moves the robot 1 space forward in the direction it is currently facing",
    },
  ];
  return (
    <S.Wrapper instructions={instructions} onClick={onClick}>
      {instructions && (
        <>
          {textData.map((text, i) => (
            <div key={i}>
              <h2>{text.action}</h2>
              <p>{text.instructions}</p>
            </div>
          ))}
        </>
      )}
    </S.Wrapper>
  );
};
