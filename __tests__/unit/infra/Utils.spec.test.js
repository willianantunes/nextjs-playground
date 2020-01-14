import { debounce } from '../../../src/infra/Utils'

jest.useFakeTimers()

let func
let debouncedFunc

beforeEach(() => {
  func = jest.fn()
  debouncedFunc = debounce(func, 1000)
})

test('Should execute just once', () => {
  for (let i = 0; i < 100; i++) {
    debouncedFunc()
  }

  // Fast-forward until all timers have been executed
  jest.runAllTimers()

  expect(func).toBeCalledTimes(1)
})
