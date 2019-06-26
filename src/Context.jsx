import React from 'react'

export const AppContext = React.createContext({
    state: {},
    setState: () => {},
    searchMovies: () => {},
});

