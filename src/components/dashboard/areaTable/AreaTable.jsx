// import AreaTableAction from "./AreaTableAction";
import Loading from "../../loading/Loading"; // Importe o componente de loading
import "./AreaTable.scss";

const AreaTable = ({ data, loading, onDelete, onEdit }) => {
  // Função para extrair os cabeçalhos dos dados, excluindo "createAt" e "updateAt"
  const getTableHeads = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      return Object.keys(data[0]).filter(key => key !== "createdAt" && key !== "updatedAt" ); // Filtra as chaves
    }
    return [];
  };

  // Verifica se os dados estão carregando ou se há dados disponíveis
  if (loading) {
    return <Loading />;
  }

  // Extrai os cabeçalhos dos dados, excluindo "createAt" e "updateAt"
  const tableHeads = getTableHeads(data);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h2 className="data-table-title">TOTAL GERADO NO MÊS ATUAL</h2>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {tableHeads.map((head, index) => (
                <th key={index}>{head}</th>
              ))}
             
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((dataItem, i) => (
                <tr key={i}>
                  {tableHeads.map((head, index) => (
                    <td key={index}>
                      {head === "data"
                        ? new Date(dataItem[head]).toISOString().slice(0, 10)
                        : dataItem[head]}
                    </td>
                  ))}
                  <td className="dt-cell-action">
                    <button onClick={() => onEdit(dataItem.id)}>Editar</button>
                    <button onClick={() => onDelete(dataItem.id)}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tableHeads.length + 1}
                  style={{ textAlign: "center" }}
                >
                  Nenhum dado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
