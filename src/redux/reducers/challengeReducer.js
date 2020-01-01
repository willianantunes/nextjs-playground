import { types } from '../actions/challengeActions';

export const initialState = {
  messages: [],
};

export default function challengeReducer(state = initialState, action) {
  switch (action.type) {
    case types.DELETING_MESSAGE:
      return {
        ...state,
        isLoading: true,
      };
    case types.MESSAGE_DELETED:
      return {
        ...state,
        isLoading: false,
        messages: state.messages.filter(message => message.id !== action.payload),
      };
    case types.DELETING_MESSAGES:
      return {
        ...state,
        isLoading: true,
      };
    case types.MESSAGES_DELETED:
      return {
        ...state,
        isLoading: false,
        messages: [],
      };
    case types.ADDING_MESSAGE:
      return {
        ...state,
        isLoading: true,
      };
    case types.MESSAGE_ADDED:
      return {
        ...state,
        isLoading: false,
        messages: state.messages.concat(action.payload),
      };
    case types.LISTING_MESSAGES:
      return {
        ...state,
        isLoading: true,
      };
    case types.MESSAGE_LISTED:
      return {
        ...state,
        isLoading: false,
        messages: action.payload,
      };
    default:
      return state;
  }
}
