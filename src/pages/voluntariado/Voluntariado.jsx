import S from "./voluntariado.module.scss";
import { useState } from "react";

import caixa from "../../assets/img/alimentos.webp";
import caminhao from "../../assets/img/caminhao.jpeg";
import prancheta from "../../assets/img/prancheta.jpeg";

export default function Voluntariado() {
  const [mensagem, setMensagem] = useState("");
  const acoes = [
    { id: 1, titulo: "Separação de Doações", local: "Centro de Triagem", periodo: "Manhã", imagem: caixa,},
    { id: 2, titulo: "Distribuição de Doações", local: "Bairros Afetados", periodo: "Tarde", imagem: caminhao,},
    { id: 3, titulo: "Apoio Logístico", local: "Centro de Apoio", periodo: "Noite", imagem: prancheta,},
    
  ];

  function cadastrarVoluntario(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const nome = new FormData(form).get("nome");
    setMensagem(`Cadastro de ${nome} recebido para demonstração.`);
    form.reset();
  }

  return (
    <main className={S.mainVoluntariado}>
      <section className={S.containerVoluntariado}>
        <div className={S.tituloPagina}>
          <h1>Seja um Voluntário</h1>

          <p>
            Cadastre-se para ajudar em ações e fazer a diferença!
          </p>
        </div>

        <div className={S.conteudoVoluntariado}>
          <div className={S.formularioVoluntario}>
            <h2>Quero ser Voluntário</h2>

            <form onSubmit={cadastrarVoluntario}>
              <div className={S.campo}>
                <label htmlFor="nome">Nome completo</label>

                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite seu nome"
                  required
                />
              </div>

              <div className={S.campo}>
                <label htmlFor="email">E-mail</label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  required
                />
              </div>

              <div className={S.campo}>
                <label htmlFor="telefone">Telefone</label>

                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  inputMode="tel"
                  required
                />
              </div>

              <div className={S.campo}>
                <label htmlFor="disponibilidade">
                  Disponibilidade
                </label>

                <select
                  id="disponibilidade"
                  name="disponibilidade"
                  required
                >
                  <option value="">
                    Selecione sua disponibilidade
                  </option>

                  <option value="manha">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="noite">Noite</option>
                  <option value="integral">
                    Período integral
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className={S.btnCadastro}
              >
                Enviar Cadastro
              </button>
              <p className={S.feedback} role="status" aria-live="polite">{mensagem}</p>
            </form>
          </div>

          <div className={S.acoesDisponiveis}>
            <h2>Ações Disponíveis</h2>

            <div className={S.listaAcoes}>
              {acoes.map((acao) => (
                <article
                  key={acao.id}
                  className={S.cardAcao}
                >
                  <div className={S.informacoesAcao}>
                    <img
                      src={acao.imagem}
                      alt={acao.titulo}
                    />

                    <div>
                      <h3>{acao.titulo}</h3>
                      <p>{acao.local}</p>
                    </div>
                  </div>

                  <p
                    className={`${S.periodo} ${
                      S[
                        acao.periodo
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                      ]
                    }`}
                  >
                    {acao.periodo}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
