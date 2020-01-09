import { createOrGivePreviousCreatedConnection } from '../infra/ConnectionFactory'
import { Message } from './Message'
import { required } from '../infra/Utils'

const storeName = 'messages'
let connection

async function getConnection () {
  if (!connection) {
    try {
      connection = await createOrGivePreviousCreatedConnection(storeName)
      return connection
    } catch (e) {
      throw new Error(`Connection could not be get! Reason: ${e}`)
    }
  } else {
    return connection
  }
}

export const exists = async id => {
  const connection = await getConnection()
  return new Promise((resolve, reject) => {
    const request = connection
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .get(id)

    request.onsuccess = e => {
      if (e.target.result != null) resolve(true)
      else resolve(false)
    }
    request.onerror = e => reject(new Error(`The message could not me saved. Reason: ${e}`))
  })
}

export const save = async (message = required('message')) => {
  const connection = await getConnection()
  return new Promise((resolve, reject) => {
    const request = connection
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .add(message)

    request.onsuccess = e => {
      const generatedKey = e.target.result
      resolve(new Message(generatedKey, message.original, message.parsed))
    }
    request.onerror = e => reject(new Error(`The message could not me saved. Reason: ${e}`))
  })
}

export const update = async (message = required('message')) => {
  const connection = await getConnection()
  return new Promise((resolve, reject) => {
    const request = connection
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .put(message, message.id)

    request.onsuccess = e => {
      const generatedKey = e.target.result
      resolve(new Message(generatedKey, message.original, message.parsed))
    }
    request.onerror = e => reject(new Error(`The message could not me updated. Reason: ${e}`))
  })
}

export const findAll = async () => {
  const connection = await getConnection()
  return new Promise((resolve, reject) => {
    const listOfMessages = []

    const cursor = connection
      .transaction([storeName], 'readonly')
      .objectStore(storeName)
      .openCursor()

    cursor.onsuccess = e => {
      const currentPosition = e.target.result

      if (currentPosition) {
        const foundObject = currentPosition.value
        const message = new Message(currentPosition.key, foundObject._original, foundObject._parsed)
        listOfMessages.push(message)
        currentPosition.continue()
      } else {
        resolve(listOfMessages)
      }
    }

    cursor.onerror = e => {
      reject(new Error(`Messages could not be listed. Reason: ${e}`))
    }
  })
}

export const deleteAll = async () => {
  const connection = await getConnection()
  return new Promise((resolve, reject) => {
    const request = connection
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .clear()

    request.onsuccess = e => resolve()
    request.onerror = e => reject(new Error(`Messages could not be deleted. Reason: ${e}`))
  })
}

export const deleteById = async id => {
  const connection = await getConnection()
  const objectExists = await exists(id)
  return new Promise((resolve, reject) => {
    if (!objectExists) resolve(false)

    const request = connection
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .delete(id)

    request.onsuccess = async e => resolve(true)
    request.onerror = e => reject(new Error(`Messages could not be deleted. Reason: ${e}`))
  })
}
