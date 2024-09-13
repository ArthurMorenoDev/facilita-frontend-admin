import "./styles.css"; // Importa o arquivo CSS
import { useRef } from "react";
import api from "../../services/api";
import {useNavigate } from "react-router-dom"
// import { PrivateRoute } from "../../privateRoute";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const { data: token } = await api.post('/login', {

                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            localStorage.setItem('token', token)
            console.log(token)

            navigate('/dashboard')

        } catch (err) {
            alert("Senha ou Email incorretos")
        }
    }

    return (
        <div className="formLogin">
            <div>
                <div className="logo-container">
                    <img src="../src/assets/logo.PNG" className="logo" alt="Logo" />
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