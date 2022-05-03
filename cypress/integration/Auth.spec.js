beforeEach(() => {
    cy.visit('http://localhost:3000/login'); 
});


it('login with wrong username and password', () => {
    cy.get('input[name="email"]').type('t3st@email.com'); // Find the input with the name "email", then type a value
    cy.get('input[name="password"]').type('t3st'); // Find the input with the name "password", then type a value
    cy.get('.loginButton').click(); // Find the element with the class .loginButton, then click it
    cy.wait(5000)
});

it('login a user with email and password', () => {
    cy.get('input[name="email"]').type('test@email.com'); // Find the input with the name "email", then type a value
    cy.get('input[name="password"]').type('test'); // Find the input with the name "password", then type a value
    cy.get('.loginButton').click(); // Find the element with the class .loginButton, then click it
    cy.wait(2500)
});