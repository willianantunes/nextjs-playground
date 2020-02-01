import Logger from '../infra/logger'
import { getDetails } from '../services/PageDetailsService'
import { findMatchesGivenRegex } from '../infra/Utils'

const logger = Logger('MessageParser')

const extractMentions = message => {
  const mentionRegex = /@(\w+)/g

  return findMatchesGivenRegex(message, mentionRegex)
}

const extractEmoticons = message => {
  const emoticonsRegex = /\(([ -~]{0,15})\)/g

  return findMatchesGivenRegex(message, emoticonsRegex)
}

const extractLinks = async function * (message) {
  const linksRegex = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))/g

  const matches = findMatchesGivenRegex(message, linksRegex)

  for (const urlFound of matches) {
    logger.debug(`URL found! Now getting its details: ${urlFound}`)
    const { title } = await getDetails(urlFound)
    if (title) {
      logger.debug('Appending details')
      yield { url: urlFound, title }
    }
  }
}

export default async function evaluate (message) {
  logger.info('Extracting mentions...')
  const mentions = [...extractMentions(message)]
  logger.info('Extracting Emoticons...')
  const emoticons = [...extractEmoticons(message)]
  logger.info('Extracting links...')
  const asyncLinksIterator = extractLinks(message)
  let links = []
  for await (const link of asyncLinksIterator)
    links.push(link)

  return {
    mentions,
    emoticons,
    links
  }
}
