import * as httpService from '../infra/Http';

const endpoint = process.env.API_TVMAZE_ENDPOINT;

/**
 * https://www.tvmaze.com/api#show-search
 */
export async function showSearch(name) {
  let showSearchEndpoint = `${endpoint}/search/shows`;
  let params = { q: name };

  return httpService.get(showSearchEndpoint, params).then(res => res.json());
}

/**
 * https://www.tvmaze.com/api#show-main-information
 */
export async function showMainInformation(id) {
  let showMainInformationEndpoint = `${endpoint}/shows/${id}`;

  return httpService.get(showMainInformationEndpoint).then(res => res.json());
}
