// import { IncomingMessage, ServerResponse } from 'http';
// import { UserData } from '../types/interface';

// const responseJson =  (req: IncomingMessage, res: ServerResponse) => {
//   //@ts-ignore
//   res.send = (status: number, data: Array<UserData>) => {
//     res.writeHead(status, {
//       'Content-type': 'application/json',
//     });
//     res.end(JSON.stringify(data));
//   };
// };

// export default responseJson;