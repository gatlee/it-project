describe('Authenticated Visitor', () => {
  before(() => {
    cy.authenticate();
    cy.saveLocalStorageCache();
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it('visit /', () => {
    cy.visit('/');
    cy.contains('Welcome back');
  });

  it('visit /edit', () => {
    cy.visit('/edit');
    cy.contains('Projects');
  });
});
