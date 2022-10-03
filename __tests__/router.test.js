'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelize } = require('../src/models');

const mockRequest = supertest(app);

let userData = {
  testUser: { username: 'user', password: 'password', role: 'user' },
  testWriter: { username: 'writer', password: 'password', role: 'writer' },
  testEditor: { username: 'editor', password: 'password', role: 'editor' },
  testAdmin: { username: 'admin', password: 'password', role: 'admin' },
};

let userToken;
let writerToken;
let editorToken;
let adminToken;

beforeAll(async () => {
  await sequelize.sync();
  userToken = await mockRequest.post('/signup').send(userData.testUser);
  writerToken = await mockRequest.post('/signup').send(userData.testWriter);
  editorToken = await mockRequest.post('/signup').send(userData.testEditor);
  adminToken = await mockRequest.post('/signup').send(userData.testAdmin);
});

afterAll(async () => {
  await sequelize.drop();
});

/*
POST /api/v2/:model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item
GET /api/v2/:model with a bearer token that has read permissions returns a list of :model items
GET /api/v2/:model/ID with a bearer token that has read permissions returns a single item by ID
PUT /api/v2/:model/ID with a bearer token that has update permissions returns a single, updated item by ID
DELETE /api/v2/:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found
*/

describe('Authenticated API Routes', () => {

  it('POST /:model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item', async () => {
    let affirmation = {affirmation: "writer"};
    // console.log(`writerToken ${JSON.stringify(writerToken.body.token)}`);
    let accessToken = writerToken.body.token;
    const response = await mockRequest.post('/affirmations').set('Authorization', `Bearer ${accessToken}`).send(affirmation);

    const affirm = response.body;
    // console.log(affirm);
    expect(response.status).toBe(201);
    expect(affirm.affirmation).toBe(affirmation.affirmation);
    expect(affirm.affirmation).toEqual('writer');
    expect(affirm.id).toEqual(1);
  })

  it('GET /:model with a bearer token that has read permissions returns a list of :model items', async () => {
    // let food = {name: "cake", calories: "300", type: "dessert"}
    let accessToken = userToken.body.token;
    const response = await mockRequest.get('/jokes').set('Authorization', `Bearer ${accessToken}`);

    // const foodObject = response.body;
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  })

  it('GET /:model/ID with a bearer token that has read permissions returns a single item by ID', async () => {
    // let food = {name: "cake", calories: "300", type: "dessert"}
    let accessToken = userToken.body.token;
    const response = await mockRequest.get('/affirmations/1').set('Authorization', `Bearer ${accessToken}`);

    const affirm = response.body;
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(affirm.affirmation).toBe(response.body.affirmation);
    expect(affirm.affirmation).toEqual('writer');
    expect(affirm.id).toEqual(1);
  })

  it('PUT /:model/ID with a bearer token that has update permissions returns a single, updated item by ID', async () => {
    // let food = {name: "cake", calories: "300", type: "dessert"}
    let accessToken = editorToken.body.token;
    const response = await mockRequest.put('/affirmations/1').set('Authorization', `Bearer ${accessToken}`).send({affirmation: "YASSSS"});
    const userObject = response.body;

    // const foodObject = response.body;
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(userObject.affirmation).toEqual("YASSSS");
  })

  it('DELETE /:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found', async () => {
    // let food = {name: "cake", calories: "300", type: "dessert"}
    let accessToken = adminToken.body.token;
    const response = await mockRequest.delete('/affirmations/1').set('Authorization', `Bearer ${accessToken}`);
    const userObject = response.body;

    const response2 = await mockRequest.get('/affirmations/1').set('Authorization', `Bearer ${accessToken}`);
    const userObject2 = response2.body;

    // const foodObject = response.body;
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(userObject).toEqual(1);
    expect(userObject2).toEqual(null);
  })
})
