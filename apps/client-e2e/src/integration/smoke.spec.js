describe('Unauthenticated Visitor', () => {
  it('visits /', () => {
    cy.visit('/');
  });

  it('handle unknown route /idontexist', () => {
    cy.visit('/idontexist');
    cy.contains('404');
  });

  it('will fail the test', () => {
    cy.visit('/');
    cy.contains('404');
  });
});
