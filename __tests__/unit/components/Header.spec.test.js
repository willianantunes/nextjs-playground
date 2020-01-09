import React from 'react'
import renderer from 'react-test-renderer'
import Header from '../../../src/components/Header'

jest.mock('next/router', () => ({
  withRouter: component => {
    component.defaultProps = {
      ...component.defaultProps,
      router: {
        pathname: '/',
        query: null
      }
    }

    return component
  }
}))

test('Should properly render Header component', () => {
  const component = renderer.create(<Header />)
  const tree = component.toJSON()
  expect(tree).toMatchInlineSnapshot(`
    <div>
      <header>
        <nav
          className="navbar navbar-expand-md navbar-dark bg-dark"
        >
          <a
            className="navbar-brand"
            href="/"
            onClick={[Function]}
            onMouseEnter={[Function]}
          >
            Next.JS Playground Project
          </a>
          <div
            className="collapse navbar-collapse"
            id="navbarCollapse"
          >
            <ul
              className="navbar-nav mr-auto"
            >
              <a
                className="nav-link active"
                href="/"
                onClick={[Function]}
                onMouseEnter={[Function]}
              >
                Home
              </a>
              <a
                className="nav-link"
                href="/batman"
                onClick={[Function]}
                onMouseEnter={[Function]}
              >
                Batman shows
              </a>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  `)
})
