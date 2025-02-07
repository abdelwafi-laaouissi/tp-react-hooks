import { useState, useEffect } from 'react';
import useDebounce from "./useDebounce";

// TODO: Exercice 3.1 - Créer le hook useDebounce
// TODO: Exercice 3.2 - Créer le hook useLocalStorage

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 30;
  const [skip,setSkip]= useState(0);

    const fetchProducts = async () => {
      try {
        // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
        const response = await fetch(`https://api.daaif.net/products?delay=1000&limit=${limit}&skip=${skip}`);
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        const ProductsSerch = data.products.filter(product => {
          return product.title.startsWith(searchTerm);
        })
        setProducts(ProductsSerch);
        setTotalPages(Math.ceil(data.total / data.limit));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchTerm,currentPage]); // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  const nextPage = () => {
    if (currentPage < totalPages){
      setCurrentPage(currentPage + 1);
      setSkip(skip+limit) ;
    }

  };
  const previousPage = () => {
    if (currentPage > 1){
      setCurrentPage(currentPage - 1);
      setSkip(skip-limit) ;
    }
  };
  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination

  return { 
    products, 
    loading, 
    error,
    currentPage,
    totalPages,
    nextPage,
    previousPage
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
  };
};

export default useProductSearch;