import React from 'react';
import { render } from '@testing-library/react-native';
import Sprite from '../../src/components/Sprite';

describe('truth', () => {
  it('is true', () => {
    expect(true).toEqual(true);
  });
});

// describe('Sprite', () => {
//   test('Sprite snapshot', () => {
//     const snap = renderer.create(<Sprite />).toJSON();
//     expect(snap).toMatchSnapshot();
//   });
// });
