import 'fake-indexeddb/auto';
import { Message } from '../../../src/domain/Message';
import { save, findAll, deleteAll, update } from '../../../src/domain/MessageDao';

beforeEach(async done => {
  await deleteAll();
  done();
});

test('Should save message and list it afterwards', async () => {
  const message = new Message(null, 'Some message', 'Some parsed message');

  const persistedMessage = await save(message);
  const listOfMessages = await findAll();

  expect(listOfMessages).toHaveLength(1);
  expect(listOfMessages[0]).toMatchObject({
    _id: expect.any(Number),
    _original: message.original,
    _parsed: message.parsed,
  });
  expect(listOfMessages[0]).toMatchObject({
    _id: persistedMessage.id,
    _original: persistedMessage.original,
    _parsed: persistedMessage.parsed,
  });
});

test('Should save message and update it with a new value', async () => {
  const message = new Message(null, 'Some message', 'Some parsed message');

  await save(message);
  const firstListOfMessages = await findAll();
  const updatedMessage = new Message(firstListOfMessages[0].id, 'Some message updated', message.parsed);

  const persistedUpdatedMessage = await update(updatedMessage);
  const secondListOfMessages = await findAll();

  expect(secondListOfMessages).toHaveLength(1);
  expect(secondListOfMessages[0]).toMatchObject({
    _id: expect.any(Number),
    _original: updatedMessage.original,
    _parsed: message.parsed,
  });
  expect(secondListOfMessages[0]).toMatchObject({
    _id: persistedUpdatedMessage.id,
    _original: persistedUpdatedMessage.original,
    _parsed: persistedUpdatedMessage.parsed,
  });
});

test('Should save two message, list them, erase the store and list it again ', async () => {
  const messageOne = new Message(null, 'Some message 1', 'Some parsed message 1');
  const messageTwo = new Message(null, 'Some message 2', 'Some parsed message 2');

  await save(messageOne);
  await save(messageTwo);
  const firstListOfMessages = await findAll();

  expect(firstListOfMessages).toHaveLength(2);
  expect(firstListOfMessages[0]).toMatchObject({
    _id: expect.any(Number),
    _original: messageOne.original,
    _parsed: messageOne.parsed,
  });
  expect(firstListOfMessages[1]).toMatchObject({
    _id: expect.any(Number),
    _original: messageTwo.original,
    _parsed: messageTwo.parsed,
  });

  await deleteAll();
  const secondListOfMessages = await findAll();

  expect(secondListOfMessages).toHaveLength(0);
});
