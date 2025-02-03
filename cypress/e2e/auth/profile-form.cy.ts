describe('Profile Form', () => {
  beforeEach(() => {
    cy.visit('/en/account');
  });

  it('should display the form correctly', () => {

    cy.get('input[name="firstName"]').should('exist');
    cy.get('input[name="lastName"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="address"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should show validation errors when submitting empty form', () => {
   
    cy.get('button[type="submit"]').click();

    cy.contains('First name must be at least 2 characters').should('be.visible');
    cy.contains('Last name must be at least 2 characters').should('be.visible');
    cy.contains('Please enter a valid email').should('be.visible');
  });

  it('should allow filling out form with valid data', () => {
    
    cy.get('input[name="firstName"]').clear().type('John');
    cy.get('input[name="lastName"]').clear().type('Doe');
    cy.get('input[name="email"]').clear().type('john.doe@example.com');
    cy.get('input[name="address"]').clear().type('123 Main St');

    cy.get('button[type="submit"]').click();

    cy.contains('must be at least').should('not.exist');
    cy.contains('Please enter a valid email').should('not.exist');
  });

  it('should handle password change validation', () => {
    
    cy.get('input[name="newPassword"]').type('NewPass123!');
    cy.get('input[name="confirmNewPassword"]').type('NewPass123!');
    cy.get('button[type="submit"]').click();

    cy.contains('New passwords must match and current password is required').should('be.visible');

    cy.get('input[name="currentPassword"]').type('CurrentPass123!');
    cy.get('input[name="newPassword"]').clear().type('NewPass123!');
    cy.get('input[name="confirmNewPassword"]').clear().type('NewPass123!');
    cy.get('button[type="submit"]').click();

    cy.contains('passwords must match').should('not.exist');
  });

  it('should handle form reset', () => {

    cy.get('input[name="firstName"]').clear().type('John');
    cy.get('input[name="email"]').clear().type('john@example.com');

    cy.get('input[name="firstName"]').should('have.value', 'John');
    cy.get('input[name="email"]').should('have.value', 'john@example.com');

    cy.get('button').contains('Cancel').click().then(() => {

      cy.get('input[name="firstName"]').should('have.value', '');
      cy.get('input[name="email"]').should('have.value', '');
    });
  });
});