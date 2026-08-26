import S from "./footer.module.scss";
import Logo from "../../assets/img/logo.png";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={S.footer}>
      <div className={S.container}>
        <div className={S.content}>
          
          <div className={S.logo}>
            <div className={S.logoArea}>
              <img src={Logo} alt="Logo Elo Solidário" />
              <h2>Elo Solidário</h2>
            </div>
            <p>Doações que conectam, solidariedade que transforma.</p>
          </div>

          <nav className={S.section}>
            <h3>Navegação</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/doacoes">Doações</Link></li>
              <li><Link to="/cadastro">Cadastro</Link></li>
              <li><Link to="/voluntariado">Voluntariado</Link></li>
            </ul>
          </nav>

          <nav className={S.section}>
            <h3>Institucional</h3>
            <ul>
              <li>Projeto educacional</li>
              <li>Dados demonstrativos</li>
            </ul>
          </nav>

          <div className={S.section}>
            <h3>Contato</h3>
            <ul>
              <li><FaPhone /> (00) 00000-0000</li>
              <li><FaEnvelope /> contato@elosolidario.com</li>
              <li><FaMapMarkerAlt /> Rua Exemplo, 123 - Centro</li>
            </ul>
          </div>

          <div className={S.section}>
            <h3>Redes Sociais</h3>
            <div className={S.socials}>
              <span aria-label="Facebook"><FaFacebookF /></span>
              <span aria-label="Instagram"><FaInstagram /></span>
              <span aria-label="WhatsApp"><FaWhatsapp /></span>
              <span aria-label="Twitter"><FaTwitter /></span>
            </div>
          </div>

        </div>

        <div className={S.copyright}>
          <p>© {new Date().getFullYear()} Elo Solidário. Projeto educacional.</p>
        </div>
      </div>
    </footer>
  );
}
