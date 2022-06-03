import React, { createContext, useContext, useReducer, useRender } from "react";

//Prepare the data layer 
export const StateContext = createContext();
//wrape our app and provide data layout 
export const StateProvider = ({ reducer, initalState, children }) => (
    <StateContext.Provider value={useReducer (reducer, initalState)}>
        {children}
    </StateContext.Provider>

);
// pull infromation from the data layer
export const useStateValue = () => useContext(StateContext);