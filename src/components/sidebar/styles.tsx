import styled from "styled-components";

export const Wrapper = styled.div<{ instructions: boolean }>`
  width: ${(props) => (props.instructions ? "80%" : "90px")};
  height: 100%;
  position: absolute;
  transition: width 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: #3c6e71;
  &::after {
    content: "${(props) => (props.instructions ? "<" : ">")}";
    position: absolute;
    top: 40%;
    right: ${(props) => (props.instructions ? "-2%" : "-20%")};
    width: 50px;
    font-size: 70px;
  }
`;

export const Title = styled.h1`
  font-family: "monospace";
`;

export const InstructionsWrapper = styled.div`
  text-align: left;
  padding: 20px;
  font-family: monospace;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Instruction = styled.div`
  h2 {
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 14px;
  }
`;
