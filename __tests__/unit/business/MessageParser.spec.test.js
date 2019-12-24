test('Should show 1 mention given someone was mentioned', () => {
  const result = undefined;

  expect(result).toEqual(expect.arrayContaining(['Jafar']));
});

test('Should show 2 mentions given 2 users were mentioned', () => {
  const result = undefined;

  expect(result).toEqual(expect.arrayContaining(['Jafar', 'Iago']));
});

test('Should show 1 mention until username hits non-word character', () => {
  const result = undefined;

  expect(result).toEqual(expect.arrayContaining(['Aladdin']));
});

test('Should show 1 emoticon given some was pointed out', () => {
  const result = undefined;

  expect(result).toEqual(expect.arrayContaining(['grinning-face']));
});

test('Should show 2 emoticons given 2 were pointed out including only one with 15 characters limit', () => {
  const result = undefined;

  expect(result).toEqual(expect.arrayContaining(['kissing-face', 'hugging-face']));
});

test('Should return nothing as emoticon reference has more than 15 characters', () => {
  const result = undefined;

  expect(result).toHaveLength(0);
});

test('Should return nothing as emoticon reference is using brackets instead of parentheses', () => {
  const result = undefined;

  expect(result).toHaveLength(0);
});
test('Should show 1 link given some was mentioned', () => {
  const result = undefined;

  expect(result).toHaveLength(1);
  expect(result[0]).toMatchObject({
    url: 'https://github.com/willianantunes',
    title: expect.any(String),
  });
});

test('Should show 2 links given 2 were mentioned', () => {
  const result = undefined;

  expect(result).toHaveLength(2);
  expect(result[0]).toMatchObject({
    url: 'https://github.com/be-dev-yes/yoda',
    title: expect.any(String),
  });
  expect(result[1]).toMatchObject({
    url: 'https://github.com/sapegin/jest-cheat-sheet',
    title: expect.any(String),
  });
});
