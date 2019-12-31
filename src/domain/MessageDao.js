import { createOrGivePreviousCreatedConnection } from '../infra/ConnectionFactory';
import { Message } from './Message';

const storeName = 'messages';
let connection;

async function getConnection() {
  if (!connection) {
    try {
      connection = await createOrGivePreviousCreatedConnection(storeName);
      return connection;
    } catch (e) {
      throw new Error(`Connection could not be get! Reason: ${e}`);
    }
  } else {
    return connection;
  }
}

export const save = async (message = required('message')) => {
  let connection = await getConnection();
  return new Promise((resolve, reject) => {
    const request = connection
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .add(message);

    request.onsuccess = e => {
      const generatedKey = e.target.result;
      resolve(new Message(generatedKey, message.original, message.parsed));
    };
    request.onerror = e => reject(`The message could not me saved. Reason: ${e}`);
  });
};

export const update = async (message = required('message')) => {
  let connection = await getConnection();
  return new Promise((resolve, reject) => {
    const request = connection
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .put(message, message.id);

    request.onsuccess = e => {
      const generatedKey = e.target.result;
      resolve(new Message(generatedKey, message.original, message.parsed));
    };
    request.onerror = e => reject(`The message could not me updated. Reason: ${e}`);
  });
};

export const findAll = async () => {
  let connection = await getConnection();
  return new Promise((resolve, reject) => {
    const listOfMessages = [];

    const cursor = connection
      .transaction([storeName], 'readonly')
      .objectStore(storeName)
      .openCursor();

    cursor.onsuccess = e => {
      const currentPosition = e.target.result;

      if (currentPosition) {
        const foundObject = currentPosition.value;
        const message = new Message(currentPosition._key, foundObject._original, foundObject._parsed);
        listOfMessages.push(message);
        currentPosition.continue();
      } else {
        resolve(listOfMessages);
      }
    };

    cursor.onerror = e => {
      reject(`Messages could not be listed. Reason: ${e}`);
    };
  });
};

export const deleteAll = async () => {
  let connection = await getConnection();
  return new Promise((resolve, reject) => {
    const request = connection
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .clear();

    request.onsuccess = e => resolve();
    request.onerror = e => reject('Messages could not be deleted. Reason: ${e}');
  });
};
