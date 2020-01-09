import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as messageDao from '../../../../src/domain/MessageDao'
import * as actions from '../../../../src/redux/actions/challengeActions'

jest.mock('../../../../src/domain/MessageDao')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('Should create MESSAGE_LISTED when finding all messages has been done', () => {
  const fakeMessages = {
    messages: [1, 2, 3]
  }
  messageDao.findAll.mockImplementation(() => Promise.resolve(fakeMessages))

  const expectedActions = [
    { type: actions.types.LISTING_MESSAGES },
    { type: actions.types.MESSAGE_LISTED, payload: fakeMessages }
  ]
  const mockedStore = mockStore({})

  return mockedStore.dispatch(actions.listMessages()).then(() => {
    expect(messageDao.findAll).toHaveBeenCalled()
    expect(mockedStore.getActions()).toEqual(expectedActions)
  })
})

it('Should create LISTING_MESSAGES_ERROR when an error is caught during finding all messages logic', () => {
  messageDao.findAll.mockImplementation(() => Promise.reject(new Error('Yeah I\'m fake')))

  const expectedActions = [
    {
      type: 'LISTING_MESSAGES'
    },
    {
      type: 'LISTING_MESSAGES_ERROR'
    }
  ]
  const mockedStore = mockStore({})

  return mockedStore.dispatch(actions.listMessages()).then(() => {
    expect(messageDao.findAll).toHaveBeenCalled()
    expect(mockedStore.getActions()).toEqual(expectedActions)
  })
})
