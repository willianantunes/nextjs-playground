import { create } from '../../../src/infra/ProxyFactory'

describe('Tests regarding of handler GET', () => {
  test('Should call trap with function params given only one method of targeted object', () => {
    const mockedFunctionToAssertReceivedParams = jest.fn()
    const mockedFunctionToAssertMethodNoToBeTrapped = jest.fn()
    const someObject = {
      methodToBeTrapped: (param1, param2) => mockedFunctionToAssertReceivedParams(param1, param2),
      methodNoToBeTrapped: () => mockedFunctionToAssertMethodNoToBeTrapped()
    }
    const functionToBeCalledInsideTrap = jest.fn()
    const methodsToBeTrapped = ['methodToBeTrapped']

    const someObjectProxied = create(someObject, methodsToBeTrapped, (_, [param1, param2]) => functionToBeCalledInsideTrap(param1, param2))
    const [fakeParam1, fakeParam2] = ['fake-param-1', 'fake-param-2']
    someObjectProxied.methodToBeTrapped(fakeParam1, fakeParam2)

    expect(mockedFunctionToAssertMethodNoToBeTrapped).not.toBeCalled()
    expect(mockedFunctionToAssertReceivedParams).toBeCalledWith(fakeParam1, fakeParam2)
    expect(functionToBeCalledInsideTrap).toHaveBeenCalledTimes(1)
    expect(functionToBeCalledInsideTrap).toBeCalledWith(fakeParam1, fakeParam2)
  })

  test('Should call trap with function params given all methods of targeted object', () => {
    const mockedFunctionToAssertReceivedParams = jest.fn()
    const mockedFunctionToAssertMethodNoToBeTrapped = jest.fn()
    const someObject = {
      methodToBeTrapped: (param1, param2) => mockedFunctionToAssertReceivedParams(param1, param2),
      methodNoToBeTrapped: () => mockedFunctionToAssertMethodNoToBeTrapped()
    }
    const functionToBeCalledInsideTrap = jest.fn()
    const methodsToBeTrapped = ['methodToBeTrapped', 'methodNoToBeTrapped']

    const someObjectProxied = create(someObject, methodsToBeTrapped, (_, [param1, param2]) => functionToBeCalledInsideTrap(param1, param2))
    const [fakeParam1, fakeParam2] = ['fake-param-1', 'fake-param-2']
    someObjectProxied.methodToBeTrapped(fakeParam1, fakeParam2)
    someObjectProxied.methodNoToBeTrapped()

    expect(mockedFunctionToAssertMethodNoToBeTrapped).toBeCalled()
    expect(mockedFunctionToAssertReceivedParams).toBeCalledWith(fakeParam1, fakeParam2)
    expect(functionToBeCalledInsideTrap).toHaveBeenCalledTimes(2)
    expect(functionToBeCalledInsideTrap).toBeCalledWith(fakeParam1, fakeParam2)
  })
})

describe('Tests regarding of handler SET', () => {
  test('Should call trap with old and new value given sniffed property was set', () => {
    const somePropertyValue = 100
    const somePropertyUpdatedValue = 500
    const someObject = {
      someProperty: somePropertyValue
    }
    const functionToBeCalledInsideTrap = jest.fn()
    const propertiesToBeTrapped = ['someProperty']

    const someObjectProxied = create(someObject, propertiesToBeTrapped, (_, oldValue, newValue) => functionToBeCalledInsideTrap(oldValue, newValue))
    someObjectProxied.someProperty = somePropertyUpdatedValue

    expect(functionToBeCalledInsideTrap).toHaveBeenCalledTimes(1)
    expect(functionToBeCalledInsideTrap).toBeCalledWith(somePropertyValue, somePropertyUpdatedValue)
  })
})
