import React, {createContext, useContext, useState} from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import LanguageProvider, {LanguageContext} from "./hooks/LanguageContext";
import useLocalStorage from "./hooks/useLocalStorage";

// TODO: Exercice 2.1 - Créer le LanguageContext

export const ThemeContext = createContext();

const AppContent = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useLocalStorage('serch','')//useState('');
  const { language, setLanguage } = useContext(LanguageContext); // 🔥 Correction ici
  return (
      <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
        <header className="my-4">
          <h1 className="text-center">{language === "fr" ? "Catalogue de Produits" : "Product Catalog"}</h1>
          <div className="d-flex justify-content-end gap-2">
            <ThemeToggle />
              <div className="d-flex justify-content-end gap-2">
                  <select
                      onChange={(e) => setLanguage(e.target.value)} // 🔥 Correction ici
                      value={language}
                      className={` form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
                  >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                  </select>
              </div>

          </div>
        </header>
        <main>
          <ProductSearch onSearch={ setSearchTerm } />
          <ProductList searchTerm={searchTerm}/>
        </main>
      </div>
  );
};

const App = () => {
  const [isDarkTheme, setIsDarkTheme] =useLocalStorage('theme',false)//useState(false);

  return (
      <LanguageProvider>
        <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>

          <AppContent />

        </ThemeContext.Provider>
      </LanguageProvider>
  );
};

export default App
