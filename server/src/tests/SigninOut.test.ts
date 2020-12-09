/* eslint-disable no-undef */
const request = require('supertest');
// const app = require('../app');
import app from '../app'

// mock users
const userSignupMock = {
  name: 'test',
  lastName: 'Test',
  password: 'test1234',
  email: 'test@gmail.com'
};

describe('Register and Login Tests', () => {
  jest.setTimeout(30000)
  // afterAll(async () => {
  //   await app.connec();
  // });

  // Register
  test('User Can Register', async (done) => {

    const signUpResponse = await request(app)
      .post('/api/v1/auth/register')
      .send(userSignupMock);

    expect(signUpResponse.status).toBe(201);
    done();
  });
});
