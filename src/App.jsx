import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MoonIcon from "./assets/icons/moon.svg";
// import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Login, Dashboard, PageNotFound, Cadastro, Tabelas, Acordo, Agentes, Condicoes, Pagamento, Acompanhamento, Solicitacoes, Vigencias, Pendencias, CreditoConta, ImportProposta, RelatorioCMS, Tabulacao } from "./screens";
import { PrivateRoute } from "./privateRoute.jsx";


function App() {
  const { theme, } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route element={<PrivateRoute> <BaseLayout /></PrivateRoute>}>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/tabulacoes" element={<PrivateRoute><Tabulacao /></PrivateRoute>} />
            <Route path="/tabelas" element={<PrivateRoute><Tabelas /></PrivateRoute>} />
            <Route path="/agentes" element={<PrivateRoute><Agentes /></PrivateRoute>} />
            <Route path="/acordo" element={<PrivateRoute><Acordo /></PrivateRoute>} />
            <Route path="/condicoes" element={<PrivateRoute><Condicoes /></PrivateRoute>} />
            <Route path="/pagamento" element={<PrivateRoute><Pagamento /></PrivateRoute>} />
            <Route path="/acompanhamento" element={<PrivateRoute><Acompanhamento /></PrivateRoute>} />
            <Route path="/solicitacoes" element={<PrivateRoute><Solicitacoes /></PrivateRoute>} />
            <Route path="/vigencias" element={<PrivateRoute><Vigencias /></PrivateRoute>} />
            <Route path="/pendencias" element={<PrivateRoute><Pendencias /></PrivateRoute>} />
            <Route path="/credito-conta" element={<PrivateRoute><CreditoConta /></PrivateRoute>} />
            <Route path="/import-proposta" element={<PrivateRoute><ImportProposta /></PrivateRoute>} />
            <Route path="/relatorioCMS" element={<PrivateRoute><RelatorioCMS /></PrivateRoute>} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>

        {/* <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button> */}
      </Router>
    </>
  );
}

export default App;