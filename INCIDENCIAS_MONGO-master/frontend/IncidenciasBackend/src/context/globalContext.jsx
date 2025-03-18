// GlobalProvider.js
import { createContext } from "react";
import { useState } from "react";
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [usuario, setUsuario] = useState({});
    const hola = 'hola';

    return (
        <GlobalContext.Provider value={{ 
            hola,
            usuario,
            setUsuario

         }}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalProvider, GlobalContext };
