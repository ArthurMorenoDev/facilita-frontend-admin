import axios from "axios";
import { useEffect, useState } from "react";
import AreaTable from "../../components/dashboard/areaTable/AreaTable";
import FormEdit from "../../components/formEdit/FormEdit";
import { useUser } from "../../context/UserContext";

const Tabulacoes = () => {

  const {user} = useUser();
  const [tabulacoes, setTabulacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false); // Estado para alternar entre tabulações do usuário e todas
  const [editingItem, setEditingItem] = useState(null); // Estado para o item sendo editado

  // Função para obter as tabulações
  const getTabulacoes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/tabulacao", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTabulacoes(res.data.data || []);
      console.log(res.data);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    } finally {
      setLoading(false);
    }
  };
  // Função para obter as tabulações do usuário logado
  const getTabulacoesUserId = async () => {
    const userId = user?.id; // Obtém o ID do usuário do contexto
    if (!userId) {
      console.error("ID do usuário não encontrado");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/tabulacao/usuario/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTabulacoes(res.data.data || []);
      console.log(res.data);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    } finally {
      setLoading(false);
    }
  };



  // Função para deletar uma tabulação
  const onDelete = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/tabulacao/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTabulacoes((prevTabulacoes) =>
        prevTabulacoes.filter((tabulacao) => tabulacao.id !== id)
      );
      console.log(`Tabulação com id ${id} deletada com sucesso.`);
      alert("Tabulação deletada com sucesso");
    } catch (error) {
      console.error("Erro ao deletar a tabulação:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para editar uma tabulação
  const onEdit = async (id, updatedData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:3000/tabulacao/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Atualiza a lista com o item editado
      setTabulacoes((prevTabulacoes) =>
        prevTabulacoes.map((tabulacao) =>
          tabulacao.id === id ? res.data.data : tabulacao
        )
      );
      console.log(`Tabulação com id ${id} editada com sucesso.`);
      setEditingItem(null); // Fecha o formulário de edição após a atualização
    } catch (error) {
      console.error("Erro ao editar a tabulação:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para iniciar o processo de edição
  const startEdit = (item) => {
    setEditingItem(item); // Define o item a ser editado
  };

 // Função para obter todas as tabulações
  // const getAllTabulacoes = async () => {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem("token");

  //     const res = await axios.get("http://localhost:3000/tabulacao", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setTabulacoes(res.data.data || []); // Armazena todas as tabulações
  //   } catch (error) {
  //     console.error("Erro ao buscar todas as tabulações:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Função para alternar entre todas as tabulações e as do usuário
  const toggleTabulacoes = () => {
    setShowAll((prevShowAll) => !prevShowAll); // Alterna entre exibir todas ou apenas as do usuário
  };

  useEffect(() => {
    if (user && user.id) {
      if (showAll) {
        getTabulacoes(); // Busca todas as tabulações
      } else {
        getTabulacoesUserId(); // Busca apenas as tabulações do usuário
      }
    }
  }, [user, showAll]); // Reexecuta a busca quando o usuário ou o estado de exibição mudar
  return (
    <div>
      <button onClick={toggleTabulacoes}>
        {showAll ? "Mostrar Minhas Tabulações" : "Mostrar Todas as Tabulações"}
      </button>

      {/* Renderiza a tabela ou uma mensagem de carregamento */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <AreaTable data={tabulacoes} />
      )}
    </div>
  );
};

export default Tabulacoes;
