describe('Auth Tests', () => {

  it('should register a user', () => {
    cy.visit('/register');

    cy.get('input[name=name]').type('John pak');
    cy.get('input[name=email]').type('pak@example.com');
    cy.get('input[name=password]').type('123456');
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/login');
  });
  
  it('should log in a user', () => {
    cy.visit('/login');

    cy.get('input[name=email]').type('pak@example.com');
    cy.get('input[name=password]').type('123456');
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/dashboard');
  });

 
});
