import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
jest.setTimeout(30000);
// let token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWEzNGFlYWUyZWE0NDZjNDdlMmMyNCIsImlhdCI6MTY3NjMwMDI1OCwiZXhwIjoxNjg0MDc2MjU4fQ.lgp_voTqq4nj8pOF5Eu9SsrBixMA0J5dEonXleleEbE';

const Comment = {
  comment: 'New comment today',
  like: '1',
  blog: '63e4eccf68981e21c8e966b8',
  user: '63ea25b722040d1cb400f4a9'
};

describe('Comment API Test', () => {
  beforeAll(async () => {
    await mongoose
      .connect(
        'mongodb://bosco:etite@ac-gtollpd-shard-00-00.0cffxhd.mongodb.net:27017,ac-gtollpd-shard-00-01.0cffxhd.mongodb.net:27017,ac-gtollpd-shard-00-02.0cffxhd.mongodb.net:27017/?ssl=true&replicaSet=atlas-qf566a-shard-0&authSource=admin&retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false
        }
      )
      .then(() => console.log('DB connection successful!'));
  });

  test('It should list all comments.', async () => {
    const { body } = await request(app)
      .get('/api/v1/comments')
      //   .set('Authorization', `Bearer ${token}`)
      //   .expect('Content-Type', /json/)
      .expect(200);
  });
  test('It should list single comment.', async () => {
    const { body } = await request(app)
      .get('/api/v1/comments/63ea2c8884061a068c4efe9d')
      //   .expect('Content-Type', /json/)
      .expect(200);
  });
  test('It should create a comment.', async () => {
    const { body } = await request(app)
      .post('/api/v1/comments')
      //   .set('Authorization', `Bearer ${token}`)
      .send(Comment)
      .expect(201);
  });
  test('It should update a comment.', async () => {
    const { body } = await request(app)
      .patch('/api/v1/comments/63ea2c8884061a068c4efe9d')
      // .set('Authorization', `Bearer ${token}`)
      .field('comment', 'A new comment now')
      .expect(200);
  });
  test('It should delete a comment.', async () => {
    const { body } = await request(app)
      .delete('/api/v1/comments/63ea2ee8db463f343c5e8dce')
      // .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});
