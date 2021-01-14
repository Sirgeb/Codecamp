import React from 'react';
import ReactDOM from 'react-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ApolloProvider } from '@apollo/client';
import { toast } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppContext, useMode } from './hooks';
import { client } from './lib';
import 'fontsource-roboto';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';

const AppWithTheme = () => {
  const mode = useMode();
  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${mode})`);
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#f44336',
          },
          secondary: {
            main: '#ffffff',
          },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <App />
    </ThemeProvider>
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppContext>
      <AppWithTheme />
    </AppContext>
    <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
  </ApolloProvider>,
  document.getElementById('root')
);
