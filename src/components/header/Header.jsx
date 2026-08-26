import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import S from "./header.module.scss";
import { FaHome, FaBox, FaUser, FaUsers } from "react-icons/fa";
import { FaBars, FaXmark } from "react-icons/fa6";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    isActive ? `${S.link} ${S.active}` : S.link;

  return (
    <header className={S.header}>
      <div className={S.container}>
        
        
        <NavLink className={S.logo} to="/" aria-label="Elo Solidário — página inicial">
          <img
            className={S.imgLogo}
            src={Logo}
            alt=""
          />

          <div>
            <h1>Elo Solidário</h1>
            <p>Doações que conectam, solidariedade que transforma</p>
          </div>
        </NavLink>

        <button
          className={S.menuButton}
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FaXmark /> : <FaBars />}
        </button>

        
        <nav id="main-navigation" className={`${S.nav} ${menuOpen ? S.open : ""}`} aria-label="Navegação principal">
          <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>
            <FaHome /> Home
          </NavLink>

          <NavLink to="/doacoes" className={linkClass} onClick={() => setMenuOpen(false)}>
            <FaBox /> Doações
          </NavLink>

          <NavLink to="/cadastro" className={linkClass} onClick={() => setMenuOpen(false)}>
            <FaUser /> Cadastro
          </NavLink>

          <NavLink to="/voluntariado" className={linkClass} onClick={() => setMenuOpen(false)}>
            <FaUsers /> Voluntariado
          </NavLink>
        </nav>

      </div>
    </header>
  );
}
