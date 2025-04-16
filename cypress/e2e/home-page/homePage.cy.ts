describe("Access Home Page", () => {
  describe("User should see login button and not the navigation menu when logged out", () => {
    it("Given the user is not logged in", () => {
      cy.clearCookies();
      cy.clearAllLocalStorage();
      cy.clearAllSessionStorage();
    });

    it("When the user visits the home page", () => {
      cy.visit("/");
    });

    it("Then the login button should be visible", () => {
      cy.get("#header > section:nth-child(3) > button:nth-child(2)").should(
        "be.visible"
      );
    });
    it("And the navigation menu should not be visible", () => {
      cy.get("#header > section:nth-child(1) > nav").should("not.visible");
    });
    it("And the home page should display a message h2 Sistema feito para você organizar seus estudos e tarefas", () => {
      cy.get("h2").should(
        "contain.text",
        "Sistema feito para você organizar seus estudos e tarefas"
      );
    });
  });
});
