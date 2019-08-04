import 'url-polyfill/url-polyfill.min';
import fetch from 'isomorphic-unfetch';

export async function get(url, params = {}) {
  url = new URL(url);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
  }
  return fetch(url.href).then(r => r.json());
}

export async function post(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(r => r.json());
}
