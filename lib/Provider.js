"use client";
import React, { createContext, useState, useContext } from "react";

const ProviderContext = createContext();

export const Provider = ({ children }) => {
  const [state, setState] = useState({
    loading: false,
    config: {
      let: "let",
      const: "कॉन्स्ट",
      var: "var",
      print: "+++",
      function: "function",
    },
  });

  const update = (val, cb) => {
    setState({ ...state, ...val });
    if (cb) cb();
  };

  return (
    <ProviderContext.Provider value={{ update, state }}>
      {children}
    </ProviderContext.Provider>
  );
};

export const Consumer = ({ children }) => {
  const store = useContext(ProviderContext);
  return <>{children(store)}</>;
};
