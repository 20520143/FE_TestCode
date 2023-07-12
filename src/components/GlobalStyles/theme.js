import { createTheme } from '@mui/material/styles';
export const Theme = createTheme({
    colors: {
        white: '#FFFFFF',
        black: '#303841',
        gray: '#777777',
        yellow: '#F6C90E',
        Button: '#EEEEEE',
    },
    fontSize: {
        min: '8px',
        s: '13px',
        m: '18px',
        ms: '25px',
        l: '30px',
        xl: '50px',
        xxl: '80px',
        price: '25px',
        name: '15px',
    },
});

export const Title = {
    color: Theme.colors.black,
    fontSize: '24px',
    fontWeight: '600',
    paddingBottom: '8px',
};
export const Button = {
    backGround: Theme.colors.yellow,
};
