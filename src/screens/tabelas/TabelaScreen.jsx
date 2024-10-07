import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import Cookies from "js-cookie"; // Importando a biblioteca js-cookie
import TabelaReembolso from "../../components/Tabela-Reembolso/TabelaReembolso";
import api from "../../services/api"; // Importando o serviço api

// Função utilitária para formatar a data
const formatDate = (dateString) => {
  if (!dateString) return "N/A"; // Retornar "N/A" se a data for nula ou indefinida
  const date = new Date(dateString);
  return isNaN(date) ? "N/A" : date.toLocaleDateString('pt-BR'); // Formato dd/mm/aaaa
};

// Função utilitária para formatar o valor no estilo monetário
const formatValor = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
};

const Tables = () => {
  const { user } = useUser();
  const [reembolsos, setReembolso] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função para obter os reembolsos
  const getReembolso = async () => {
    try {
      setLoading(true);
      const { data: res } = await api.get("/reembolso", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Obtendo o token dos cookies
        },
      });
      setLoading(false);

      const filteredData = res.data.map((item) => ({
        id: item.id,
        Data: formatDate(item.data), // Formatar a data
        Semana: `${formatDate(item.data_incio)} - ${formatDate(item.data_fim)}`, // Formatar o período da semana
        Rota: item.tipo_rota, // Rota
        Status: item.status, // Status
        Valor: formatValor(item.valor), // Formatar o valor com separadores de milhar e ponto para centavos
      }));

      console.log(res.data);
      setReembolso(filteredData);
      console.log(filteredData);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    getReembolso();
  }, []);

  return (
    <div className="content-area">
      <h2>Solicitações de {user?.name} </h2>      
      <TabelaReembolso data={reembolsos} loading={loading} />
    </div>
  );
};

export default Tables;
