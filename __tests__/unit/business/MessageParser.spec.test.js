import { getDetails } from '../../../src/services/PageDetailsService'
import evaluate from '../../../src/business/MessageParser'

jest.mock('../../../src/services/PageDetailsService')

beforeEach(() => {
  getDetails.mockClear()
})

describe('All tests regarding mentions', () => {
  test('Should show 1 mention given someone was mentioned', async () => {
    const { mentions } = await evaluate('There\'s nothing to tell! @Jafar is just some guy I work with!')

    expect(mentions).toEqual(expect.arrayContaining(['Jafar']))
  })

  test('Should show 2 mentions given 2 users were mentioned', async () => {
    const { mentions } = await evaluate('@Jafar and @Iago say hello, I wanna kill myself')

    expect(mentions).toEqual(expect.arrayContaining(['Jafar', 'Iago']))
  })

  test('Should show 1 mention until username hits non-word character', async () => {
    const { mentions } = await evaluate('@Aladdin!# is honest!')

    expect(mentions).toEqual(expect.arrayContaining(['Aladdin']))
  })
})

describe('All tests regarding emoticons', () => {
  test('Should show 1 emoticon given some was pointed out', async () => {
    const { emoticons } = await evaluate('Then I look down, and I realize there\'s a phone... there (grinning-face)')

    expect(emoticons).toEqual(expect.arrayContaining(['grinning-face']))
  })

  test('Should show 2 emoticons given 2 were pointed out including only one with 15 characters limit', async () => {
    const { emoticons } = await evaluate('Let me get you some coffee (kissing-face)(hugging-face)(something-abcde)')

    expect(emoticons).toEqual(expect.arrayContaining(['kissing-face', 'hugging-face', 'something-abcde']))
  })

  test('Should return nothing as emoticon reference has more than 15 characters', async () => {
    const { emoticons } = await evaluate(
      'No, no don\'t! Stop cleansing my aura! No, just leave my aura alone, okay? (something-with-abcdef)'
    )

    expect(emoticons).toHaveLength(0)
  })

  test('Should return nothing as emoticon reference is using brackets instead of parentheses', async () => {
    const { emoticons } = await evaluate('Let me get you some coffee [kissing-face][hugging-face][something-abcde]')

    expect(emoticons).toHaveLength(0)
  })
})

describe('All tests regarding links', () => {
  test('Should show 1 link given some was mentioned', async () => {
    const fakeTitle = { title: 'fake-title' }
    getDetails.mockReturnValue({ title: 'fake-title' })
    const address = 'https://github.com/willianantunes'
    const { links } = await evaluate(`And I just want a million dollars! ${address}`)

    expect(getDetails).toHaveBeenCalledWith(address)
    expect(links).toHaveLength(1)
    expect(links[0]).toMatchObject({
      url: address,
      title: fakeTitle.title
    })
  })

  test('Should show 2 links given 2 were mentioned', async () => {
    const fakeTitle = { title: 'fake-title' }
    getDetails.mockReturnValue({ title: 'fake-title' })
    const firstAddress = 'https://github.com/be-dev-yes/yoda'
    const secondAddress = 'https://github.com/sapegin/jest-cheat-sheet'
    const { links } = await evaluate(`${firstAddress} Can I get you some coffee?! ${secondAddress}`)

    expect(getDetails).toHaveBeenNthCalledWith(1, firstAddress)
    expect(getDetails).toHaveBeenNthCalledWith(2, secondAddress)
    expect(links).toHaveLength(2)
    expect(links[0]).toMatchObject({
      url: firstAddress,
      title: fakeTitle.title
    })
    expect(links[1]).toMatchObject({
      url: secondAddress,
      title: fakeTitle.title
    })
  })
})

describe('Contract tests', () => {
  test('Should return only mentions', async () => {
    const result = await evaluate('There\'s nothing to tell! @Jafar is just some guy I work with!')

    expect(result).toMatchObject({
      mentions: ['Jafar']
    })
  })

  test('Should return only emoticons', async () => {
    const result = await evaluate('Let me get you some coffee (jasmine-face)(abu-eye)')

    expect(result).toMatchObject({
      emoticons: ['jasmine-face', 'abu-eye']
    })
  })

  test('Should return only links', async () => {
    const fakeTitle = { title: 'fake-title' }
    getDetails.mockReturnValue({ title: 'fake-title' })
    const address = 'https://github.com/sapegin/jest-cheat-sheet'
    const result = await evaluate(`And I just want a million dollars! ${address}`)

    expect(result).toMatchObject({
      links: [
        {
          url: address,
          title: fakeTitle.title
        }
      ]
    })
  })

  test('Should return mentions, emoticons and links', async () => {
    const fakeTitle = { title: 'fake-title' }
    getDetails.mockReturnValue({ title: 'fake-title' })
    const address = 'https://gist.github.com/willianantunes'
    const result = await evaluate(
      `Hey @Aladdin and @Genie, you wanna help on your (nose)?! Know more acessing ${address}`
    )

    expect(result).toMatchObject({
      mentions: ['Aladdin', 'Genie'],
      emoticons: ['nose'],
      links: [
        {
          url: address,
          title: fakeTitle.title
        }
      ]
    })
  })
})
