import getFontPaths from '@nn-design-system/fonts/vite';
import {
  Amount as NNAmount,
  Button as NNButton,
  Card as NNCard,
  DateRangePickerInput as NNDateRangePickerInput,
  FontFaces as NNFontFaces,
  Heading as NNHeading,
  Icon as NNIcon,
  Paragraph as NNParagraph,
  useLocale as useNNLocale,
} from '@nn-design-system/react-component-library';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import config from '@nn-design-system/config/web';

function App() {
  const [count, setCount] = useState(0);

  useNNLocale('nl-NL');
  config.getFeatureFlags().useAccessibleLightTheme.enable();

  return (
    <div className="App">
      <NNFontFaces paths={getFontPaths()} />

      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <NNHeading variant="XXL">Vite + React</NNHeading>
      <NNCard variant="Tinted">
        <NNParagraph>
          This is an example React + Vite app using the NN react component
          library.
          <NNIcon name={'Alert'} />
        </NNParagraph>
        <NNButton mt="16px" onClick={() => setCount((count) => count + 1)}>
          increase amount
        </NNButton>
        <NNParagraph>
          <NNAmount value={count} currencyCode={'EUR'} />
        </NNParagraph>
        <NNParagraph>
          Edit <code>src/App.tsx</code> and save to test HMR
        </NNParagraph>
      </NNCard>
      <NNParagraph>Click on the Vite and React logos to learn more</NNParagraph>
      <NNDateRangePickerInput
        startDateInputProps={{ labelText: 'Start' }}
        endDateInputProps={{ labelText: 'End' }}
      />
    </div>
  );
}

export default App;
