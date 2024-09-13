// Importar os ícones do Material Design da biblioteca react-icons
import { MdHistory, MdReceipt, MdSearch } from 'react-icons/md';
import "./styles.css";
import { useState } from 'react';

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

const TabelaReembolso = ({ data, loading }) => {
  const [weekFilter, setWeekFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [rotaFilter, setRotaFilter] = useState('');

  // Estado para exibir o formulário de solicitação
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    dataInicio: '',
    dataFim: '',
    tipoRota: '',
    observacao: ''
  });

  const handleWeekChange = (e) => setWeekFilter(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);
  const handleRotaChange = (e) => setRotaFilter(e.target.value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    // Adicionar a lógica para enviar os dados ao servidor
    // Após o envio, você pode esconder o formulário e limpar os dados
    setShowForm(false);
    setFormData({
      dataInicio: '',
      dataFim: '',
      tipoRota: '',
      observacao: ''
    });
  };

  const filteredData = data?.filter((item) => {
    return (
      (weekFilter ? item.Semana === weekFilter : true) &&
      (statusFilter ? item.Status === statusFilter : true) &&
      (rotaFilter ? item.Rota === rotaFilter : true)
    );
  });

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Função para lidar com o clique do ícone de Histórico
  const handleHistoricoClick = (id) => {
    console.log(`Histórico clicado para a solicitação ${id}`);
    // Lógica para exibir o histórico
  };

  // Função para lidar com o clique do ícone de Despesas
  const handleDespesasClick = (id) => {
    console.log(`Despesas clicado para a solicitação ${id}`);
    // Lógica para exibir as despesas
  };

  return (
    <section className="content-area-table">
      {/* Botão para mostrar o formulário */}
      <button className="btn-show-form" onClick={() => setShowForm(!showForm)}>
        Solicitar Nova Rota
      </button>

      {/* Formulário de Solicitação */}
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
          <select value={weekFilter} onChange={handleWeekChange}>
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
          <select value={statusFilter} onChange={handleStatusChange}>
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
          <select value={rotaFilter} onChange={handleRotaChange}>
            <option value="">Todas</option>
            {ROTA_OPTIONS.map((rota, index) => (
              <option key={index} value={rota}>
                {rota}
              </option>
            ))}
          </select>
        </label>
        <label>
          protocolo:
          <select value={rotaFilter} onChange={handleRotaChange}>
            <option value="">Todas</option>
            {ROTA_OPTIONS.map((id, index) => (
              <option key={index} value={id}>
                {id}
              </option>
            ))}
          </select>
        </label>
        {/* Botão de pesquisa com ícone de lupa */}
        <button className="btn-search" onClick={() => console.log('Pesquisa acionada')}>
          <MdSearch size={24} />
        </button>
      </div>

      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((dataItem) => (
              <tr key={dataItem.id}>
                <td className='id-cell'>{dataItem.id}</td>
                <td>{dataItem.Data}</td>
                <td>{dataItem.Semana}</td>
                <td>{dataItem.Rota}</td>
                <td>{dataItem.Status}</td>
                <td>{dataItem.Valor}</td>
                {/* Ícone de Histórico */}
                <td className="icon-cell">
                  <MdHistory
                    onClick={() => handleHistoricoClick(dataItem.id)}
                    className="icon"
                    title="Ver Histórico"
                  />
                </td>
                {/* Ícone de Despesas */}
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
