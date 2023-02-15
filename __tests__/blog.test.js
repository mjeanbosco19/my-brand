import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
jest.setTimeout(30000);
// let token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWEzNGFlYWUyZWE0NDZjNDdlMmMyNCIsImlhdCI6MTY3NjMwMDI1OCwiZXhwIjoxNjg0MDc2MjU4fQ.lgp_voTqq4nj8pOF5Eu9SsrBixMA0J5dEonXleleEbE';
const blog = {
  name: 'Testing mynew my Blogs',
  category: 'news',
  imageCover: '[blog]',
  summary: 'New blog',
  description: 'Hhh test a blog'
};

describe('Blog API Test', () => {
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

  test('It should list Blogs.', async () => {
    const { body } = await request(app)
      .get('/api/v1/blogs')
      .expect('Content-Type', /json/)
      .expect(200);
  });
  test('It should list single Blog.', async () => {
    const { body } = await request(app)
      .get('/api/v1/blogs/63e4eccf68981e21c8e966b8')
      .expect('Content-Type', /json/)
      .expect(200);
  });
  test('It should create a blog.', async () => {
    const { body } = await request(app)
      .post('/api/v1/blogs')
      .send(blog)
      .expect(201);
  });
  test('It should update a blog.', async () => {
    const { body } = await request(app)
      .patch('/api/v1/blogs/63e4eeb80814593a28204d15')
      // .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(200);
  });
  test('It should delete a Blog.', async () => {
    const { body } = await request(app)
      .delete('/api/v1/blogs/63e52b892af6801a34837d7a')
      // .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});
