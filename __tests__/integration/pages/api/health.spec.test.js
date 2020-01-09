import dns from 'dns'
import http from 'http'
import fetch from 'isomorphic-unfetch'
import listen from 'test-listen'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import handler from '../../../../src/pages/api/health'

describe('Integrations tests for health endpoint', () => {
  let server
  let url

  beforeAll(async done => {
    server = http.createServer((req, res) => apiResolver(req, res, undefined, handler))
    url = await listen(server)
    done()
  })

  afterAll(done => {
    server.close(done)
  })

  test('Should return 200 informing internet status if OK', async () => {
    // dns.promises.lookup.mockReset();
    const response = await fetch(url)
    const jsonResult = await response.json()

    expect(response.status).toBe(200)
    expect(jsonResult).toMatchObject({
      internetAvailable: true
    })
  })

  test('Should return 503 if internet is not available to be consulted', async () => {
    const lookupSpy = jest.spyOn(dns.promises, 'lookup').mockImplementation(
      hostname =>
        new Promise((resolve, reject) => {
          reject(new Error('Just to force an error on purpose'))
        })
    )
    const response = await fetch(url)
    const jsonResult = await response.json()

    expect(lookupSpy).toHaveBeenCalledWith('github.com')
    expect(response.status).toBe(503)
    expect(jsonResult).toMatchObject({
      internetAvailable: false
    })
  })
})
