import * as myCustomHttp from '../../infra/Http'
import { JSDOM } from 'jsdom'

export default async function handler (request, response) {
  if (Object.prototype.hasOwnProperty.call(request.query, 'url')) {
    const urlToGetDetails = request.query.url
    const rawPage = await myCustomHttp.get(urlToGetDetails)
    const parsedPageAsDom = new JSDOM(rawPage)
    const pageTitle = parsedPageAsDom.window.document.querySelector('title').text
    response.setHeader('Content-Type', 'application/json')
    response.json({ title: pageTitle })
  }

  response.status(400).end()
}
