it('login a user with email and password', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type('test@email.com'); // Find the input with the name "email", then type a value
    cy.get('input[name="password"]').type('test'); // Find the input with the name "password", then type a value
    cy.get('.loginButton').click(); // Find the element with the class .loginButton, then click it
});


it('Creating a new person', () => {
    cy.waitUntil(() => cy.get('.mainContent').contains('Employees'));
    cy.get('[id^=create_button]').click();
    cy.get('input[name="first_name"]').type('Bobbert'); // Looks for the input named first_name then types the name.
    cy.get('input[name="last_name"]').type('Builder');
    cy.get('input[name="username"]').type('BobbertTheBuilder');
    cy.get('input[name="email"]').type('bobbert@email.com');
    cy.get('[id^=save_button]').click();
    cy.wait(1000);
    cy.reload();
});

it('Creating new performance plans', () => {
    cy.get('[id^=BobbertBuilder]').click();
    cy.get('[id^=performance_Bobbert_Builder]').click(); 
    cy.waitUntil(() => cy.get('.modal-title').contains('Plan'));
    cy.get('.createButton.btn.btn-outline-secondary').click();
    cy.get('textarea[name="title"]').type('Tester plan');
    cy.get('textarea[name="initial_goal"]').type('For this test to run');
    cy.get('textarea[name="specific"]').type('I need this test to run');
    cy.get('textarea[name="measureable"]').type('by this test running');
    cy.get('textarea[name="achievable"]').type('please run');
    cy.get('textarea[name="relevant"]').type('Test running');
    cy.get('textarea[name="time_bound"]').type('If you see this it worked');
    cy.get('textarea[name="title"]').type('test test');
    cy.get('textarea[name="goal_statement"]').type('This will work');
    cy.get('[id^=save_button]').click();
    cy.wait(1000)
});

it('updating the made performance plan', () => {
    cy.get('[id^=performance_Bobbert_Builder]').click(); 
    cy.get('[id^=dropdown-basic]').click();
    cy.get('[id^=0]').click();
    cy.get('[id^=update_button]').click();
    cy.waitUntil(() => cy.get('.resetButton').contains('Reset'));
    cy.get('textarea[name="title"]').type('This is a real title');
    cy.get('[id^=save_button]').click();
    
});

it('Deleting the new person made', () => {
    cy.waitUntil(() => cy.get('.mainContent').contains('Employee'));
    cy.get('[id^=delete_Builder_BobbertTheBuilder]').click();
    cy.get('[id^=delete_confirm]').click(); 
});