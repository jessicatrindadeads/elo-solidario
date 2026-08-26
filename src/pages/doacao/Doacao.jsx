import { useState } from 'react';
import S from './doacao.module.scss';
import aguaPotavel from '../../assets/img/aguapotavel.png';
import alimentos from '../../assets/img/alimentos.webp';
import roupa from '../../assets/img/camiseta.webp';
import higiene from '../../assets/img/higieneproduto.png';

export default function Doacao() {
  
  const necessidades = [
    { id: 1, item: "Água Potável", categoria: "Água", local: "Centro Comunitário", qtd: "100 garrafas", status: "Urgente", img: aguaPotavel },
    { id: 2, item: "Alimentos Não Perecíveis", categoria: "Alimentos", local: "Escola Municipal", qtd: "50 unidades", status: "Urgente", img: alimentos },
    { id: 3, item: "Roupas", categoria: "Roupas", local: "Abrigo São José", qtd: "30 conjuntos", status: "Importante", img: roupa },
    { id: 4, item: "Produtos de Higiene", categoria: "Higiene", local: "Centro de Apoio", qtd: "80 kits", status: "Normal", img: higiene },
  ];

  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [selecionada, setSelecionada] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const resultados = necessidades.filter((necessidade) => {
    const termo = busca.toLocaleLowerCase("pt-BR");
    return (!termo || `${necessidade.item} ${necessidade.local}`.toLocaleLowerCase("pt-BR").includes(termo))
      && (!categoria || necessidade.categoria === categoria)
      && (!prioridade || necessidade.status === prioridade);
  });

  function confirmarDoacao(event) {
    event.preventDefault();
    setMensagem(`Interesse em doar ${selecionada.item} registrado! Entraremos em contato.`);
    setSelecionada(null);
  }

  return (
    <main className={S.mainDoacao}>
      <section className={S.headerDoacao}>
        <h1>Necessidades de Doação</h1>

        <p>
          Confira as necessidades cadastradas e faça a diferença!
        </p>
      </section>

      <section className={S.filtros}>
        <div className={S.busca}>
          <input
            type="text"
            placeholder="Buscar por item ou local..."
            aria-label="Buscar por item ou local"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </div>

        <select aria-label="Filtrar por categoria" value={categoria} onChange={(event) => setCategoria(event.target.value)}>
          <option value="">Todas as categorias</option>
          <option value="Água">Água</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Roupas">Roupas</option>
          <option value="Higiene">Higiene</option>
        </select>

        <select aria-label="Filtrar por prioridade" value={prioridade} onChange={(event) => setPrioridade(event.target.value)}>
          <option value="">Todas as prioridades</option>
          <option value="Urgente">Urgente</option>
          <option value="Importante">Importante</option>
          <option value="Normal">Normal</option>
        </select>
      </section>

      <div className={S.feedback} role="status" aria-live="polite">{mensagem}</div>

      <section className={S.listaCards}>
        {resultados.map((necessidade) => (
          <article
            key={necessidade.id}
            className={S.card}
          >
            <div className={S.itemInfo}>
              <img
                src={necessidade.img}
                alt={necessidade.item}
              />

              <div>
                <h3>{necessidade.item}</h3>
                <p>{necessidade.local}</p>
              </div>
            </div>

            <div className={S.statusInfo}>
              <p className={S.quantidade}>
                {necessidade.qtd}
              </p>

              <p
                className={`${S.badge} ${
                  S[necessidade.status.toLowerCase()]
                }`}
              >
                {necessidade.status}
              </p>
            </div>

            <button
              type="button"
              className={S.btnDoar}
              onClick={() => { setMensagem(""); setSelecionada(necessidade); }}
            >
              Quero Doar
            </button>
          </article>
        ))}
        {resultados.length === 0 && <p className={S.vazio}>Nenhuma necessidade encontrada com esses filtros.</p>}
      </section>

      {selecionada && (
        <div className={S.modalBackdrop} role="presentation" onMouseDown={() => setSelecionada(null)}>
          <section className={S.modal} role="dialog" aria-modal="true" aria-labelledby="titulo-doacao" onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className={S.fechar} aria-label="Fechar" onClick={() => setSelecionada(null)}>×</button>
            <h2 id="titulo-doacao">Quero doar</h2>
            <p>Você está ajudando com <strong>{selecionada.item}</strong> para {selecionada.local}.</p>
            <form onSubmit={confirmarDoacao}>
              <label htmlFor="nomeDoador">Nome completo</label>
              <input id="nomeDoador" name="nome" required autoFocus />
              <label htmlFor="contatoDoador">E-mail ou telefone</label>
              <input id="contatoDoador" name="contato" required />
              <label htmlFor="quantidadeDoacao">Quantidade oferecida</label>
              <input id="quantidadeDoacao" name="quantidade" type="number" min="1" required />
              <button type="submit">Confirmar interesse</button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
