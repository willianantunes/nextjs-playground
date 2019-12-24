import * as http from 'http';
import mockserver from 'mockserver';

const directory = `${__dirname}/mocks/`;
export const createdServer = http.createServer(mockserver(directory));
