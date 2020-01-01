import * as ActionType from '../actions/challengeActions';

export const initialState = {
  messages: [],
};

export default function challengeReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.DELETING_MESSAGE:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.MESSAGE_DELETED:
      return {
        ...state,
        isLoading: false,
        messages: state.messages.filter(message => message.id !== action.payload),
      };
    case ActionType.DELETING_MESSAGES:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.MESSAGES_DELETED:
      return {
        ...state,
        isLoading: false,
        messages: [],
      };
    case ActionType.ADDING_MESSAGE:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.MESSAGE_ADDED:
      return {
        ...state,
        isLoading: false,
        messages: state.messages.concat(action.payload),
      };
    case ActionType.LISTING_MESSAGES:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.MESSAGE_LISTED:
      return {
        ...state,
        isLoading: false,
        messages: action.payload,
      };
    default:
      return state;
  }
}
