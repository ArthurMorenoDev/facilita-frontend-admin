import "./styles.css"; // Importa o arquivo CSS
import React, { useRef } from "react";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica de submissão do formulário
        console.log("Email:", emailRef.current.value);
        console.log("Password:", passwordRef.current.value);
    };

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