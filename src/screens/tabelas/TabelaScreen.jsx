import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import Cookies from "js-cookie"; // Importando a biblioteca js-cookie
// import Comission from "../../components/comission/Comission";
import TabelaReembolso from "../../components/Tabela-Reembolso/TabelaReembolso";

// Função utilitária para formatar a data
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR'); // Formato dd/mm/aaaa
};

const Tables = () => {
  const {user} = useUser();
  const [reembolsos, setReembolso] = useState([]);
  const [loading, setLoading] = useState(false);
    // Configurar axios para enviar cookies
    axios.defaults.withCredentials = true;

  const getReembolso = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/reembolso", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Obtendo o token dos cookies
        },
      });
      setLoading(false);
      // Função utilitária para formatar o valor no estilo monetário
const formatValor = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
};

const filteredData = res.data.data.map((item) => ({
  id: item.id,
  Data: formatDate(item.data), // Formatar a data
  Semana: `${formatDate(item.data_incio)} - ${formatDate(item.data_fim)}`, // Formatar o período da semana
  Rota: item.tipo_rota, // Rota
  Status: item.status, // Status
  Valor: formatValor(item.valor), // Formatar o valor com separadores de milhar e ponto para centavos
}));

      console.log(res.data.data)
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