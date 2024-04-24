const request = require('supertest');
const app = require('../app')

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
        //no añado más expects porque la peticion devuelve el objeto sin actualizar
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
    //comprobar que el comercio no existe en la base de datos
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
        expect(response.body.token).toEqual(tokenComercio)
    })
})