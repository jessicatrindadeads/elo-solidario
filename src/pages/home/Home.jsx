import S from "./home.module.scss";
import Imagem from "../../assets/img/ajuda.jpeg"; 
import Garrafa from "../../assets/img/aguapotavel.png";
import Alimento from "../../assets/img/alimentos.webp";
import Roupa from "../../assets/img/camiseta.webp";
import Higiene from "../../assets/img/higieneproduto.png";
import InfoCard from "../../components/infoCard/infoCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

const imagens = { Água: Garrafa, Alimentos: Alimento, Roupas: Roupa, Higiene };
const ordem = { urgente: 0, importante: 1, normal: 2 };

export default function Home() {
  const [necessidades, setNecessidades] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    api.get('/necessidades?status=aberta', { signal: controller.signal })
      .then(({ data }) => setNecessidades(
        [...data.data].sort((a, b) => ordem[a.prioridade] - ordem[b.prioridade]).slice(0, 3),
      ))
      .catch(() => setNecessidades([]));
    return () => controller.abort();
  }, []);

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
          {necessidades.map((necessidade) => (
            <InfoCard
              key={necessidade.id}
              img={imagens[necessidade.categoria] || Alimento}
              alt={necessidade.item}
              subtitulo={necessidade.item}
              paragrafo={`${necessidade.local} • ${necessidade.quantidade} ${necessidade.unidade}`}
              textBotao={necessidade.prioridade.charAt(0).toUpperCase() + necessidade.prioridade.slice(1)}
              status={necessidade.prioridade}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
