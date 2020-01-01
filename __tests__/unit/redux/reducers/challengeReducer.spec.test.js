import { types } from '../../../../src/redux/actions/challengeActions';
import challengeReducer from '../../../../src/redux/reducers/challengeReducer';

it('Should return the initial state', () => {
  expect(challengeReducer(undefined, {})).toEqual({
    messages: [],
  });
});

it('Should handle LISTING_MESSAGES', () => {
  expect(
    challengeReducer(undefined, {
      type: types.LISTING_MESSAGES,
    }),
  ).toEqual({ isLoading: true, messages: [] });
});
