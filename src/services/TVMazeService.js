import * as httpService from '../infra/Http'
import Logger from '../infra/logger'

const logger = Logger('TVMazeService')
const endpoint = process.env.API_TVMAZE_ENDPOINT

/**
 * https://www.tvmaze.com/api#show-search
 */
export async function showSearch (name) {
  logger.debug(`Finding shows given the following name: ${name}`)
  const showSearchEndpoint = `${endpoint}/search/shows`
  const params = { q: name }

  return await httpService.get(showSearchEndpoint, params)
}

/**
 * https://www.tvmaze.com/api#show-main-information
 */
export async function showMainInformation (id) {
  logger.debug(`Finding show details given the following ID: ${id}`)
  const showMainInformationEndpoint = `${endpoint}/shows/${id}`

  return await httpService.get(showMainInformationEndpoint)
}
