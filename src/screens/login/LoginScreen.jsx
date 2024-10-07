import "./styles.css"; // Importa o arquivo CSS
import { useRef } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Importa o contexto

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const { setUser, setToken } = useUser(); // Hook para acessar o contexto e definir o usuário e o token

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            // Faz a requisição de login
            const { data: res } = await api.post('/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });

            // Armazena o token no localStorage
            localStorage.setItem('token', res.token);

            // Armazena o token no contexto
            setToken(res.token);

            // Armazena os dados do usuário no contexto
            setUser({
                id: res.user.id,
                name: res.user.name,
                email: res.user.email,
                departament: res.user.departament,
                tabulacoes: res.user.tabulacoes,
            });

            // Navega para a dashboard após o login bem-sucedido
            navigate('/dashboard');
        } catch (err) {
            alert("Senha ou Email incorretos");
        }
    }

    return (
        <div className="formLogin">
            <div>
                <div className="logo-container">
                    <img src="/assets/logo.png" className="logo" alt="Logo" />
                </div>
                <div className="form-container">
                    <h1 className="form-title">Login</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input ref={emailRef} type="email" className="input" required />
                            <label className="input-label">Seu email</label>
                        </div>
                        <div className="input-group">
                            <input ref={passwordRef} type="password" className="input" required />
                            <label className="input-label">Sua Senha</label>
                        </div>
                        <div>
                            <button className="submit-button" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
