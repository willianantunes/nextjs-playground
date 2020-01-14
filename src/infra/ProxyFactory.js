import { isFunction } from './Utils'

function hasFunctionWhichMustBeTrapped (target, prop, props) {
  return isFunction(target[prop]) && props.includes(prop)
}
export function create (targetObject, propsToBeSniffed, trapFunction) {
  return new Proxy(targetObject, {
    get (target, prop, receiver) {
      if (hasFunctionWhichMustBeTrapped(target, prop, propsToBeSniffed)) {
        return function () {
          target[prop].apply(target, arguments)
          trapFunction(target, arguments)
        }
      } else {
        return target[prop]
      }
    },
    set (target, prop, value, receiver) {
      const oldValue = Reflect.get(target, prop)
      const updated = Reflect.set(target, prop, value)
      if (propsToBeSniffed.includes(prop)) {
        trapFunction(target, oldValue, value)
      }
      return updated
    }

  })
}
