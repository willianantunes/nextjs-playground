test('Should return only mentions', () => {
  const result = undefined;

  expect(result).toMatchObject({
    mentions: ['jafar'],
  });
});

test('Should return only emoticons', () => {
  const result = undefined;

  expect(result).toMatchObject({
    emoticons: ['jasmine-face', 'abu-eye'],
  });
});

test('Should return only links', () => {
  const result = undefined;

  expect(result).toMatchObject({
    links: [
      {
        url: 'https://github.com/sapegin/jest-cheat-sheet',
        title: expect.any(String),
      },
    ],
  });
});

test('Should return mentions, emoticons and links', () => {
  const result = undefined;

  expect(result).toMatchObject({
    mentions: ['aladdin', 'genie'],
    emoticons: ['nose'],
    links: [
      {
        url: 'https://gist.github.com/willianantunes',
        title: expect.any(String),
      },
    ],
  });
});
