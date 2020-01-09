import dns from 'dns'

export default async function handler (request, response) {
  dns.promises
    .lookup('github.com')
    .then(() =>
      response.json({
        internetAvailable: true
      })
    )
    .catch(() =>
      response.status(503).json({
        internetAvailable: false
      })
    )
}
