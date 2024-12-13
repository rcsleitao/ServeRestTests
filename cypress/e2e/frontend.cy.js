/// reference types="Cypress" />
import { productname } from "../support/e2e";

describe('ServeRest Frontend E2E Tests', () => {

  const random = Math.floor(Math.random() * 1000);
  
    
  //To login with new admin user before each test below;
  beforeEach(function() {
  
    //Creating a way to have unique user and email based on timestamp, cleaning special characters and spaces to be happy on new user creation; 
    const time = Date.now()
    const current = new Date(time)
    const datestring = current.toLocaleString()
    const datestringclean = datestring.replace(/[^a-zA-Z0-9 ]/g, '')
    const datestringnospace = datestringclean.replace(/\s+/g, '') 
    

    cy.visit('https://front.serverest.dev/login')
    cy.url()
      .should('eq','https://front.serverest.dev/login')  
    cy.get('h1').should('contain.text','Login')
    cy.get('[data-testid="cadastrar"]').click()
    cy.get('h2').should('contain.text','Cadastro')
    cy.get('input[type="text"]').type(datestringnospace)
      .should('have.value',datestringnospace)
    cy.get('input[type="email"]').type(datestringnospace+'@email.com')
    cy.get('input[type="password"]').type("mypass1") 
    cy.get('input[type="checkbox"]').check()
      .should('be.checked')
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
})
  

  it('Verify admin user is able to register new product', function(){
    const longDescription='This is a new product being registered from an admin'
   

    cy.url().should('eq','https://front.serverest.dev/admin/home')
    cy.get('h1').should('contain.text','Bem Vindo')
    cy.get('[data-testid="cadastrarProdutos"]').click() 
    cy.get('h1').should('contain.text','Cadastro de Produtos')

    //Enter new product data;
    cy.get('input[id="nome"]').type('ProductID'+random) 
    cy.get('input[id="price"]').type("199")
    cy.get('textarea[id="description"]').focus()
      .type(longDescription,{delay:0})
    cy.get('input[id="quantity"]').type("100")
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/qaimage.jpg")
      .should(function($input){ 
        expect($input[0].files[0].name).to.equal("qaimage.jpg")})
    cy.get('button[type="submit"]').click()
    cy.url()
      .should('eq','https://front.serverest.dev/admin/listarprodutos')
    cy.get('h1').should('contain.text','Lista dos Produtos')

    //Ensure the new product is listed;
    cy.get('table tbody tr')  
      .filter((index, row) => {
      return Cypress.$(row).text().includes('ProductID'+random)
      })
    cy.get('[data-testid="logout"]').click()  
      });


  it('Verify admin user is able to edit an existing product',function(){
    //Search for specific product in the list to Edit; 
    cy.get('[data-testid="listarProdutos"]').click()
    cy.wait(2000)
    cy.get('table tbody tr')  
      .filter((index, row) => {
       return Cypress.$(row).text().includes('ProductID'+random);
  })
      .first()  
      .within(() => {
    cy.contains('Editar').click();   
    //It seems there is no action from ServeRest when clicking on Edit, so stopping here; 
  });
    cy.get('[data-testid="logout"]').click() 
  });
  
 
  
  it('Verify able to create regular user to add a product on shopping cart',function(){    
     
    const newuser = 'User'+random
    const pass = 'mynewuserpass'
    const email = newuser+'@email.com'                      

     cy.get('[data-testid="cadastrar-usuarios"]').click()
     cy.get('h1').should('contain.text','Cadastro de usuários')

    //Enter new user data;
    cy.get('input[type="text"]').type(newuser)
      .should('have.value',newuser)
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(pass)  

    //Check new user as administrator;
    cy.get('input[type="checkbox"]').should('not.be.checked')

    //Submit; 
    cy.get('button[type="submit"]').click()
    cy.wait(2000)   

    cy.get('[data-testid="logout"]').click()
    cy.visit('https://front.serverest.dev/login')
    cy.url()
      .should('eq','https://front.serverest.dev/login')
    cy.get('input[id="email"]').type(email) 
    cy.get('input[id="password"]').type(pass)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    cy.get('[data-testid="pesquisar"]').click();
    cy.get('input[type="search"]').type('ProductID'+random)
    cy.get('[data-testid="botaoPesquisar"]').click()
    cy.wait(2000)
    cy.get('[data-testid="adicionarNaLista"]').click()
    cy.wait(2000)
    cy.get('[data-testid="adicionar carrinho"]').click()
    cy.get('h1').should('contain.text','Em construção aguarde')
    cy.get('[data-testid="logout"]').click()

    

  })

});

