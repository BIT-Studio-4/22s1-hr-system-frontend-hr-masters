beforeEach(() => {
    cy.visit('http://localhost:3000/employees'); 
});

it('login a user with email and password', () => {
    cy.get('input[name="email"]').type('test@email.com'); // Find the input with the name "email", then type a value
    cy.get('input[name="password"]').type('test'); // Find the input with the name "password", then type a value
    cy.get('.loginButton').click(); // Find the element with the class .loginButton, then click it
    cy.wait(2500)
});


it('Check employee table buttons', () => {
    cy.get('[id^=update_Alano_Lehrer]').click(); // Find the id update_Alano_Lehrer then click it 
    cy.wait(2500)
    cy.get('[id^=cancel_button]').click();
    cy.wait(2500)
    cy.get('[id^=update_BigSky_Berdale]').click();
    cy.wait(2500)
    cy.get('[id^=cancel_button]').click();
    cy.wait(2500)
});


it('Creating a new person', () => {
    cy.get('[id^=create_button]').click();
    cy.get('input[name="first_name"]').type('Bobbert'); // Looks for the input named first_name then types the name.
    cy.get('input[name="last_name"]').type('Builder');
    cy.get('input[name="username"]').type('BobbertTheBuilder');
    cy.get('input[name="email"]').type('bobbert@email.com');
    cy.get('[id^=save_button]').click();
    cy.wait(2500)
});

it('Check employee table buttons', () => {
    cy.get('[id^=delete_Builder_BobbertTheBuilder]').click();
    cy.wait(2500)
    cy.get('[id^=delete_confirm]').click();   
});

