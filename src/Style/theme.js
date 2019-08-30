import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#56A045',
    },
    secondary: {
      main: '#DAE8D5',
    },
    error: {
      main: '#E7453E',
    },
    background: {
      default: '#F9F9F9',
    },
    action: {
      default: '#a065ff',
    },
    
  },
});

export default theme;