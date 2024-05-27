const request = require("supertest");
const server = require("../index");

describe('Test Desafio', () => {
    it('Obteniendo cafes', async () => {
        const { statusCode, body: cafes} = await request(server).get('/cafes').send()
        expect(statusCode).toBe(200)
        expect(cafes).toBeInstanceOf(Array)
        expect(cafes.length).toBeGreaterThanOrEqual(1)
    })

    it('Eliminando cafes', async () => {
        const jwt = 'token'
        const id = 1010101010100101010
        const { statusCode } = await request(server).delete(`/cafes/${id}`).set('Authorization', jwt).send()
        expect(statusCode).toBe(404)
    })

    it('Agregar Cafe', async () => {
        const cafe = {
            id:5,
            nombre:'cafe 5'
        }
        const { statusCode, body: cafes } = await request(server).post(`/cafes`).send(cafe)
        expect(statusCode).toBe(201)
        expect(cafes).toContainEqual(cafe)
    })

    it('Actualizar cafe', async () => {
        const id = 1
        const id2 = id+1
        const nuevoObjeto = { id, nombre: 'madrid'}
        const { statusCode } = await request(server).put(`/cafes/${id2}`).send(nuevoObjeto)
        expect(statusCode).toBe(400)
    })


});
