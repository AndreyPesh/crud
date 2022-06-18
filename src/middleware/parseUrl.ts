import { IncomingMessage } from 'http';
import { MAX_PARAMETER_NUMBER } from '../types/constant';

export const parseUrl = (req: IncomingMessage) => {
  const fullUrl = (`${process.env.HOSTNAME_SERVER}:${process.env.PORT}` + req.url) as string;
  const url = new URL(fullUrl);
  const allParameters = new URL(url).pathname.split('/');
  if (allParameters.length > MAX_PARAMETER_NUMBER) {
    throw new Error('Too many parameters in request');
  }
  if(allParameters[MAX_PARAMETER_NUMBER - 1] === '') {
    throw new Error('Bad request');
  }
  const path = allParameters.slice(0, 3).join('/');
  req.url = path;
  if (allParameters.length === MAX_PARAMETER_NUMBER) {
    req.param = allParameters.pop();
  }
};
