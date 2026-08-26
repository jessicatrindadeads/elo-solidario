import { useEffect, useState } from 'react';
import S from './doacao.module.scss';
import aguaPotavel from '../../assets/img/aguapotavel.png';
import alimentos from '../../assets/img/alimentos.webp';
import roupa from '../../assets/img/camiseta.webp';
import higiene from '../../assets/img/higieneproduto.png';
import { api, getApiError } from '../../services/api';

const imagens = { Água: aguaPotavel, Alimentos: alimentos, Roupas: roupa, Higiene: higiene };
const formatarPrioridade = (valor) => valor.charAt(0).toUpperCase() + valor.slice(1);

export default function Doacao() {
  
  const [necessidades, setNecessidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [selecionada, setSelecionada] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    api.get('/necessidades?status=aberta', { signal: controller.signal })
      .then(({ data }) => setNecessidades(data.data.map((item) => ({
        ...item,
        qtd: `${item.quantidade} ${item.unidade}`,
        status: formatarPrioridade(item.prioridade),
        img: imagens[item.categoria] || alimentos,
      }))))
      .catch((error) => {
        if (error.code !== 'ERR_CANCELED') setErro(getApiError(error, 'Não foi possível carregar as necessidades.'));
      })
      .finally(() => setCarregando(false));
    return () => controller.abort();
  }, []);

  const resultados = necessidades.filter((necessidade) => {
    const termo = busca.toLocaleLowerCase("pt-BR");
    return (!termo || `${necessidade.item} ${necessidade.local}`.toLocaleLowerCase("pt-BR").includes(termo))
      && (!categoria || necessidade.categoria === categoria)
      && (!prioridade || necessidade.status === prioridade);
  });

  async function confirmarDoacao(event) {
    event.preventDefault();
    const dados = Object.fromEntries(new FormData(event.currentTarget));
    setEnviando(true);
    setMensagem("");
    try {
      await api.post('/interesses-doacao', {
        necessidadeId: selecionada.id,
        nomeDoador: dados.nome,
        contato: dados.contato,
        quantidade: Number(dados.quantidade),
      });
      setMensagem(`Interesse em doar ${selecionada.item} registrado! Entraremos em contato.`);
      setSelecionada(null);
    } catch (error) {
      setMensagem(getApiError(error, 'Não foi possível registrar seu interesse. Tente novamente.'));
    } finally {
      setEnviando(false);
    }
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
        {carregando && <p className={S.vazio}>Carregando necessidades...</p>}
        {erro && <p className={S.vazio} role="alert">{erro}</p>}
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
        {!carregando && !erro && resultados.length === 0 && <p className={S.vazio}>Nenhuma necessidade encontrada com esses filtros.</p>}
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
              <button type="submit" disabled={enviando}>{enviando ? 'Enviando...' : 'Confirmar interesse'}</button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
