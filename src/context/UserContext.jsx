// UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto
const UserContext = createContext();

// Provider para o contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado para armazenar o usuário
    const [token, setToken] = useState(null); // Estado para armazenar o token

    // Carregar o usuário e token do localStorage ao inicializar o contexto
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Salvar o usuário e token no localStorage sempre que o estado mudar
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } 
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [user, token]);

    // Função para realizar o logout
    const logout = () => {
        setUser(null); // Reseta o estado do usuário
        setToken(null); // Reseta o estado do token
        localStorage.removeItem('token'); // Remove o token do localStorage
        localStorage.removeItem('user'); 
    };

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para acessar os dados do contexto
export const useUser = () => useContext(UserContext);
