import {useEffect, useState} from "react";

const useLocalStorage =(key,initialValue) => {
    // Lire la valeur depuis le localStorage ou utiliser une valeur par défaut
    const storedValue =localStorage.getItem(key);
    const [value, setValue] = useState(
        storedValue ? JSON.parse(storedValue) : initialValue
    );
// Sauvegarde automatique dans le localStorage lorsqu'on met à jour `value`
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    console.log("local storage "+key+" : "+ JSON.stringify(value));
    return [value, setValue];

}
export default useLocalStorage;