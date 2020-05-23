import * as httpService from '../infra/Http'
import Logger from '../infra/logger'

const logger = Logger('PageDetailsService')

const endpoint = process.env.PAGE_DETAILS_ENDPOINT

export async function getDetails (url) {
  logger.debug(`Details for ${url}`)
  const params = { url }

  const response = await httpService.get(endpoint, params)
  logger.debug('Parsing response as JSON...')
  return response.json()
}
