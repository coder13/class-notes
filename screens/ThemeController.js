import React, { createContext, useState } from 'react';

const themes = {
    dark: {
        backgroundColor: 'black',
        backgroundCard: '#25282c',
        color: 'white',
        buttonColor: 'grey',
    },
    light: {
        backgroundColor: 'white',
        backgroundCard: '#fff',
        color: 'black',
        buttonColor: '#007aff',
    }
};

const initialState = {
    dark: false,
    theme: themes.light,
    toggle: () => { }
};

const ThemeContext = React.createContext(initialState);

function ThemeProvider({ children }) {
    const [dark, setDark] = React.useState(false);

    // toggle between dark and light
    const toggle = () => {
        setDark(!dark)
    };

    const theme = dark ? themes.dark : themes.light;

    return (
        <ThemeContext.Provider value={{ theme, dark, toggle }} >
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }