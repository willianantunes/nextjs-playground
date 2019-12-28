import * as pageDetailsService from '../../../src/services/PageDetailsService';

test('Should get page details given some URL', async () => {
  const url = 'https://medium.com/juntos-somos-mais/graphql-simples-e-test%C3%A1vel-com-django-e-graphene-d8c50c9fa089';
  const result = await pageDetailsService.getDetails(url);

  expect(result).toMatchObject({
    title: expect.any(String),
  });
});
