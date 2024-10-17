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

const WEEK_OPTIONS = ["Semana 1", "Semana 2", "Semana 3"];
const STATUS_OPTIONS = ["Pendente", "Em andamento", "Aprovado"];
const ROTA_OPTIONS = ["Reembolso", "Adiantamento", "teste"];
const TIPO_ROTA_OPTIONS = ["Reembolso", "Adiantamento", "teste"]; // Novas opções de Tipo de Rota

const TabelaReembolso = ({ data, loading, token, onUpdate }) => {
  const { user } = useUser();
  const [weekFilter, setWeekFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [rotaFilter, setRotaFilter] = useState('');
  const [protocoloFilter, setProtocoloFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    usuario_solicitante: '',
    dataInicio: '',
    dataFim: '',
    tipoRota: '',
    observacao: '',
    valor: ''
  });

  // Estados para controle de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Definindo 5 itens por página

  // Estados para controlar o modal de histórico
  const [showHistoricoModal, setShowHistoricoModal] = useState(false);
  const [selectedSolicitante, setSelectedSolicitante] = useState('');

  // Função de filtragem dos dados
  const filteredData = data?.filter((item) => {
    return (
      (weekFilter ? item.Semana === weekFilter : true) &&
      (statusFilter ? item.Status === statusFilter : true) &&
      (rotaFilter ? item.Rota === rotaFilter : true)
    );
  });

  // Cálculo para a paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/reembolso', {
        usuario_solicitante: user.name,
        dataInicio: formData.dataInicio,
        dataFim: formData.dataFim,
        tipoRota: formData.tipoRota,
        observacao: formData.observacao,
        valor: parseFloat(formData.valor) // Convertendo valor para float
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.status === 201) {
        setShowForm(false);
        setFormData({
          dataInicio: '',
          dataFim: '',
          tipoRota: '',
          observacao: '',
          valor: '' // Limpa o campo valor após o envio
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

  const handleHistoricoClick = (usuario_solicitante,data_aprovacao_financeiro,data_aprovacao_regional,data_credito) => {
    setSelectedSolicitante(usuario_solicitante,data_aprovacao_financeiro,data_aprovacao_regional,data_credito);
    setShowHistoricoModal(true);
  };

  const handleCloseModal = () => {
    setShowHistoricoModal(false);
  };

  const handleDespesasClick = (id) => {
    console.log(`Despesas clicado para a solicitação ${id}`);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <section className="content-area-table">
      {/* Modal de Histórico */}
      {showHistoricoModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Histórico do Solicitante</h3>
            <p>Solicitante: {selectedSolicitante}</p>
            <button onClick={handleCloseModal}>Fechar</button>
          </div>
        </div>
      )}

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
                />
              </label>
              <label>
                Tipo da Rota:
                <select
                  name="tipoRota"
                  value={formData.tipoRota}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione o tipo de rota</option>
                  {TIPO_ROTA_OPTIONS.map((tipo, index) => (
                    <option key={index} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Observação:
                <textarea
                  name="observacao"
                  value={formData.observacao}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Valor:
                <input
                  name='valor'
                  type='number' // Alterar para o tipo 'number'
                  value={formData.valor}
                  onChange={handleInputChange}
                  min="0" // Definir um valor mínimo
                  step="0.01" // Definir o passo para aceitar números com até duas casas decimais
                  required
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
            {currentItems.map((dataItem) => (
              <tr key={dataItem.id}>
                <td className='id-cell'>{dataItem.id}</td>
                <td>{dataItem.Data}</td>
                <td>{dataItem.Semana}</td>
                <td>{dataItem.Rota}</td>
                <td>{dataItem.Status}</td>
                <td>{dataItem.Valor}</td>
                <td className="icon-cell">
                  <MdHistory
                    onClick={() => handleHistoricoClick(dataItem.usuario_solicitante)} // Passando o solicitante correto
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

      {/* Controles de paginação */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= filteredData.length}>
          Próxima
        </button>
      </div>
    </section>
  );
};

export default TabelaReembolso;
