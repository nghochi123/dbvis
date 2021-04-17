import React, {useReducer, createContext} from 'react';

export const RerenderStateContext = createContext();
export const RerenderDispatchContext = createContext();

const initialState = {
    toggle: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FORCE_RERENDER':
            return {
                ...state,
                toggle: !state.toggle
            }
        default:
            throw new Error('Illegal Action Type');
    }
}

const RerenderContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <RerenderStateContext.Provider value={state}>
            <RerenderDispatchContext.Provider value={dispatch}>
                {children}
            </RerenderDispatchContext.Provider>
        </RerenderStateContext.Provider>
    )
}

export default RerenderContextProvider;