jest.mock('../../../src/services/PageDetailsService');
import { getDetails } from '../../../src/services/PageDetailsService';
import * as messageParser from '../../../src/business/MessageParser';

beforeEach(() => {
  getDetails.mockClear();
});

test('Should show 1 mention given someone was mentioned', () => {
  const { mentions } = messageParser.evaluate("There's nothing to tell! @Jafar is just some guy I work with!");

  expect(mentions).toEqual(expect.arrayContaining(['Jafar']));
});

test('Should show 2 mentions given 2 users were mentioned', () => {
  const { mentions } = messageParser.evaluate('@Jafar and @Iago say hello, I wanna kill myself');

  expect(mentions).toEqual(expect.arrayContaining(['Jafar', 'Iago']));
});

test('Should show 1 mention until username hits non-word character', () => {
  const { mentions } = messageParser.evaluate('@Aladdin!# is honest!');

  expect(mentions).toEqual(expect.arrayContaining(['Aladdin']));
});

test('Should show 1 emoticon given some was pointed out', () => {
  const { emoticons } = messageParser.evaluate(
    "Then I look down, and I realize there's a phone... there (grinning-face)",
  );

  expect(emoticons).toEqual(expect.arrayContaining(['grinning-face']));
});

test('Should show 2 emoticons given 2 were pointed out including only one with 15 characters limit', () => {
  const { emoticons } = messageParser.evaluate(
    'Let me get you some coffee (kissing-face)(hugging-face)(something-abcde)',
  );

  expect(emoticons).toEqual(expect.arrayContaining(['kissing-face', 'hugging-face', 'something-abcde']));
});

test('Should return nothing as emoticon reference has more than 15 characters', () => {
  const { emoticons } = messageParser.evaluate(
    "No, no don't! Stop cleansing my aura! No, just leave my aura alone, okay? (something-with-abcdef)",
  );

  expect(emoticons).toHaveLength(0);
});

test('Should return nothing as emoticon reference is using brackets instead of parentheses', () => {
  const { emoticons } = messageParser.evaluate(
    'Let me get you some coffee [kissing-face][hugging-face][something-abcde]',
  );

  expect(emoticons).toHaveLength(0);
});

test('Should show 1 link given some was mentioned', () => {
  const fakeTitle = { title: 'fake-title' };
  getDetails.mockReturnValue({ title: 'fake-title' });
  const address = 'https://github.com/willianantunes';
  const { links } = messageParser.evaluate(`And I just want a million dollars! ${address}`);

  expect(getDetails).toHaveBeenCalledWith(address);
  expect(links).toHaveLength(1);
  expect(links[0]).toMatchObject({
    url: 'https://github.com/willianantunes',
    title: fakeTitle.title,
  });
});

test('Should show 2 links given 2 were mentioned', () => {
  const fakeTitle = { title: 'fake-title' };
  getDetails.mockReturnValue({ title: 'fake-title' });
  const firstAddress = 'https://github.com/be-dev-yes/yoda';
  const secondAddress = 'https://github.com/sapegin/jest-cheat-sheet';
  const { links } = messageParser.evaluate(`${firstAddress} Can I get you some coffee?! ${secondAddress}`);

  expect(getDetails).toHaveBeenNthCalledWith(1, firstAddress);
  expect(getDetails).toHaveBeenNthCalledWith(2, secondAddress);
  expect(links).toHaveLength(2);
  expect(links[0]).toMatchObject({
    url: 'https://github.com/be-dev-yes/yoda',
    title: fakeTitle.title,
  });
  expect(links[1]).toMatchObject({
    url: 'https://github.com/sapegin/jest-cheat-sheet',
    title: fakeTitle.title,
  });
});
