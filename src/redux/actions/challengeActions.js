import * as messageDao from '../../domain/MessageDao';
import evaluate from '../../business/MessageParser';
import { Message } from '../../domain/Message';

export const DELETING_MESSAGE = 'DELETING_MESSAGE';
export const MESSAGE_DELETED = 'MESSAGE_DELETED';

export const DELETING_MESSAGES = 'DELETING_MESSAGES';
export const MESSAGES_DELETED = 'MESSAGES_DELETED';

export const ADDING_MESSAGE = 'ADDING_MESSAGE';
export const MESSAGE_ADDED = 'MESSAGE_ADDED';

export const LISTING_MESSAGES = 'LISTING_MESSAGES';
export const MESSAGE_LISTED = 'MESSAGE_LISTED';

export function deleteMessage(id) {
  return dispatch => {
    dispatch({ type: DELETING_MESSAGE });

    return messageDao.deleteById(id).then(res => dispatch({ type: MESSAGE_DELETED, payload: id }));
  };
}

export function deleteAllMessages() {
  return dispatch => {
    dispatch({ type: DELETING_MESSAGES });

    return messageDao.deleteAll().then(() => dispatch({ type: MESSAGES_DELETED }));
  };
}

export function addMessage(configuredMessage, done = () => {}) {
  return async dispatch => {
    dispatch({ type: ADDING_MESSAGE });

    const parsedMessaged = await evaluate(configuredMessage);
    const messageToBePersisted = new Message(null, configuredMessage, parsedMessaged);

    return messageDao.save(messageToBePersisted).then(persistedMessage => {
      dispatch({ type: MESSAGE_ADDED, payload: persistedMessage });
      done();
    });
  };
}

export function listMessages() {
  return dispatch => {
    dispatch({ type: LISTING_MESSAGES });

    return messageDao.findAll().then(messages => dispatch({ type: MESSAGE_LISTED, payload: messages }));
  };
}
