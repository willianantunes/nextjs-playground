import * as messageDao from '../../domain/MessageDao'
import evaluate from '../../business/MessageParser'
import { Message } from '../../domain/Message'
import Logger from '../../infra/logger'

const logger = Logger('challengeActions')

export const types = {
  DELETING_MESSAGE: 'DELETING_MESSAGE',
  MESSAGE_DELETED: 'MESSAGE_DELETED',
  DELETING_MESSAGES: 'DELETING_MESSAGES',
  MESSAGES_DELETED: 'MESSAGES_DELETED',
  ADDING_MESSAGE: 'ADDING_MESSAGE',
  ADDING_MESSAGE_ERROR: 'ADDING_MESSAGE_ERROR',
  MESSAGE_ADDED: 'MESSAGE_ADDED',
  LISTING_MESSAGES: 'LISTING_MESSAGES',
  LISTING_MESSAGES_ERROR: 'LISTING_MESSAGES_ERROR',
  MESSAGE_LISTED: 'MESSAGE_LISTED'
}

export function deleteMessage (id) {
  return async dispatch => {
    dispatch({ type: types.DELETING_MESSAGE })

    try {
      await messageDao.deleteById(id)
      dispatch({ type: types.MESSAGE_DELETED, payload: id })
    } catch (err) {
      logger.error(`An error was caught during delete message logic: ${err}`)
      // TODO: dispatch({ type: types.DELETE_MESSAGE_ERROR })
    }
  }
}

export function deleteAllMessages () {
  return async dispatch => {
    dispatch({ type: types.DELETING_MESSAGES })

    try {
      await messageDao.deleteAll()
      dispatch({ type: types.MESSAGES_DELETED })
    } catch (err) {
      logger.error(`An error was caught during deleteAll logic: ${err}`)
      // TODO: dispatch({ type: types.DELETE_MESSAGES_ERROR })
    }
  }
}

export function addMessage (configuredMessage, done = () => {}) {
  return async dispatch => {
    dispatch({ type: types.ADDING_MESSAGE })

    const parsedMessaged = await evaluate(configuredMessage)
    const messageToBePersisted = new Message(null, configuredMessage, parsedMessaged)

    try {
      const persistedMessage = await messageDao.save(messageToBePersisted)
      dispatch({ type: types.MESSAGE_ADDED, payload: persistedMessage })
      done()
    } catch (err) {
      logger.error(`An error was caught during addMessage logic: ${err}`)
      dispatch({ type: types.ADDING_MESSAGE_ERROR })
    }
  }
}

export function listMessages () {
  return async dispatch => {
    dispatch({ type: types.LISTING_MESSAGES })

    try {
      const messages = await messageDao.findAll()
      dispatch({ type: types.MESSAGE_LISTED, payload: messages })
    } catch (err) {
      logger.error(`An error was caught during listMessages logic: ${err}`)
      dispatch({ type: types.LISTING_MESSAGES_ERROR })
    }
  }
}
