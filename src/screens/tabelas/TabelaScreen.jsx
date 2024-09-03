import axios from "axios";
import AreaTable from "../../components/dashboard/areaTable/AreaTable"
import Comission from '../../components/comission/Comission';
import { useEffect, useState } from "react";

const Tables = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtenha o token do localStorage

      // Faça a requisição GET com o token de autenticação
      const res = await axios.get("http://localhost:3000/listar-dados", {
        headers: {
          Authorization: `Bearer ${token}`, // Envie o token no cabeçalho Authorization
        },
      });

      setData(res.data.data); // Defina os dados retornados na resposta
      console.log(res.data);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []); // O segundo argumento [] garante que o useEffect execute apenas uma vez, quando o componente for montado

  return (
    <div className="content-area">
      <Comission />
      <AreaTable data={data} />
    </div>
  );
};

export default Tables;
