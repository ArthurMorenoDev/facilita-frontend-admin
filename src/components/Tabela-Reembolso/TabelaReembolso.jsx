const TABLE_HEADS = [
    "Solicitação",
    "Data",
    "Semana",
    "Rota",
    "Status",
    "Valor"
  ];
  
  const TABLE_DATA = [
    {
      id: 1,
      Data: "2023-02-15",
      Semana: "47",
      Rota: "Rota 1",
      Status: "Pendente",
      Valor: 1200,
      data_fim: "2023-02-15",
      data_inicio: "2023-02-12"
    },
    {
      id: 2,
      Data: "2023-02-16",
      Semana: "48",
      Rota: "Rota 2",
      Status: "Em andamento",
      Valor: 1000,
      data_fim: "2023-02-16",
      data_inicio: "2023-02-13"
    },
    {
      id: 3,
      Data: "2023-02-17",
      Semana: "49",
      Rota: "Rota 3",
      Status: "Aprovado",
      Valor: 800,
      data_fim: "2023-02-17",
      data_inicio: "2023-02-14"
    }
  ];
  
  const TabelaReembolso = () => {
    return (
      <section className="content-area-table">
        <div className="data-table-info">
          <h4 className="data-table-title">Latest Orders</h4>
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
              {TABLE_DATA?.map((dataItem) => {
                return (
                  <tr key={dataItem.id}>
                    <td>{dataItem.id}</td>
                    <td>{dataItem.Data}</td>
                    <td>{`${dataItem.data_inicio} - ${dataItem.data_fim}`}</td> {/* Semana como data_inicio - data_fim */}
                    <td>{dataItem.Rota}</td>
                    <td>{dataItem.Status}</td>
                    <td>{dataItem.Valor}</td>
                    <td>
                      <div className="dt-status">
                        <span
                          className={`dt-status-dot dot-${dataItem.status}`}
                        ></span>
                        <span className="dt-status-text">{dataItem.status}</span>
                      </div>
                    </td>
                  
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  };
  
  export default TabelaReembolso;
  