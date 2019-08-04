import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../../components/Header';

test('Should properly render Header component', () => {
  const component = renderer.create(<Header />);
  let tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div>
      <a
        href="/"
        onClick={[Function]}
        onMouseEnter={[Function]}
        style={
          Object {
            "marginRight": 15,
          }
        }
      >
        Home
      </a>
      <a
        href="/about"
        onClick={[Function]}
        onMouseEnter={[Function]}
        style={
          Object {
            "marginRight": 15,
          }
        }
      >
        About
      </a>
    </div>
  `);
});
