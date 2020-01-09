import { isFunction, required } from './Utils'

export const databaseName = 'nextjs-playground'
export const databaseVersion = 1
let connection = null
let closeFunction = null

function executeIfConnectionIsSet (fn) {
  if (connection) return fn()
}

function createStores (connection, storeName) {
  if (connection.objectStoreNames.contains(storeName)) connection.deleteObjectStore(storeName)

  connection.createObjectStore(storeName, { autoIncrement: true })
}

export function createOrGivePreviousCreatedConnection (storeName = required('storeName')) {
  return new Promise((resolve, reject) => {
    executeIfConnectionIsSet(() => resolve(connection))

    const openRequest = indexedDB.open(databaseName, databaseVersion)

    openRequest.onupgradeneeded = event => {
      createStores(event.target.result, storeName)
    }

    openRequest.onsuccess = event => {
      connection = event.target.result
      closeFunction = connection.close.bind(connection)
      connection.close = () => {
        throw new Error('This connection must not be closed directly')
      }

      resolve(event.target.result)
    }

    openRequest.onerror = e => {
      console.log(e.target.error)
      reject(e.target.error.name)
    }
  })
}

export function closeConnection () {
  executeIfConnectionIsSet(() => {
    if (isFunction(closeFunction)) closeFunction()
    else throw Error('It is not possible to close connection')
  })
}
