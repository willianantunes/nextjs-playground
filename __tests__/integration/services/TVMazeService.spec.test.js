import * as tvmazeService from '../../../src/services/TVMazeService'

test('Should search for show given the provided name and return a fixed list of 10 items', async () => {
  const result = await tvmazeService.showSearch('batman')

  expect(result).toHaveLength(10)
  const someFoundShow = result[0]
  expect(typeof someFoundShow.score).toBe('number')
  expect(typeof someFoundShow.show.id).toBe('number')
  expect(typeof someFoundShow.show.name).toBe('string')
  expect(someFoundShow.show.name).toBe('The Batman')
  expect(typeof someFoundShow.show.summary).toBe('string')
})

test('Should get details from the show given its ID', async () => {
  const result = await tvmazeService.showMainInformation(481)

  expect(result).toMatchObject({
    id: 481,
    url: 'http://www.tvmaze.com/shows/481/the-batman',
    name: 'The Batman',
    type: 'Animation',
    language: 'English',
    genres: ['Action', 'Adventure', 'Science-Fiction'],
    status: 'Ended',
    runtime: 30,
    premiered: '2004-09-11',
    officialSite: null,
    schedule: {
      time: '10:30',
      days: ['Saturday']
    },
    rating: {
      average: 8.5
    },
    weight: expect.any(Number),
    network: {
      id: 5,
      name: 'The CW',
      country: {
        name: 'United States',
        code: 'US',
        timezone: 'America/New_York'
      }
    },
    webChannel: null,
    externals: {
      tvrage: 5602,
      thetvdb: 73180,
      imdb: 'tt0398417'
    },
    image: {
      medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/3/9370.jpg',
      original: 'http://static.tvmaze.com/uploads/images/original_untouched/3/9370.jpg'
    },
    summary: expect.stringMatching(/Hidden/),
    updated: expect.any(Number),
    _links: {
      self: {
        href: 'http://api.tvmaze.com/shows/481'
      },
      previousepisode: {
        href: 'http://api.tvmaze.com/episodes/43721'
      }
    }
  })
})
