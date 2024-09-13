import { useRef } from "react";
import { Link } from "react-router-dom";
import "./styles.css"; // Importa o arquivo CSS
import api from "../../services/api";

function Cadastro() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const departamentRef = useRef();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            // Verifica se os campos estão vazios
            if (!nameRef.current.value || !emailRef.current.value || !passwordRef.current.value) {
                alert("Todos os campos devem ser preenchidos");
                return; // Impede o envio da requisição se algum campo estiver vazio
            }

            // Se todos os campos estiverem preenchidos, envia a requisição
            await api.post('/cadastro', {
                name: nameRef.current.value,
                email: emailRef.current.value,
                departament: departamentRef.current.value,
                password: passwordRef.current.value
            });

            alert("Usuário cadastrado com sucesso");

        } catch (err) {
            alert("Erro ao cadastrar usuário");
        }

    }

    return (
        <div className="cadastro-container">
            <div className="cadastro-form">
                <h2 className="cadastro-title">Cadastro</h2>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <input ref={nameRef} placeholder="Nome" type="text" className="cadastro-input" />
                    <input ref={emailRef} placeholder="Email" type="email" className="cadastro-input" />
                    <input ref={passwordRef} placeholder="Senha" type="password" className="cadastro-input" />
                    <input ref={departamentRef} placeholder="Departamento" type="text" className="cadastro-input" />
                    <button className="cadastro-button" type="submit">Cadastrar</button>
                </form>
                <Link to="/login" className="cadastro-login-link">Já tem conta? Faça login</Link>
            </div>
        </div>
    );
}

export default Cadastro;