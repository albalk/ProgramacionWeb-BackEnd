const request = require('supertest');
const app = require('../app')

//FUNCIONA

describe('users', () => {
    var token = ""
    var email = ""

    it('should register a user' , async () => {
        const response = await request(app)
            .post('/api/auth/register' )
            .send({"name": "Menganito", "email": "user33@test.com" ,"password": "HolaMundo.01", "age": 20, "ciudad": "Madrid", "intereses": ["deportes", "tecnologia"], "recibirOfertas": true})
            .set('Accept', 'application/json' )
            .expect(200)
        expect(response.body.user.email).toEqual('user33@test.com' )
        expect(response.body.user.role).toEqual(['user'])
        token = response.body.token
        email = response.body.user.email
    })
    it('should login a user' , async () => {
        const response = await request(app)
            .post('/api/auth/login' )
            .send({"email": "user33@test.com", "password": "HolaMundo.01"})
            .set('Accept', 'application/json' )
            .expect(200)
        expect(response.body.user.email).toEqual('user33@test.com')
        expect(response.body.user.role).toEqual(['user'])
        expect(response.body.token).toEqual(token)
    })
    it('should get the users' , async () => {
        const response = await request(app)
            .get('/api/users' )
            .set('Accept', 'application/json' )
            .expect(200)
        expect(response.body.pop().name).toEqual('Menganito')
    })
    it('should get a user' , async () => {
        const response = await request(app)
            .get('/api/users/' + email )
            .set('Accept', 'application/json' )
            .expect(200)
        expect(response.body.name).toEqual('Menganito')
    })
    it('should update a user' , async () => {
        const response = await request(app)
            .put('/api/users/' + email )
            .send({"name": "Menganito", "ciudad": "Barcelona", "recibirOfertas": false, "intereses": ["ropa", "comida"]})
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json' )
            .expect(200)
    })
    it('should publish a review' , async () => {
        const response = await request(app)
            .put('/api/users/reviews/POSTCOMERCIO2')
            .send({"cif": "POSTCOMERCIO2", "webpage": {"scoring": 5, "reseñas": "Muy buen servicio"}})
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json' )
            .expect(200)
        expect(response.body.cif).toEqual('POSTCOMERCIO2')
    })
    it('should delete a user' , async () => {
        const response = await request(app)
            .delete('/api/users/' + email)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json' )
            .expect(200)
        expect(response.body.acknowledged ).toEqual(true)
    })
})

//FUNCIONA

describe('comerces', () => {
    var tokenAdmin = ""
    var emailAdmin = ""
    var tokenComercio = ""
    var emailComercio = ""
    var cifComercio = ""

    it('should login ADMIN' , async () => {
        const response = await request(app)
            .post('/api/auth/login' )
            .send({"email": "ADMIN@admin.com", "password": "ADMIN"})
            .set('Accept', 'application/json' )
            .expect(200)
        expect(response.body.user.email).toEqual('ADMIN@admin.com')
        expect(response.body.user.role).toEqual(['admin'])
        tokenAdmin = response.body.token
        emailAdmin = response.body.user.email
    })
    it('should register a comerce' , async () => {
        const response = await request(app)
            .post('/api/auth/registerComerce' )
            .send({"name": "TEST", "cif": "TEST5476", "direccion": "Madrid", "email": "comerce@test.com" ,"password": "contraseña", "telefono": "123456789"})
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json' )
            .expect(200)
        expect(response.body.user.email).toEqual('comerce@test.com' )
        expect(response.body.user.cif).toEqual("TEST5476")
        tokenComercio = response.body.token
        emailComercio = response.body.user.email
        cifComercio = response.body.user.email
    })
    it('should login a comerce' , async () => {
        const response = await request(app)
            .post('/api/auth/loginComerce' )
            .send({"email": emailComercio, "password": "contraseña"})
            .set('Accept', 'application/json' )
            .expect(200)
        expect(response.body.user.email).toEqual('comerce@test.com')
    })
    it('should get all the comerces' , async () => {
        const response = await request(app)
            .get('/api/comerce' )
            .set('Accept', 'application/json' )
            .expect(200)
    })
    it('should get a comerce' , async () => {
        const response = await request(app)
            .get('/api/comerce/merchant/' + cifComercio )
            .set('Accept', 'application/json' )
            .expect(200)
    })
    it('should update a comerce' , async () => {
        const response = await request(app)
            .put('/api/comerce/' + cifComercio )
            .send({"name": "Menganito_modificado", "direccion": "Barcelona", "email": "comerce2@test.com", "password": "prueba", "telefono": "987654321"})
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json' )
            .expect(200)
    })
    it('should delete a comerce' , async () => {
        const response = await request(app)
            .delete('/api/comerce/' + cifComercio)
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json' )
            .expect(200)
        expect(response.body.acknowledged ).toEqual(true)
    })
})

//FUNCIONA

describe('webpages', () => {
    var emailComercio = "COMERCIOTEST@post.com"
    var contraseñaComercio = "COMERCIOTEST"
    var tokenComercio = ""
    var cifComercio = ""

    it('should login a comerce' , async () => {
        const response = await request(app)
            .post('/api/auth/loginComerce' )
            .send({"email": emailComercio, "password": contraseñaComercio})
            .set('Accept', 'application/json' )
            .expect(200)
        expect(response.body.user.email).toEqual('COMERCIOTEST@post.com')
        tokenComercio = response.body.token
        cifComercio = response.body.user.cif
    })
    it('should create a webpage' , async () => {
        const response = await request(app)
            .post('/api/comerce/webpages')
            .send({"cif": cifComercio, "webpage": {"ciudad": "Madrid", "actividad": "ropa", "titulo": "TEST", "resumen": "TEST", "textos": "textoTest", "fotos": "fotosTEST"}})
            .auth(tokenComercio, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.cif).toEqual(cifComercio)
    })
    it('should get all the webpages' , async () => {
        const response = await request(app)
            .get('/api/comerce/webpages')
            .set('Accept', 'application/json')
            .expect(200)
    })
    it('should get a webpage' , async () => {
        const response = await request(app)
            .get('/api/comerce/webpages/' + cifComercio)
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.cif).toEqual(cifComercio)
    })
    it('should update a webpage' , async () => {
        const response = await request(app)
            .put('/api/comerce/webpages/' + cifComercio )
            .send({"webpage": {"ciudad": "Barcelona", "actividad": "comida", "titulo": "TEST", "resumen": "HOLA TEST", "textos": "PRUEBATEST", "fotos": "fotosTEST"}})
            .auth(tokenComercio, { type: 'bearer' })
            .set('Accept', 'application/json' )
            .expect(200)
    })
    it('should delete a webpage' , async () => {
        const response = await request(app)
            .delete('/api/comerce/webpages/' + cifComercio)
            .auth(tokenComercio, { type: 'bearer' })
            .set('Accept', 'application/json' )
            .expect(200)
    })
})