import {
    indigo900, indigo700,
    red500,
    grey100, grey300, grey400, grey500,
    blueGrey800,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: indigo900,
        primary2Color: indigo700,
        primary3Color: grey400,
        accent1Color: red500,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
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
