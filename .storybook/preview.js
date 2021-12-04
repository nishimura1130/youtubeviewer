import React from 'react';
import { MemoryRouter } from 'react-router';
import { addDecorator } from '@storybook/react';

// ここから追加する
import { action } from '@storybook/addon-actions';
import { FavoriteProvider } from '../src/contexts/FavoriteContext';
// ここまで追加する

import GlobalStyle from "../src/style/GlobalStyle";

addDecorator(storyFn => (
  <MemoryRouter
    initialEntries={['/', 'posts']}
  >
    {storyFn()}
  </MemoryRouter>
));

// 追加する
const mockApi = {
  get: async () => {
    // モック実装
    action('api.get')();
    return { data: [] };
  },
};

addDecorator((storyFn) => (
  <FavoriteProvider api={mockApi}>
    {storyFn()}
  </FavoriteProvider>
));

addDecorator(storyFn => <><GlobalStyle />{storyFn()}</>);