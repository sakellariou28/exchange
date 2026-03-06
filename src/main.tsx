import React from 'react';
import ReactDOM from 'react-dom/client';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import App from './App';
import './index.css';

const emotionCache = createCache({
  key: 'fallback',
  nonce: document.querySelector<HTMLScriptElement>('script[nonce]')?.nonce,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>
      <App />
    </CacheProvider>
  </React.StrictMode>,
);
