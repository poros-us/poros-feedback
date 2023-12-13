import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import App from './App.tsx';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#131A15',
        color: '#CDC6B5'
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)

/**
 * Light:         #CDC6B5
 * Light Accent:  #69817A
 * Main:          #2B3D37
 * Dark Accent:   #4C6B7C
 * Dark:          #131A15
 * 
 * 
 * error:         #F44336
 */