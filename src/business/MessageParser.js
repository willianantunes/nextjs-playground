import Logger from '../infra/logger'
import { getDetails } from '../services/PageDetailsService'

const logger = Logger('MessageParser')

function extractMentions (message) {
  const mentionRegex = /@(\w+)/g
  const mentions = []
  let matchedContent

  while ((matchedContent = mentionRegex.exec(message))) {
    mentions.push(matchedContent[1])
  }

  return mentions
}

function extractEmoticons (message) {
  const emoticonsRegex = /\(([ -~]{0,15})\)/g
  const emoticons = []
  let matchedContent

  while ((matchedContent = emoticonsRegex.exec(message))) {
    emoticons.push(matchedContent[1])
  }

  return emoticons
}

async function extractLinks (message) {
  const linksRegex = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))/g
  const links = []
  let matchedContent

  while ((matchedContent = linksRegex.exec(message))) {
    const urlFound = matchedContent[1]
    logger.debug(`URL found! Now getting its details: ${urlFound}`)
    const { title } = await getDetails(urlFound)
    if (title) {
      logger.debug('URL found! Now getting its details')
      links.push({ url: urlFound, title })
    }
  }

  return links
}

export default async function evaluate (message) {
  logger.info('Extracting mentions...')
  const mentions = extractMentions(message)
  logger.info('Extracting Emoticons...')
  const emoticons = extractEmoticons(message)
  logger.info('Extracting links...')
  const links = await extractLinks(message)

  return {
    mentions,
    emoticons,
    links
  }
}
