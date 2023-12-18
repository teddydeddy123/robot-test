describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.get('input[id="vertical"]').eq(0).type("3");
    cy.get('input[id="horizontal"]').eq(0).type("3");
    cy.get('input[id="facing"]').eq(0).clear().type("NORTH");
    cy.get("button").contains("Generate").eq(0).click();
    //
    cy.get('select[id="action"]').select("PLACE_WALL");
    cy.get('input[id="vertical"]').eq(0).clear().type("3");
    cy.get('input[id="horizontal"]').eq(0).clear().type("5"); //IF YOU CHANGE PLACES IT WORKS
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
  });
});
