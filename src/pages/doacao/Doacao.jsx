import S from './doacao.module.scss';
import aguaPotavel from '../../assets/img/aguapotavel.png';
import alimentos from '../../assets/img/alimentos.webp';
import roupa from '../../assets/img/camiseta.webp';
import higiene from '../../assets/img/higieneproduto.png';

export default function Doacao() {
  
  const necessidades = [
    { id: 1, item: "Água Potável", local: "Centro Comunitário", qtd: "100 garrafas", status: "Urgente", img: aguaPotavel },
    { id: 2, item: "Alimentos Não Perecíveis", local: "Escola Municipal", qtd: "50 unidades", status: "Urgente", img: alimentos },
    { id: 3, item: "Roupas", local: "Abrigo São José", qtd: "30 conjuntos", status: "Importante", img: roupa },
    { id: 4, item: "Produtos de Higiene", local: "Centro de Apoio", qtd: "80 kits", status: "Normal", img: higiene },
  ];

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
          />
        </div>

        <select>
          <option>Todas as categorias</option>
          <option>Alimentos</option>
          <option>Roupas</option>
          <option>Higiene</option>
        </select>

        <select>
          <option>Todas as prioridades</option>
          <option>Urgente</option>
          <option>Importante</option>
          <option>Normal</option>
        </select>
      </section>

      <section className={S.listaCards}>
        {necessidades.map((necessidade) => (
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
            >
              Quero Doar
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}