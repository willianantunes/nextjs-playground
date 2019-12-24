import * as myCustomHttp from '../../../src/infra/Http';
import { createdServer } from '../../support/MockServerUtils';

describe('Integrations tests for Http infrastructure code', () => {
  let server;
  let port = 9002;

  beforeAll(done => {
    server = createdServer;
    server.listen(port);
    done();
  });

  afterAll(done => {
    server.close(done);
  });

  test('Should use verb GET without query string', async () => {
    const result = await myCustomHttp.get(`http://localhost:${port}/http`);
    const jsonResult = await result.json();

    expect(result.status).toBe(200);
    expect(jsonResult).toMatchObject({
      key: 1,
    });
  });

  test('Should use verb GET with query string', async () => {
    const params = { 'k-1': 'value-1', 'k-2': 'value-2' };
    const result = await myCustomHttp.get(`http://localhost:${port}/http`, params);
    const jsonResult = await result.json();

    expect(result.status).toBe(200);
    expect(jsonResult).toMatchObject({
      key: 1,
      something: 2,
    });
  });

  test('Should use verb POST without body and query string', async () => {
    const result = await myCustomHttp.post(`http://localhost:${port}/http`);
    const jsonResult = await result.json();

    expect(result.status).toBe(200);
    expect(jsonResult).toMatchObject({
      leader: 'jafar',
      friend: 'iago',
      enemy: 'aladdin',
    });
  });
});
