import {createContext, useState} from "react";
import useLocalStorage from "./useLocalStorage";


export const LanguageContext = createContext({});

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useLocalStorage('language','fr')//useState('fr');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;