/* eslint-disable no-undef */
import app from '../app';

const mongoose = require('mongoose');

const request = require('supertest');
// const app = require('../app');

// mock users
const userSignupMock = {
  name: 'test',
  lastName: 'Test',
  password: 'test1234',
  email: 'test@gmail.com'
};

const userSigninMock = {
  email: 'test@gmail.com',
  password: 'test1234',
  rememberMe: false
};

const userSignupMock2 = {
  name: 'test2',
  lastName: 'Test2',
  password: 'test1234',
  email: 'test2@gmail.com'
};

const userSigninMock2 = {
  email: 'test2@gmail.com',
  password: 'test1234',
  rememberMe: false
};

describe('Register and Login Tests', () => {
  jest.setTimeout(30000);
  afterAll(async (done) => {
    await request(app).delete('/api/v1/users/all');
    await mongoose.connection.close();
    done();
  });

  // Register
  test('User Can Register', async (done) => {
    const signUpResponse = await request(app)
      .post('/api/v1/auth/register')
      .send(userSignupMock);

    expect(signUpResponse.status).toBe(201);
    done();
  });

  // user login
  test('User Can Login', async (done) => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send(userSigninMock);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.accessToken.length > 0).toBe(true);
    expect(loginResponse.body.email).toBe(userSigninMock.email);
    done();
  });

  //   test('User Can Logout', async (done) => {
  //     const signUpResponse = await request(app)
  //     .post('/api/v1/auth/register')
  //     .send(userSignupMock2);
  //     expect(signUpResponse.status).toBe(201);

  //     const loginResponse = await request(app)
  //     .post('/api/v1/auth/login')
  //     .send(userSigninMock2);
  //     expect(loginResponse.status).toBe(200);

  //     const logOutResponse = await request(app)
  //         .post('/api/v1/auth/logout')
  //         .send({ token: loginResponse.body.refreshToken })

//     expect(logOutResponse.status).toBe(200)
//     done();
// })
});