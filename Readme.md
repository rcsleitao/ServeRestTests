#ServeRest


For ServRest tests:

1.   On terminal at cypress folder, type command "Npx cypress open";           
2.   Select attached specs to run;
2.a  frontend.cy.js for E2E scenarios on ServeRest frontend application;
2.b  api.cy.js for automated API test samples on ServeRest;
3.   Use google chrome to run tests.
4.   The JPG image used for create new product scenarios is under ..cypress/fixtures/qaimage.jpg.

5.   NOTE:  Before run api.cy.js, please manually create admin user at https://front.serverest.dev/login  to have a valid token for testing: 

user:  user1
email: email1@email.com
pass:  minhasenha1
admin: True

Thanks! 