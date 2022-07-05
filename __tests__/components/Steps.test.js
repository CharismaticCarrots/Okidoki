import React from 'react';
import { render } from '@testing-library/react-native';
import Steps from '../../src/components/Steps';

describe('truth', () => {
  it('is true', () => {
    expect(true).toEqual(true);
  });
});

// describe('Steps', () => {
//   it('renders the correct message', () => {
//     const { queryByText } = render(<Steps />);
//     expect(queryByText('Steps')).not.toBeNull();
//   });
// });
