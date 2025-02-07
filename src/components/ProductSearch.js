import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';
import {LanguageContext} from "../hooks/LanguageContext";

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Transmettre le terme de recherche au parent
    };
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={language === "fr" ? "Rechercher un produit..." : "Search for a product…"}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;