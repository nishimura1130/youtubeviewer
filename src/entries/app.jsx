import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/routings/App';
import GlobalStyle from '~/style/GlobalStyle';

// 追加する
import { FavoriteProvider } from '~/contexts/FavoriteContext';

const rootEl = window.document.getElementById('root');

ReactDOM.render(
  <>
    <GlobalStyle />
    {/* FavoriteProviderでラップする */}
    <FavoriteProvider> {/* 追加する */}
      <App />
    </FavoriteProvider>　{/* 追加する */}
  </>,
  rootEl,
);