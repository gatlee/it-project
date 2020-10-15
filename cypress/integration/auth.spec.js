describe('login', () => {
  before(() => {
    cy.login();
    cy.saveLocalStorageCache();
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it('visit /', () => {
    cy.visit('/');
    cy.contains('Signed In');
  });
});
