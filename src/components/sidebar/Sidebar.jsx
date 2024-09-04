import React, { useState, useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import {
  MdAssessment,
  MdBusinessCenter,
  MdCallToAction,
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlinePeople,
  MdHome,
  MdKeyboardArrowRight
} from "react-icons/md";
import { Link } from "react-router-dom";

import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  // Ref para acompanhar o item de menu atualmente ativo
  const activeMenuItemRef = useRef(null);

  // Estado para controlar os dropdowns
  const [dropdownsOpen, setDropdownsOpen] = useState({
    dropdown1: false,
    dropdown2: false,
    dropdown3: false,
    dropdownBonus: false,
    dropdownControleCarga: false
  });

  // Função para fechar a barra lateral quando clicar fora da área da barra lateral
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  // Função para lidar com o clique em um item do menu
  const handleMenuItemClick = (event) => {
    // Remove a classe 'active' do item anteriormente ativo
    if (activeMenuItemRef.current) {
      activeMenuItemRef.current.classList.remove("active");
    }

    // Adiciona a classe 'active' ao item clicado
    event.currentTarget.classList.add("active");

    // Atualiza a ref para o novo item ativo
    activeMenuItemRef.current = event.currentTarget;
  };

  // Função para lidar com o clique no dropdown
  const toggleDropdown = (dropdown) => {
    setDropdownsOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  // Função específica para o dropdown "Controle de Carga"
  const toggleControleCargaDropdown = () => {
    setDropdownsOpen((prev) => ({
      ...prev,
      dropdownControleCarga: !prev.dropdownControleCarga,
      dropdownBonus: false // Fecha o dropdown "Acomp Bônus" quando abre o "Controle de Carga"
    }));
  };

  // Função específica para o dropdown "Acomp Bônus"
  const toggleBonusDropdown = () => {
    setDropdownsOpen((prev) => ({
      ...prev,
      dropdownBonus: !prev.dropdownBonus,
      dropdownControleCarga: false // Fecha o dropdown "Controle de Carga" quando abre o "Acomp Bônus"
    }));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src="../src/assets/logo.PNG" className="logoMarca" alt="Logo" />
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <MdOutlineClose size={24} />
          </button>
        </div>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <div className="menu-link-head">principal</div>
            <li className="menu-item">
              <Link
                to="/dashboard"
                className="menu-link"
                onClick={handleMenuItemClick}
              >
                <span className="menu-link-icon">
                  <MdHome size={20} />
                </span>
                <span className="menu-link-text">Home</span>
              </Link>
            </li>
            <div className="menu-link-head">Tubulações</div>
            <li className="menu-item">
              <Link
                to="/consulta"
                className="menu-link"
                onClick={handleMenuItemClick}
              >
                <span className="menu-link-icon">
                  <MdOutlineBarChart size={20} />
                </span>
                <span className="menu-link-text">Tubulações</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/tabelas"
                className="menu-link"
                onClick={handleMenuItemClick}
              >
                <span className="menu-link-icon">
                  <MdCallToAction   size={20} />
                </span>
                <span className="menu-link-text">Solicitações</span>
              </Link>
            </li>
            <div className="menu-link-head">Agentes</div>
            <li className="menu-item">
              <Link
                to="/agentes"
                className="menu-link"
                onClick={handleMenuItemClick}
              >
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">Agentes</span>
              </Link>
            </li>
            <div className="menu-link-head">Ações</div>

            {/* Primeiro Dropdown */}
            <li className="menu-item">
              <div className="menu-link" onClick={() => toggleDropdown('dropdown1')}>
                <span className="menu-link-icon">
                  <MdOutlineAttachMoney size={20} />
                </span>
                <span className="menu-link-text">Comissões</span>
                <span className="menu-link-icon dropdown-arrow">
                  {dropdownsOpen.dropdown1 ? (
                    <MdKeyboardArrowDown size={20} />
                  ) : (
                    <MdKeyboardArrowRight size={20} />
                  )}
                </span>
              </div>
              <ul className={`submenu-list ${dropdownsOpen.dropdown1 ? 'open' : ''}`}>
                <li className="submenu-item">
                  <div className="submenu-link" onClick={toggleBonusDropdown}>
                    <span className="menu-link-text">Acomp Bônus</span>
                    <span className="menu-link-icon dropdown-arrow">
                      {dropdownsOpen.dropdownBonus ? (
                        <MdKeyboardArrowDown size={20} />
                      ) : (
                        <MdKeyboardArrowRight size={20} />
                      )}
                    </span>
                  </div>
                  <ul className={`submenu-list ${dropdownsOpen.dropdownBonus ? 'open' : ''}`}>
                    <li className="submenu-item">
                      <Link to="/acompanhamento" className="Subsubmenu-link">
                        Acompanhamento
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link to="/solicitacoes" className="Subsubmenu-link">
                        Solicitações
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link to="/vigencias" className="Subsubmenu-link">
                        Vigências
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu-item">
                  <Link to="/acordo" className="submenu-link">
                    Acordo Performance
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link to="/condicoes" className="submenu-link">
                    Condições Especiais
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link to="/pagamento" className="submenu-link">
                    Pagamento Exceção
                  </Link>
                </li>
                <li className="submenu-item">
                  <div className="submenu-link" onClick={toggleControleCargaDropdown}>
                    <span className="menu-link-text">Controle de Carga</span>
                    <span className="menu-link-icon dropdown-arrow">
                      {dropdownsOpen.dropdownControleCarga ? (
                        <MdKeyboardArrowDown size={20} />
                      ) : (
                        <MdKeyboardArrowRight size={20} />
                      )}
                    </span>
                  </div>
                  <ul className={`submenu-list ${dropdownsOpen.dropdownControleCarga ? 'open' : ''}`}>
                    <li className="submenu-item">
                      <Link to="/credito-conta" className="Subsubmenu-link">
                        Credito Conta
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link to="/import-proposta" className="Subsubmenu-link">
                        Import Propostas
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link to="/relatorioCMS" className="Subsubmenu-link">
                        Relatório de CMS
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu-item">
                  <Link to="/pendencias" className="submenu-link">
                    Pend. Integrações
                  </Link>
                </li>
              </ul>
            </li>

            {/* Segundo Dropdown */}
            <li className="menu-item">
              <div className="menu-link" onClick={() => toggleDropdown('dropdown2')}>
                <span className="menu-link-icon">
                  <MdBusinessCenter size={20} />
                </span>
                <span className="menu-link-text">Registros de Crédito</span>
                <span className="menu-link-icon dropdown-arrow">
                  {dropdownsOpen.dropdown2 ? (
                    <MdKeyboardArrowDown size={20} />
                  ) : (
                    <MdKeyboardArrowRight size={20} />
                  )}
                </span>
              </div>
              <ul className={`submenu-list ${dropdownsOpen.dropdown2 ? 'open' : ''}`}>
                <li className="submenu-item">
                  <Link to="*" className="submenu-link">
                    Acompanhamento
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link to="/agentes/opcao2" className="submenu-link">
                    Propostas Pendentes
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link to="/agentes/opcao3" className="submenu-link">
                    Cobranças Banco 
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link to="/agentes/opcao3" className="submenu-link">
                    Carga Não Rotativa
                  </Link>
                </li>
              </ul>
            </li>

            {/* Terceiro Dropdown */}
            <li className="menu-item">
              <div className="menu-link" onClick={() => toggleDropdown('dropdown3')}>
                <span className="menu-link-icon">
                  <MdAssessment size={20} />
                </span>
                <span className="menu-link-text">Consultar Propostas</span>
                <span className="menu-link-icon dropdown-arrow">
                  {dropdownsOpen.dropdown3 ? (
                    <MdKeyboardArrowDown size={20} />
                  ) : (
                    <MdKeyboardArrowRight size={20} />
                  )}
                </span>
              </div>
              <ul className={`submenu-list ${dropdownsOpen.dropdown3 ? 'open' : ''}`}>
                <li className="submenu-item">
                  <Link to="/agentes/opcao1" className="submenu-link">
                    Individual
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link to="/agentes/opcao2" className="submenu-link">
                    API PAN
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link to="/agentes/opcao3" className="submenu-link">
                    MINERADOR C6
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link
                to="*"
                className="menu-link"
                onClick={handleMenuItemClick}
              >
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Configurações</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link" onClick={handleMenuItemClick}>
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;