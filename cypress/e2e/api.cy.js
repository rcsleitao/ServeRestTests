describe('API Tests for ServeRest', () => {
  
const APIurl = 'https://serverest.dev';

//The users are cleanned from ServeRest, so please manually create the below Admin user before run API tests below: 
//user:  user1
//email: email1@email.com
//pass: minhasenha1
//admin: True


//Login with existing admin user 
  it('Login with admin user', () => { 
    cy.request({
      method: 'POST',
      url: APIurl+'/login',
      body: {
        email: 'email1@email.com',
        password: 'minhasenha1'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    })
  })

  

//create new admin user; 
  it('Create new user', () => {
    const newUser = {
        nome: 'APIuser',
        email: `apitestuser_${Date.now()}@email.com`,    //again to crate unique users based on timestamp;
        password: 'password123',
        administrador: 'true'
    }
    cy.request({
      method: 'POST' ,   
      url: APIurl+'/usuarios',
      body: newUser
    })
    .then((response) => {
      expect((response.status)).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
  })
  })

  
//To get only first 5 products available; 
  it('To get first 5 products available', () => {
    cy.request({
      method: 'GET',
      url: APIurl+'/produtos'
    }).then((response) => {
        expect(response.status).to.eq(200)
        const fiveprotudcts = response.body.produtos.slice(0,5);
        cy.log('First 5 Products available:',fiveprotudcts);

     })
  })
})

