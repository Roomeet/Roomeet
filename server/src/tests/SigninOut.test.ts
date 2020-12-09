/* eslint-disable no-undef */
const request = require('supertest');
const server = require('../app.ts');

// mock users
const userSignupMock = {
  name: 'test',
  lastName: 'Test',
  password: 'test1234',
  email: 'test@gmail.com'
};

describe('Register and Login Tests', () => {
  afterAll(async () => {
    await server.close();
  });

  // Register
  test('User Can Register', async (done) => {
    const signUpResponse = await request(server)
      .post('/api/v1/auth/register')
      .send(userSignupMock);

    expect(signUpResponse.status).toBe(201);
    done();
  });
});
