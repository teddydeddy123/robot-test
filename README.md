# React + TypeScript + Vite + Styled-components

## 1. `npm install`

## 2. `npm run dev`

This repo contains cypress testing via `npm run cypress:run` - **PLEASE READ COMMENTS**



## !! **IMPORTANT NOTE**   !!:

After careful examination of the brief I received, I have strong reasons to believe that the examples given for each function and the test at the end of the document use different methodologies. As a consequence, the result of the cypress tests is (slightly) different than the one indicated in the pdf. For further details please consult comments in cypress test `first.cy.ts` .





## GENERAL UI/UX DETAILS:

-On the left side of the home page there is a list of instructions with a description.

-The user **must**  first either place a wall or a robot.

-Until there is a robot on the board the other functions such as `LEFT`, `MOVE` etc. will not become accessible from the `select` dropdown.

-To execute each action and the values inside the inputs, the user must click on the `Generate`  button. This will trigger the corresponding function. Until the button is clicked, the changes will not take place.

-For those actions, that per the brief's instructions are to be ignored, instead of doing nothing, the UI displays an error message, showing there is something wrong and a general description of the reason.
