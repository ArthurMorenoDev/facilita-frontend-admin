import axios from "axios";
import { useEffect, useState } from "react";
import AreaTable from "../../components/dashboard/areaTable/AreaTable";
import Comission from "../../components/comission/Comission";

const Tables = () => {
  const [reembolsos, setReembolso] = useState([]);
  const [loading, setLoading] = useState(false);

  const getReembolso = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/reembolso", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filtrar as colunas indesejadas
      const filteredData = res.data.data.map((item) => {
        const {
          data_inicio,
          data_fim,
          data_aprovacao_regional,
          usuario_solicitante,
          data_credito,
          ...rest
        } = item; // Remover as colunas indesejadas
        return rest;
      });

      setLoading(false);
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
      <Comission />
      <AreaTable data={reembolsos} loading={loading} />
    </div>
  );
};

export default Tables;
