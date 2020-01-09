import { required } from '../infra/Utils'

export class Message {
  constructor (_id, _original = required('original'), _parsed = required('parsed')) {
    Object.assign(this, { _id, _original, _parsed })
    Object.freeze(this)
  }

  get id () {
    return this._id
  }

  get original () {
    return this._original
  }

  get parsed () {
    return this._parsed
  }

  equals (objectToBeCompared) {
    return JSON.stringify(this) === JSON.stringify(objectToBeCompared)
  }
}
