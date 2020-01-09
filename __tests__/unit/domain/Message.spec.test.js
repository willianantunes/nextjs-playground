import { Message } from '../../../src/domain/Message'

test('Should create message domain', () => {
  const message = new Message(null, 'Some message', 'Some parsed message')

  expect(message).toBeDefined()
})

test('Should messages be equal given they are the same', () => {
  const messageOne = new Message(null, 'Some message', 'Some parsed message')
  const messageTwo = new Message(null, 'Some message', 'Some parsed message')

  expect(messageOne.equals(messageTwo)).toBe(true)
})

test('Should throw error given some required parameters are missing', () => {
  const firstCreationAttempt = () => new Message()
  const secondCreationAttempt = () => new Message(null, null)
  const thirdCreationAttempt = () => new Message(null, null, null)

  expect(firstCreationAttempt).toThrow('original is a required parameter')
  expect(secondCreationAttempt).toThrow('parsed is a required parameter')
  expect(thirdCreationAttempt).not.toThrow()
})

test('Should throw error if an attempt to alter attributes is fired', () => {
  const message = new Message(null, 'Some message', 'Some parsed message')
  const attempt = () => (message._original = 'Ops!')

  expect(attempt).toThrow("Cannot assign to read only property '_original' of object '#<Message>'")
})
