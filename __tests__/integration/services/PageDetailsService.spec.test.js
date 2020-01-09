import * as pageDetailsService from '../../../src/services/PageDetailsService'
import http from 'http'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import handler from '../../../src/pages/api/page-details'
import listen from 'test-listen'
import * as httpService from '../../../src/infra/Http'

describe('Integrations tests for PageDetailsService', () => {
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

  test('Should get page details given some URL', async () => {
    const customHttpSpy = jest.spyOn(httpService, 'get').mockImplementationOnce((endpoint, params) => {
      // In order to change target endpoint to our fake one which is `url`
      return httpService.get(url, params)
    })

    const urlToGetDetails =
      'https://medium.com/juntos-somos-mais/graphql-simples-e-test%C3%A1vel-com-django-e-graphene-d8c50c9fa089'
    const result = await pageDetailsService.getDetails(urlToGetDetails)

    expect(customHttpSpy).toHaveBeenNthCalledWith(1, process.env.PAGE_DETAILS_ENDPOINT, { url: urlToGetDetails })
    expect(result).toMatchObject({
      title: expect.any(String)
    })
  })
})
