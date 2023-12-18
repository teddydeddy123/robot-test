describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.get('input[id="vertical"]').eq(0).type("3");
    cy.get('input[id="horizontal"]').eq(0).type("3");
    cy.get('select[id="facing"]').select("NORTH");
    cy.get("button").contains("Generate").eq(0).click();
    //
    cy.get('select[id="action"]').select("PLACE_WALL");
    cy.get('input[id="vertical"]').eq(0).clear().type("3");
    cy.get('input[id="horizontal"]').eq(0).clear().type("5");
    // AS PER THE EXAMPLE GIVEN FOR PLACE_WALL, the first value corresponds to the row number and the second one to the column. However, for this is and the other test to match the result the position of row and column need to be reversed. IF YOU CHANGE PLACES IT WORKS
    cy.get("button").contains("Generate").eq(0).click();
    //
    //
    cy.get('select[id="action"]').select("MOVE");
    cy.get("button").contains("Generate").eq(0).click();
    cy.wait(1000);
    cy.get("button").contains("Generate").eq(0).click();
    //
    cy.get('select[id="action"]').select("RIGHT");
    cy.get("button").contains("Generate").eq(0).click();
    //
    cy.get('select[id="action"]').select("MOVE");
    cy.get("button").contains("Generate").eq(0).click();
    cy.wait(1000);
    cy.get("button").contains("Generate").eq(0).click();
    cy.wait(1000);
    cy.get("button").contains("Generate").eq(0).click();
    //
    cy.get('select[id="action"]').select("REPORT");
    cy.get("button").contains("Generate").eq(0).click();
    //THERE IS A LOGIC DISCREPENCY HERE. All other funtions (exception noted above) take the row number as the first value and the column as the second. The right order is not indicated in the example for REPORT. Thus I have reasons to believe that for some reason REPORT shows first the col and then the row for this to match brief's result.
  });
});
