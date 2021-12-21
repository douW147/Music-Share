import { createTheme } from '@material-ui/core/styles';
import { teal, purple } from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: purple,
        type: "dark"
    }
});

export default theme;