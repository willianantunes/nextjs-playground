import * as httpService from '../infra/Http';
import Logger from '../infra/logger';

const logger = Logger('PageDetailsService');

const endpoint = process.env.PAGE_DETAILS_ENDPOINT;

export async function getDetails(url) {
  logger.debug(`Details for ${url}`);
  const params = { url };
  return httpService.get(endpoint, params).then(res => {
    logger.debug('Parsing response as JSON...');
    return res.json();
  });
}
