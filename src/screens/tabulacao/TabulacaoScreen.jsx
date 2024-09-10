import axios from "axios";
import { useEffect, useState } from "react";
import AreaTable from "../../components/dashboard/areaTable/AreaTable";

const Tabulacoes = () => {
  const [tabulacoes, setTabulacoes] = useState([]);
  const [loading, setLoading] = useState(false); // Estado de carregamento

  // Função para obter as tabulações
  const getTabulacoes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Obtém o token do localStorage
      // Faz a requisição GET com o token de autenticação
      const res = await axios.get("http://localhost:3000/tabulacao", {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho Authorization
        },
      });
      setTabulacoes(res.data.data || []); // Define os dados retornados na resposta ou um array vazio se não houver dados
      console.log(res.data);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    } finally {
      setLoading(false); // Garante que o estado de carregamento seja desativado independentemente do resultado
    }
  };

  // Executa a função getTabulacoes quando o componente for montado
  useEffect(() => {
    getTabulacoes();
  }, []);

  return (
    <div className="content-area">
      <AreaTable data={tabulacoes} loading={loading} /> {/* Passa a prop de carregamento */}
    </div>
  );
};

export default Tabulacoes;
