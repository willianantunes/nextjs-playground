import * as tvmazeService from '../../src/services/TVMazeService';

test('Should search for show given the provided name and return a fixed list of 10 items', async () => {
  let result = await tvmazeService.showSearch('batman');

  expect(result).toHaveLength(10);
  let someFoundShow = result[0];
  expect(typeof someFoundShow.score).toBe('number');
  expect(typeof someFoundShow.show.id).toBe('number');
  expect(typeof someFoundShow.show.name).toBe('string');
  expect(someFoundShow.show.name).toBe('Batman');
  expect(typeof someFoundShow.show.summary).toBe('string');
});
