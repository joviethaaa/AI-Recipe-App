// PreferredTypeContext.js
import { createContext, useContext, useState } from "react";

const PreferredTypeContext = createContext();

export const PreferredTypeProvider = ({ children }) => {
  const [preferredType, setPreferredType] = useState("diet");

  return (
    <PreferredTypeContext.Provider value={{ preferredType, setPreferredType }}>
      {children}
    </PreferredTypeContext.Provider>
  );
};

export const usePreferredType = () => useContext(PreferredTypeContext);
