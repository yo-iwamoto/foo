import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff652f',
    },
    secondary: {
      main: '#2ff065',
    },
    error: {
      main: red.A400,
    },
    background:{ 
      default: '#fef0ea'
    },
  },
});

export default theme;