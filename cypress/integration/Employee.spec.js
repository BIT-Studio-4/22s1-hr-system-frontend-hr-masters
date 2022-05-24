

it('login a user with email and password', () => {
    cy.visit('https://hr-masters-frontend-test.herokuapp.com/login'); 
    cy.get('input[name="email"]').type('test@email.com'); // Find the input with the name "email", then type a value
    cy.get('input[name="password"]').type('test'); // Find the input with the name "password", then type a value

    // using validation to make sure it's using the correct login information.
    cy.get('.loginButton').click(); // Find the element with the class .loginButton, then click it
});


it('Creating a new person', () => {
    cy.wait(2500);
    cy.get('[id^=create_button]').click();
    cy.get('input[name="first_name"]').type('Bobbert');// Looks for the input named first_name then types the name. 
    cy.get('input[name="last_name"]').type('Builder');
    cy.get('input[name="username"]').type('BobbertTheBuilder');
    cy.get('input[name="email"]').type('bobbert@email.com');
    cy.get('[id^=save_button]').click();
    cy.wait(2500);
    cy.reload();

    // using validation to make sure the correct text is in each section. 
    cy.get('.table').contains('Bobbert');
    cy.get('.table').contains('Builder');
    cy.get('.table').contains('BobbertTheBuilder');
    cy.get('.table').contains('bobbert@email.com');   
});

it('Check employee update button', () => {
    cy.get('[id^=update_Bobbert_Builder]').click(); // Find the id update_Builder_BobbertTheBuilder then click it 
    cy.get('[id^=cancel_button]').click();
});


it('Check employee delete button', () => {
    cy.get('[id^=delete_Builder_BobbertTheBuilder]').click();
    cy.get('[id^=delete_confirm]').click();   
});