// UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto
const UserContext = createContext();

// Provider para o contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado para armazenar o usuário

    // Carregar o usuário do localStorage ao inicializar o contexto
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Salvar o usuário no localStorage sempre que o estado do usuário mudar
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } 
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para acessar os dados do contexto
export const useUser = () => useContext(UserContext);
