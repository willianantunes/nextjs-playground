import 'url-polyfill/url-polyfill.min'
import fetch from 'isomorphic-unfetch'
import Logger from './logger'

const logger = Logger('Http')

export async function get (url, params = {}, headers = {}) {
  url = new URL(url)
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
  }
  return fetch(url.href, {
    headers: {
      ...headers
    }
  }).then(res => {
    logger.debug('Parsing response checking the content-type header...')
    return res.headers.get('Content-Type').includes('text') ? res.text() : res.json()
  })
}

export async function post (url, { body, headers } = {}) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  })
}
