import 'url-polyfill/url-polyfill.min'
import fetch from 'isomorphic-unfetch'
import Logger from './logger'

const logger = Logger('Http')

export async function get (url, params = {}, headers = {}) {
  logger.debug(`Doing GET to ${url}`)
  url = new URL(url)

  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
  }

  return fetch(url.href, {
    headers: {
      ...headers
    }
  })
}

export function post (url, { body, headers } = {}) {
  logger.debug(`Doing POST to ${url}`)

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  })
}
