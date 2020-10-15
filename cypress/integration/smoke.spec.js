describe('smoke', () => {
  it('visits the app', () => {
    cy.visit('/');
  });

  it('handle unknown route', () => {
    cy.visit('/idontexist');
    cy.contains('404');
  });
});
