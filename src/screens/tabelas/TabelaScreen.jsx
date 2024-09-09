import axios from "axios";
import { useEffect, useState } from "react";
import AreaTable from "../../components/dashboard/areaTable/AreaTable";
import Comission from '../../components/comission/Comission';

const Tables = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Adicione o estado de carregamento

  const getData = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtenha o token do localStorage

      // Simule um atraso de 3 segundos antes de fazer a requisição
      setTimeout(async () => {
        try {
      // Faz a requisição GET com o token de autenticação
      const res = await axios.get("http://localhost:3000/listar-dados", {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho Authorization
        },
      });

      setData(res.data.data); // Define os dados retornados na resposta
        } catch (error) {
          console.error("Erro ao buscar os dados:", error);
        } finally {
          setLoading(false); // Atualiza o estado de carregamento para false
        }
      }, 3000); // Atraso de 3 segundos
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setLoading(false); // Atualiza o estado de carregamento mesmo se ocorrer um erro
    }
  };

  useEffect(() => {
    getData();
  }, []); // O segundo argumento [] garante que o useEffect execute apenas uma vez, quando o componente for montado

  return (
    <div className="content-area">
      <Comission />
      <AreaTable data={data} loading={loading} /> {/* Passe a prop de carregamento */}
    </div>
  );
};

export default Tables;
