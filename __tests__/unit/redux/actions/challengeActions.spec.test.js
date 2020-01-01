import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
jest.mock('../../../../src/domain/MessageDao');
import * as messageDao from '../../../../src/domain/MessageDao';
import * as actions from '../../../../src/redux/actions/challengeActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('Should create MESSAGE_LISTED when finding all messages has been done', () => {
  const fakeMessages = {
    messages: [1, 2, 3],
  };
  messageDao.findAll.mockImplementation(() => Promise.resolve(fakeMessages));

  const expectedActions = [
    { type: actions.types.LISTING_MESSAGES },
    { type: actions.types.MESSAGE_LISTED, payload: fakeMessages },
  ];
  const mockedStore = mockStore({});

  return mockedStore.dispatch(actions.listMessages()).then(() => {
    expect(messageDao.findAll).toHaveBeenCalled();
    expect(mockedStore.getActions()).toEqual(expectedActions);
  });
});
