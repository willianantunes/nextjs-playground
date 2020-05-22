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
  return dispatch => {
    dispatch({ type: types.DELETING_MESSAGE })

    return messageDao.deleteById(id).then(res => dispatch({ type: types.MESSAGE_DELETED, payload: id }))
  }
}

export function deleteAllMessages () {
  return dispatch => {
    dispatch({ type: types.DELETING_MESSAGES })

    return messageDao.deleteAll().then(() => dispatch({ type: types.MESSAGES_DELETED }))
  }
}

export function addMessage (configuredMessage, done = () => {}) {
  return async dispatch => {
    dispatch({ type: types.ADDING_MESSAGE })

    const parsedMessaged = await evaluate(configuredMessage)
    const messageToBePersisted = new Message(null, configuredMessage, parsedMessaged)

    /**
     * Just an option using async await
     */
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
  return dispatch => {
    dispatch({ type: types.LISTING_MESSAGES })

    return messageDao
      .findAll()
      .then(messages => dispatch({ type: types.MESSAGE_LISTED, payload: messages }))
      .catch(err => {
        logger.error(`An error was caught during listMessages logic: ${err}`)
        dispatch({ type: types.LISTING_MESSAGES_ERROR })
      })
  }
}
