import AreaTableAction from "./AreaTableAction";
import Loading from "../../loading/Loading"; // Importe o componente de loading
import "./AreaTable.scss";

const TABLE_HEADS = [
  "Acertos",
  "Proposta",
  "Banco",
  "Comissão",
  "Data Pagamento",
];

const AreaTable = ({ data, loading }) => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h2 className="data-table-title">TOTAL GERADO NO MÊS ATUAL</h2>
      </div>
      <div className="data-table-diagram">
        {loading ? ( // Verifique o estado de carregamento
          <Loading />
        ) : (
          <table>
            <thead>
              <tr>
                {TABLE_HEADS.map((th, index) => (
                  <th key={index}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((dataItem, i) => (
                  <tr key={i}>
                    <td>{dataItem.acertos}</td>
                    <td>{dataItem.proposta}</td>
                    <td>{dataItem.banco}</td>
                    <td>{dataItem.comissao} R$</td>
                    <td>{new Date(dataItem.createdAt).toISOString().slice(0, 10)}</td>
                    <td className="dt-cell-action">
                      <AreaTableAction />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={TABLE_HEADS.length} style={{ textAlign: 'center' }}>
                    Nenhum dado encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AreaTable;
