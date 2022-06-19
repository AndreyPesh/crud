import 'dotenv/config';
import crypto from 'crypto';
import App from '../src/App/App';
import { userRouter } from '../src/users/user-router';
import sendJson from '../src/middleware/sendJson';
import { parseUrl } from '../src/middleware/parseUrl';
import request from 'supertest';

describe('Scenario_03', () => {
  const URL_USERS = '/api/users';
  const NUMBER_USERS = 10;
  const NUMBER_DELETED = 3;
  const app = new App();
  app.addRouter(userRouter);
  app.use(parseUrl);
  app.use(sendJson);


  it('should handled request with extra parameters', async () => {
    await request(app.server)
      .get(`${URL_USERS}/123456/post`)
      .expect(400, { message: 'Too many parameters in request' });
  });

  it('should add any number of users', async () => {
    const sendDataUser = JSON.stringify({ username: 'Man', age: 44, hobbies: ['idleness'] });
    for (let i = 0; i < NUMBER_USERS; i++) {
      await request(app.server)
        .post(URL_USERS)
        .send(sendDataUser)
        .set('Content-Type', 'application/json');
    }
    const { body } = await request(app.server).get(URL_USERS);
    expect(body.length).toBe(NUMBER_USERS);
  });

  it('should delete users correctly', async () => {
    const { body } = await request(app.server).get(URL_USERS);
    for (let i = 0; i < NUMBER_DELETED; i++) {
      await request(app.server).delete(`${URL_USERS}/${body[i].id}`).expect(204);
    }
    const response = await request(app.server).get(URL_USERS);

    expect(response.body.length).toBe(body.length - NUMBER_DELETED);
  });

  it('should corresponding message if record with does not exist', async () => {
    const id = crypto.randomUUID();
    await request(app.server).get(`${URL_USERS}/${id}`).expect(404, { message: 'User not found' });
  });

  it('should answer if try updated record and it does not exist', async () => {
    const updateData = { username: 'Alex', age: 30, hobbies: ['car'] };
    const sendDataUser = JSON.stringify(updateData);
    const id = crypto.randomUUID();
    await request(app.server)
      .put(`${URL_USERS}/${id}`)
      .send(sendDataUser)
      .set('Content-Type', 'application/json')
      .expect(404, { message: `User doesn't exist` });
  });

  it('should update data by id users', async () => {
    const { body } = await request(app.server).get(URL_USERS);
    const updateData = { username: 'Alex', age: 30, hobbies: ['car'] };
    const sendDataUser = JSON.stringify(updateData);
    await request(app.server)
      .put(`${URL_USERS}/${body[0].id}`)
      .send(sendDataUser)
      .set('Content-Type', 'application/json')
      .expect(200);
  });
});
