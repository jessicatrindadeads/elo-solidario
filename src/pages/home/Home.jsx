import S from "./home.module.scss";
import Imagem from "../../assets/img/ajuda.jpeg"; 
import Garrafa from "../../assets/img/aguapotavel.png";
import Alimento from "../../assets/img/alimentos.webp";
import Roupa from "../../assets/img/camiseta.webp";
import InfoCard from "../../components/infoCard/infoCard";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className={S.home}>      
      <section className={S.homeSection}>
        <div className={S.doacao}>
          <h1>Ajude quem precisa. <br /> Transforme vidas!</h1>
          <p>Encontre necessidades urgentes e faça sua doação para quem mais precisa neste momento.</p>
          <div className={S.botoesDoacao}>
            <Link className={S.btnDoacao} to="/doacoes">Ver Doações</Link>
            <Link className={S.btnAjuda} to="/voluntariado">Quero Ajudar</Link>
          </div>
        </div>
        <div className={S.imagemDoacao}>
          <img src={Imagem} alt="Ilustração de doação" />
        </div>
      </section>
      
      <section className={S.needsSection}>
        <div className={S.needsHeader}>
          <h2>Necessidades Urgentes</h2>
          <Link to="/doacoes">Ver todas →</Link>
        </div>

        <div className={S.needsGrid}>
         <InfoCard
          img={Garrafa}
          alt="Água Potável"
          subtitulo="Água Potável"
          paragrafo="Centro Comunitário • 100 garrafas"
          textBotao="Urgente"
          status="urgente"
        />

          <InfoCard
            img={Alimento}
            alt="Alimentos Não Perecíveis"
            subtitulo="Alimentos Não Perecíveis"
            paragrafo="Escola Municipal • 50 unidades"
            textBotao="Urgente"
            status="urgente"
          />

          <InfoCard
            img={Roupa}
            alt="Roupas"
            subtitulo="Roupas"
            paragrafo="Abrigo São José • 30 conjuntos"
            textBotao="Importante"
            status="importante"
          />
        </div>
      </section>
    </main>
  );
}
