import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const emotionCache = createCache({
  key: 'your-app-name',
  nonce: document.querySelector<HTMLScriptElement>('script[nonce]')?.nonce,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>
      <App />
    </CacheProvider>
  </React.StrictMode>,
);
