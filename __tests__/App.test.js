import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App';

describe('<App />', () => {
  it('has 3 children', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});
