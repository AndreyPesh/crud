import 'dotenv/config';
import cluster from 'cluster';
import { cpus } from 'os';
import App from './App/App';
import { parseUrl } from './middleware/parseUrl';
import sendJson from './middleware/sendJson';
import { userRouter } from './users/user-router';

const PORT = process.env.PORT || 3000;
const totalCPU = cpus().length;

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPU}`);
  for (let i = 0; i < totalCPU; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  startServer();
}

function startServer() {
  const server = new App();
  server.use(parseUrl);
  server.use(sendJson);

  server.addRouter(userRouter);
  console.log(`Worker ${process.pid} started`);

  server.listen(Number(PORT), () => {
    console.log(`Server running on  port ${PORT}`);
  });
}
