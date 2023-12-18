import * as S from "./styles";

type Props = {
  instructions: boolean;
  onClick: () => void;
};

export const Sidebar = ({ instructions, onClick }: Props) => {
  const textData = [
    {
      action: "PLACE_ROBOT",
      instructions:
        "This command places a robot at a given coordinate with an initial Facing direction. Accepted Facing values are: NORTH, SOUTH, EAST, WEST.",
    },
    {
      action: "PLACE_WALL",
      instructions: "This command places a wall at the given coordinate.",
    },
    {
      action: "REPORT",
      instructions:
        "The game prints out the current location and facing direction of the robot.",
    },
    {
      action: "MOVE",
      instructions:
        "The MOVE command moves the robot 1 space forward in the direction it is currently facing.",
    },
    {
      action: "LEFT / RIGHT",
      instructions:
        "The turn commands LEFT and RIGHT, turns the robot 90 degrees to its current left or right.",
    },
  ];
  return (
    <S.Wrapper instructions={instructions} onClick={onClick}>
      {instructions && (
        <>
          <S.Title>INSTRUCTIONS</S.Title>
          <S.InstructionsWrapper>
            {textData.map((text, i) => (
              <S.Instruction key={i}>
                <h2>{text.action}</h2>
                <p>{text.instructions}</p>
              </S.Instruction>
            ))}
          </S.InstructionsWrapper>
        </>
      )}
    </S.Wrapper>
  );
};
