import { MdHistory, MdReceipt, MdSearch } from 'react-icons/md';
import "./styles.css";
import { useState } from 'react';
import api from '../../services/api';
import { useUser } from "../../context/UserContext";

const TABLE_HEADS = [
  "Solicitação",
  "Data",
  "Semana",
  "Rota",
  "Status",
  "Valor",
  "Histórico",
  "Despesas"
];

// Dados fictícios para dropdowns
const WEEK_OPTIONS = ["Semana 1", "Semana 2", "Semana 3"];
const STATUS_OPTIONS = ["Pendente", "Em andamento", "Aprovado"];
const ROTA_OPTIONS = ["Rota 1", "Rota 2", "Rota 3"];

const TabelaReembolso = ({ data, loading, token, onUpdate }) => {
  const { user } = useUser();
  const [weekFilter, setWeekFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [rotaFilter, setRotaFilter] = useState('');
  const [protocoloFilter, setProtocoloFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    dataInicio: '',
    dataFim: '',
    tipoRota: '',
    observacao: ''
  });

  // Função de filtragem dos dados
  const filteredData = data?.filter((item) => {
    return (
      (weekFilter ? item.Semana === weekFilter : true) &&
      (statusFilter ? item.Status === statusFilter : true) &&
      (rotaFilter ? item.Rota === rotaFilter : true) &&
      (protocoloFilter ? item.id === protocoloFilter : true)
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função para enviar os dados do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/reembolso', {
        usuario_solicitante: user.name,
        dataInicio: formData.dataInicio,
        dataFim: formData.dataFim,
        tipoRota: formData.tipoRota,
        observacao: formData.observacao,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Incluindo o token no cabeçalho
        }
      });

      if (response.status === 201) {
        console.log("Resposta do servidor:", response.data);

        // Fechar o formulário e limpar os campos após o sucesso
        setShowForm(false);
        setFormData({
          dataInicio: '',
          dataFim: '',
          tipoRota: '',
          observacao: ''
        });

        // Atualizar a página após o post
        window.location.reload(); // Adiciona a recarga da página após sucesso
      } else {
        console.error("Erro ao enviar os dados:", response.status);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleHistoricoClick = (id) => {
    console.log(`Histórico clicado para a solicitação ${id}`, user.name);
  };

  const handleDespesasClick = (id) => {
    console.log(`Despesas clicado para a solicitação ${id}`);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <section className="content-area-table">
      <button className="btn-show-form" onClick={() => setShowForm(!showForm)}>
        Solicitar Nova Rota
      </button>

      {showForm && (
        <div className="request-form">
          <h3>Solicitar Nova Rota</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Data Inicial:
                <input
                  type="date"
                  name="dataInicio"
                  value={formData.dataInicio}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Data Final:
                <input
                  type="date"
                  name="dataFim"
                  value={formData.dataFim}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Tipo da Rota:
                <input
                  type="text"
                  name="tipoRota"
                  value={formData.tipoRota}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Observação:
                <textarea
                  name="observacao"
                  value={formData.observacao}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-buttons">
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="filter-form">
        <label>
          Semana:
          <select value={weekFilter} onChange={(e) => setWeekFilter(e.target.value)}>
            <option value="">Todas</option>
            {WEEK_OPTIONS.map((week, index) => (
              <option key={index} value={week}>
                {week}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status:
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Todos</option>
            {STATUS_OPTIONS.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label>
          Rota:
          <select value={rotaFilter} onChange={(e) => setRotaFilter(e.target.value)}>
            <option value="">Todas</option>
            {ROTA_OPTIONS.map((rota, index) => (
              <option key={index} value={rota}>
                {rota}
              </option>
            ))}
          </select>
        </label>
        <label>
          Protocolo:
          <select value={protocoloFilter} onChange={(e) => setProtocoloFilter(e.target.value)}>
            <option value="">Todos</option>
            {data?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.id}
              </option>
            ))}
          </select>
        </label>
        <button className="btn-search">
          <MdSearch size={24} />
        </button>
      </div>

      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((dataItem) => (
              <tr key={dataItem.id}>
                <td className='id-cell'>{dataItem.id}</td>
                <td>{dataItem.Data}</td>
                <td>{dataItem.Semana}</td>
                <td>{dataItem.Rota}</td>
                <td>{dataItem.Status}</td>
                <td>{dataItem.Valor}</td>
                <td className="icon-cell">
                  <MdHistory
                    onClick={() => handleHistoricoClick(dataItem.id)}
                    className="icon"
                    title="Ver Histórico"
                  />
                </td>
                <td className="icon-cell">
                  <MdReceipt
                    onClick={() => handleDespesasClick(dataItem.id)}
                    className="icon"
                    title="Ver Despesas"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TabelaReembolso;
