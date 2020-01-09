import { types } from '../../../../src/redux/actions/challengeActions'
import challengeReducer from '../../../../src/redux/reducers/challengeReducer'

it('Should return the initial state', () => {
  expect(challengeReducer(undefined, {})).toEqual({
    messages: []
  })
})

it('Should handle LISTING_MESSAGES', () => {
  expect(
    challengeReducer(undefined, {
      type: types.LISTING_MESSAGES
    })
  ).toEqual({ isError: false, isLoading: true, messages: [] })
})

it('Should handle LISTING_MESSAGES_ERROR', () => {
  expect(
    challengeReducer(undefined, {
      type: types.LISTING_MESSAGES_ERROR
    })
  ).toEqual({
    isError: true,
    isLoading: false,
    messages: []
  })
})

it('Should handle MESSAGE_LISTED', () => {
  const fakePayload = [1, 2, 3, 4]

  expect(
    challengeReducer(undefined, {
      type: types.MESSAGE_LISTED,
      payload: fakePayload
    })
  ).toEqual({
    isError: false,
    isLoading: false,
    messages: fakePayload
  })
})
