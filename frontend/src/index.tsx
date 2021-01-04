import React from 'react';
import ReactDOM from 'react-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'fontsource-roboto'
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppContext, useMode } from './hooks';
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
  <AppContext>
    <AppWithTheme />
  </AppContext>,
  document.getElementById('root')
);
