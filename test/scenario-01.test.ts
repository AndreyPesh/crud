import 'dotenv/config';
import App from '../src/App/App';
import { userRouter } from '../src/users/user-router';
import sendJson from '../src/middleware/sendJson';
import { parseUrl } from '../src/middleware/parseUrl';
import request from 'supertest';

describe('Scenario_01', () => {
  let responseCreateUser: request.Response;
  const listKeysDataUser = ['id', 'username', 'age', 'hobbies'];
  const URL_USERS = '/api/users';
  const app = new App();
  app.addRouter(userRouter);
  app.use(parseUrl);
  app.use(sendJson);

  it('should return users empty list', async () => {
    await request(app.server).get(URL_USERS).expect(200, []);
  });

  it('should created new user and return data', async () => {
    const dataCreateUser = { username: 'Peter', age: 25, hobbies: ['car'] };
    const sendDataUser = JSON.stringify(dataCreateUser);
    responseCreateUser = await request(app.server)
      .post(URL_USERS)
      .send(sendDataUser)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    expect(Object.keys(responseCreateUser.body)).toEqual(Object.values(listKeysDataUser));
  });

  it('should be return created user', async () => {
    const responseGetUser = await request(app.server)
      .get(`${URL_USERS}/${responseCreateUser.body.id}`)
      .expect(200);
    expect(Object.keys(responseGetUser.body)).toEqual(Object.values(listKeysDataUser));
  });

  it('should update user and return new user data with same id', async () => {
    const updateData = { username: 'Alex', age: 30, hobbies: ['car'] };
    const sendDataUser = JSON.stringify(updateData);
    const { body } = await request(app.server)
      .put(`${URL_USERS}/${responseCreateUser.body.id}`)
      .send(sendDataUser)
      .set('Content-Type', 'application/json')
      .expect(200);
    expect(Object.keys(body)).toEqual(Object.values(listKeysDataUser));
    expect(body.id).toBe(responseCreateUser.body.id);
    expect(body).toMatchObject(updateData);
  });

  it('should delete the created user by id', async () => {
    await request(app.server).delete(`${URL_USERS}/${responseCreateUser.body.id}`).expect(204);
  });

  it('should answer about non-existence, when trying to get a remote user', async () => {
    await request(app.server)
      .get(`${URL_USERS}/${responseCreateUser.body.id}`)
      .expect(404, { message: 'User not found' });
  });
});
