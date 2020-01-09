import * as http from 'http'
import mockserver from 'mockserver'

mockserver.headers = ['Authorization']
const directory = `${__dirname}/mocks/`
export const createdServer = http.createServer(mockserver(directory))
