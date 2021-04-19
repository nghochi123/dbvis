import React, { useReducer, createContext } from "react";

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

const initialState = {
  dialogOpen: false,
  dialogText: ["", ""],
  userToken: "",
  userid: -1,
  groupid: -1,
  dbid: -1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_DIALOG":
      return {
        ...state,
        dialogOpen: !state.dialogOpen,
        dialogText: action.payload,
      };
    case "SET_USER_TOKEN":
      return {
        ...state,
        userToken: action.payload,
      };
    case "SET_USERID":
      return {
        ...state,
        userid: action.payload,
      };
    case "SET_GROUPID":
      return {
        ...state,
        groupid: action.payload,
      };
    case "SET_DBID":
      return {
        ...state,
        dbid: action.payload,
      };
    default:
      throw new Error("Illegal Action Type");
  }
};

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;
