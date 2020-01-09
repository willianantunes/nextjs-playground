import { types } from '../actions/challengeActions'

export const initialState = {
  messages: []
}

export default function challengeReducer (state = initialState, action) {
  switch (action.type) {
    case types.DELETING_MESSAGE:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case types.MESSAGE_DELETED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        messages: state.messages.filter(message => message.id !== action.payload)
      }
    case types.DELETING_MESSAGES:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case types.MESSAGES_DELETED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        messages: []
      }
    case types.ADDING_MESSAGE:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case types.ADDING_MESSAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case types.MESSAGE_ADDED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        messages: state.messages.concat(action.payload)
      }
    case types.LISTING_MESSAGES:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case types.LISTING_MESSAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case types.MESSAGE_LISTED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        messages: action.payload
      }
    default:
      return state
  }
}
