import axios from "axios";
import { useEffect, useState } from "react";
import AreaTable from "../../components/dashboard/areaTable/AreaTable";
import Comission from "../../components/comission/Comission";

const Tables = () => {
  const [reembolsos, setReembolso] = useState([]);
  const [loading, setLoading] = useState(false); // Adicione o estado de carregamento

  const getReembolso = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Obtenha o token do localStorage
      // Faz a requisição GET com o token de autenticação
      const res = await axios.get("http://localhost:3000/reembolso", {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho Authorization
        },
      });
      setLoading(false);
      setReembolso(res.data.data || [] ); // Define os dados retornados na resposta
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    getReembolso();
  }, []); // O segundo argumento [] garante que o useEffect execute apenas uma vez, quando o componente for montado

  return (
    <div className="content-area">
      <Comission />
      <AreaTable data={reembolsos} loading={loading} />{" "}
      {/* Passe a prop de carregamento */}
    </div>
  );
};

export default Tables;