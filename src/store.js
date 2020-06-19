import React from 'react';

export const initialState = {
    entities:[], // Products list
};

export const AppContext = React.createContext(initialState);