import axios from "axios";
import { useEffect, useState } from "react";
import AreaTable from "../../components/dashboard/areaTable/AreaTable";
import FormEdit from "../../components/formEdit/FormEdit";

const Tabulacoes = () => {
  const [tabulacoes, setTabulacoes] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    getTabulacoes();
  }, []);

  return (
    <div className="content-area">
      {/* Renderiza o FormEdit apenas se houver um item em edição */}
      {editingItem && (
        <FormEdit
          item={editingItem}
          onSave={(updatedData) => onEdit(editingItem.id, updatedData)} // Chama a função onEdit com os dados atualizados
          onCancel={() => setEditingItem(null)} // Fecha o formulário ao cancelar
        />
      )}
      <AreaTable
        data={tabulacoes}
        loading={loading}
        onDelete={onDelete} // Passa a função onDelete para a tabela
        onEdit={startEdit} // Passa a função para iniciar a edição
      />
    </div>
  );
};

export default Tabulacoes;
