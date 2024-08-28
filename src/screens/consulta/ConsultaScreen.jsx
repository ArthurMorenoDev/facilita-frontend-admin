import "./styles.css"

const Consulta = () => {
    return (
        <div>
            <form>
                <div className="consulta-container">
                    <div className="consulta">
                        <label className="label">CPF</label>
                        <input type="text" className="input2"></input>
                    </div>

                    <div className="consulta">
                        <label className="label">Matricula</label>
                        <input type="number" className="input2"></input>
                    </div>

                    <div className="consulta">
                        <label className="label">CPF</label>
                        <input type="text" className="input2"></input>
                    </div>
                    <button type="submit" className="btn">Consultar</button>
                </div>

            </form>
        </div>
    );
};

export default Consulta;
