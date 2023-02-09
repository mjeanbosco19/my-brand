import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import dotenv from 'dotenv';

jest.setTimeout(20000);
const blog = {
  name: 'Test',
  category: 'news',
  imageCover: '[blog]',
  summary: 'New blog',
  description: 'Hhh test a blog'
};

// const updateblog = {
//   name: 'Test my new Blog',
//   category: 'news',
//   imageCover: '[blog]',
//   summary: 'New blog',
//   description: 'Hhh test a blog'
// };

/////
dotenv.config({ path: '../config.env' });

describe('Blog API tests', () => {
  const DB =
    'mongodb+srv://bosco:etite@cluster0.0cffxhd.mongodb.net/?retryWrites=true&w=majority';
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log('DB connection successful!'));

describe('Blog APi', () => {
  test('It should return 200 and get Blog ', async () => {
    const { body } = await request(app)
      .get('/api/v1/blogs')
      .expect('Content-Type', /json/)
      .expect(200);
  });

////////
    

    test('It should return 201 and create a blog', async () => {
      const { body } = await request(app)
        .post('/api/v1/blogs')
        .send(blog)
        .expect('Content-Type', /json/)
        .expect(201);
    });

    test('It should update blog ', async () => {
      const { body } = await request(app)
        .patch('/api/v1/blogs/:id')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
  
});
