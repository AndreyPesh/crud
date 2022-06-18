import 'dotenv/config';
import App from '../src/App/App';
import { userRouter } from '../src/users/user-router';
import sendJson from '../src/middleware/sendJson';
import { parseUrl } from '../src/middleware/parseUrl';
import request from 'supertest';
jest.mock('../src/users/user-model');
import { getAllUser } from '../src/users/user-model';

describe('Scenario_01', () => {
  let responseCreateUser: request.Response;
  const listKeysDataUser = ['id', 'username', 'age', 'hobbies'];
  const URL_USERS = '/api/users';
  const app = new App();
  app.addRouter(userRouter);
  app.use(parseUrl);
  app.use(sendJson);

  it('should be handled requests to non-existing endpoints', async () => {
    await request(app.server).get('/api/posts').expect(404, { message: 'Page not found' });
  });

  it('should be handled errors on the server side', async () => {
    const mockGetAllUser = getAllUser as jest.MockedFunction<typeof getAllUser>;
    mockGetAllUser.mockImplementation(() => {
      throw new Error();
    });
    await request(app.server).get(URL_USERS).expect(500, { message: 'Error server creating user' });
  });

  it('should be handled invalid type id', async () => {
    await request(app.server).get(`${URL_USERS}/12345`).expect(400, { message: 'Id invalid' });
  });

  it('should be handled if request body does not contain required fields', async () => {
    const sendDataUser = JSON.stringify({ username: 'Nobody' });
    await request(app.server)
      .post(URL_USERS)
      .send(sendDataUser)
      .set('Content-Type', 'application/json')
      .expect(400, { message: 'Incorrect data user' });
  });

  it('should be handled if request body does not exist', async () => {
    await request(app.server)
      .post(URL_USERS)
      .set('Content-Type', 'application/json')
      .expect(400, { message: 'User data not sent' });
  });

  it('should be handled if properties have invalid type', async () => {
    const sendDataUser = JSON.stringify({ username: 100, age: "58", hobbies: {} });
    await request(app.server)
      .post(URL_USERS)
      .send(sendDataUser)
      .set('Content-Type', 'application/json')
      .expect(400, { message: 'Incorrect data user' });
  });
});
