# Next.JS Playground

![Actions Status](https://github.com/willianantunes/nextjs-playground/workflows/Build%20and%20publish/badge.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=willianantunes_nextjs-playground&metric=coverage)](https://sonarcloud.io/dashboard?id=willianantunes_nextjs-playground)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=willianantunes_nextjs-playground&metric=ncloc)](https://sonarcloud.io/dashboard?id=willianantunes_nextjs-playground)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=willianantunes_nextjs-playground&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=willianantunes_nextjs-playground)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=willianantunes_nextjs-playground&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=willianantunes_nextjs-playground)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=willianantunes_nextjs-playground&metric=security_rating)](https://sonarcloud.io/dashboard?id=willianantunes_nextjs-playground)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=willianantunes_nextjs-playground&metric=sqale_index)](https://sonarcloud.io/dashboard?id=willianantunes_nextjs-playground)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=willianantunes_nextjs-playground&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=willianantunes_nextjs-playground)

First I use it to test Next.JS and its various features. I had a big headache to configure Jest with it in order to work
properly but now everything seems OK.

Well here you'll see my solution for a **code-challenge** which I believe is not used anymore as it is old, maybe if you
search for it you may find it somewhere in GitHub.

As always I'm following [Yoda's philosophy](https://github.com/be-dev-yes/yoda), that's why this project exists.

## Run NOW with Docker

Simply execute:

    docker run -itd --name nextjs-playground \
    -p 3000:3000 \
    -e NEXTJS_BIND_PORT=3000 \
    -e API_TVMAZE_ENDPOINT=https://api.tvmaze.com \
    -e PAGE_DETAILS_ENDPOINT=http://localhost:3000/api/page-details \
    willianantunes/nextjs-playground

Access on your browser: http://localhost:3000

See the logs:

    docker logs -f nextjs-playground

## How to run and test it locally

Run it:

    docker-compose up app

Execute the following to test everything:

    docker-compose up all-test

## Challenge details

1. **@mentions**: A way to mention a user. Always starts with an '@' and ends when hitting a non-word.
2. **Emoticons**: For this exercise, you only need to consider 'custom' emoticons which are ASCII strings, no longer
   than 15 characters, contained in parenthesis. You can assume that anything matching this format is an emoticon.
3. **Links**: Any URLs contained in the message, along with the page's title.

For example, calling your function with the following inputs should result in the corresponding return values.

**Input:** "@chris you around?"

**Return (string):**

    {
      "mentions": [
        "chris"
      ]
    }

**Input:** "Good morning! (megusta) (coffee)"

**Return (string):**

    {
      "emoticons": [
        "megusta",
        "coffee"
      ]
    }

**Input:** "Olympics are starting soon; http://www.nbcolympics.com"

**Return (string):**

    {
      "links": [
        {
          "url": "http://www.nbcolympics.com",
          "title": "NBC Olympics | Home of the 2016 Olympic Games in Rio"
        }
      ]
    }

**Input:** "@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016"

**Return (string):**

    {
      "mentions": [
        "bob",
        "john"
      ],
      "emoticons": [
        "success"
      ],
      "links": [
        {
          "url": "https://twitter.com/jdorfman/status/430511497475670016",
          "title": "Justin Dorfman on Twitter: \"nice @littlebigdetail from ..."
        }
      ]
    }

## Useful links

About Next.JS and so on:

- https://nextjs.org/learn/basics/getting-started
- https://github.com/zeit/next.js/issues/4789
- https://github.com/zeit/next.js/pull/936
- http://www.tvmaze.com/api
- https://zeit.co/
- https://nextjs.org/docs#production-deployment
- https://spectrum.chat/next-js/general/why-using-isomorphic-unfetch-rather-than-other-library~743d842d-f429-42d1-8184-570985456dec
- https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
- https://jaketrent.com/post/environment-variables-in-nextjs/
- https://zeit.co/blog/next5-1#environment-configuration
- https://stackoverflow.com/a/53272504/3899136
- https://github.com/zeit/next.js/issues/7755

About testing:

- https://github.com/zeit/next.js/tree/canary/examples/with-jest-react-testing-library
- https://jestjs.io/docs/en/tutorial-react#setup-without-create-react-app
- https://jestjs.io/docs/en/tutorial-react#enzyme
- https://jestjs.io/docs/en/configuration
- https://jestjs.io/docs/en/expect
- https://medium.com/@miiny/unit-test-next-js-with-jest-and-enzyme-5b305a8e29fe
- https://github.com/facebook/jest/issues/3457#issuecomment-465100008
