import {
    indigo900, 
    red500,
    grey100, grey300, grey400, grey500,
    blueGrey600, blueGrey800, blueGrey900,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: blueGrey800,
        primary2Color: blueGrey600,
        primary3Color: grey400,
        accent1Color: red500,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: blueGrey900,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: indigo900,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    toolbar: {
        backgroundColor: blueGrey800,
        textColor: white
    }
};
