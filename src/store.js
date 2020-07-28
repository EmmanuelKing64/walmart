import React from 'react';

export const initialState = {
    entities:[], // Products list
    loading:true,
};

export const AppContext = React.createContext(initialState);