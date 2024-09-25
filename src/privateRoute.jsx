import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from './services/api'; // Sua instância de Axios
import Cookies from 'js-cookie'; // Importando js-cookie

export function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Estado para checar autenticação
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    // Verifica a autenticação no backend
    async function checkAuth() {
      try {
        // Faz uma requisição para o backend para verificar se o usuário está autenticado
        await api.get('/auth/check', { withCredentials: true }); // Com `withCredentials: true` para enviar o cookie
        setIsAuthenticated(true);
      } catch (err) {
        // Limpa os cookies ao encontrar erro
        Cookies.remove('token'); // Remove o cookie de token
        setIsAuthenticated(false); // Atualiza o estado de autenticação
      } finally {
        setLoading(false); // Finaliza o carregamento independentemente do resultado
      }
    }

    checkAuth();
  }, []);

  // Retorna um carregando enquanto espera a resposta da verificação de autenticação
  if (loading) {
    return <div>Loading...</div>; // Ou algum tipo de tela de carregamento
  }

  // Se autenticado, renderiza os filhos, caso contrário, redireciona para a página de login
  return isAuthenticated ? children : <Navigate to="/" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
