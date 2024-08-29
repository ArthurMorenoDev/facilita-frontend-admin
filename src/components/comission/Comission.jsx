import "./styles.css";

const Comission = () => {
  return (
    <div>
        <div className="table-tittle">
            <h3>COMISSÕES GERADAS - PROPOSTAS</h3>
        
        </div>
      <form className="tabelaForm">
        <div className="tabela-container">
          <div className="consulta">
            <input placeholder="N*Consulta" type="number" className="input2"></input>
          </div>

          <div className="consulta">
            <input placeholder="BANCO" type="text" className="input2"></input>
          </div>

          <div className="consulta">
            <input type="date" className="input2"></input>
          </div>

          <div className="consulta">
            <input type="date" className="input2"></input>
          </div>
          <button type="submit" className="btn">
            Consultar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comission;
