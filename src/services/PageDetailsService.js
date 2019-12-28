import * as httpService from '../infra/Http';

const endpoint = process.env.PAGE_DETAILS_ENDPOINT;

export async function getDetails(url) {
  const params = { url };
  return httpService.get(endpoint, params).then(res => res.json());
}
