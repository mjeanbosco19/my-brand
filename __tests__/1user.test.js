import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
jest.setTimeout(30000);
// let token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWEzNGFlYWUyZWE0NDZjNDdlMmMyNCIsImlhdCI6MTY3NjMwMDI1OCwiZXhwIjoxNjg0MDc2MjU4fQ.lgp_voTqq4nj8pOF5Eu9SsrBixMA0J5dEonXleleEbE';
const Login = {
  email: 'bosco@bosco.io',
  password: 'Bosco@123!'
};
const Register = {
  name: 'Jean Bosco Mugiraneza',
  email: 'bosco14@bosco.io',
  role: 'admin',
  password: 'Bosco@123!',
  passwordConfirm: 'Bosco@123!'
};

describe('user API Test', () => {
  let userId;
  beforeAll(async () => {
    await mongoose
      .connect(
        'mongodb+srv://bosco:etite@cluster0.0cffxhd.mongodb.net/?retryWrites=true&w=majority ',
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false
        }
      )
      .then(() => console.log('DB connection successful!'));
  });
  test('It should create a user.', async () => {
    const { body } = await request(app)
      .post('/api/v1/users/signup')
      .send(Register)
      .expect(201);
    // userId = body.data.user._id;
  });

  test('It should list users.', async () => {
    const { body } = await request(app)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(200);
  });
  test('It should list single user.', async () => {
    const { body } = await request(app)
      .get('/api/v1/users/63ea34aeae2ea446c47e2c24')
      .expect('Content-Type', /json/)
      .expect(200);
  });
  test('It should login a user.', async () => {
    const { body } = await request(app)
      .post('/api/v1/users/login')
      .send(Login)
      .expect(201);
  });

  test('It should update a user.', async () => {
    const { body } = await request(app)
      .patch('/api/v1/users/63ea4a23028e10046cadbafd')
      .field('name', 'Bosco Jean')
      .expect(200);
  });
  test('It should delete a user.', async () => {
    const { body } = await request(app)
      .delete('/api/v1/users/63ea4f7aee63be1c507f9bcd')
      .expect(204);
  });
});
