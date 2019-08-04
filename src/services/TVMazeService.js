import * as httpService from '../support/HttpService';

const endpoint = 'https://api.tvmaze.com';

/**
 * https://www.tvmaze.com/api#show-search
 */
export async function showSearch(name) {
  let showSearchEndpoint = `${endpoint}/search/shows`;
  let params = { q: name };

  return httpService.get(showSearchEndpoint, params);
}
