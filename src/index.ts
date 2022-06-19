import 'dotenv/config';
import App from './App/App';
import { parseUrl } from './middleware/parseUrl';
import sendJson from './middleware/sendJson';
import { userRouter } from './users/user-router';

const PORT = process.env.PORT || 4000;
const server = new App();

server.use(parseUrl);
server.use(sendJson);

server.addRouter(userRouter);

server.listen(Number(PORT), () => {
  console.log(`Server running on  port ${PORT}`);
});
