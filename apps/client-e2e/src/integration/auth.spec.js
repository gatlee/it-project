describe('login', () => {
  before(() => {
    cy.authenticate();
    cy.saveLocalStorageCache();
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it('visit /', () => {
    cy.visit('/');
    cy.contains('Signed In');
  });

  it('visit /edit', () => {
    cy.visit('/edit');
    cy.contains('Projects');
  });
});
