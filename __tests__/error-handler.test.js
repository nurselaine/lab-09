'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelize } = require('../src/models');

const mockServer = supertest(app);

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
});

describe('Error Handlers Validation', () => {
  it('Handlers bad endpoint requests', async () => {
    const badUser = {username: 'badUser', nutmeg: 'password'}
    const response = await mockServer.post('/signup').send(badUser);
    console.log(response.body);
    expect(response.status).toBe(500);

  })

  it('Handlers bad requests', async () => {
    const response = await mockServer.post('/badRouteURI');
console.log(response.body);
    expect(response.status).toBe(404);
  })
})